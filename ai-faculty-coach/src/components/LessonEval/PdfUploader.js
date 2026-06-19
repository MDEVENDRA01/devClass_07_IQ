'use client';
import { useState, useRef } from 'react';
import { useApp } from '@/context/AppContext';

export default function PdfUploader({ onUploadSuccess }) {
  const { addToast } = useApp();
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (selectedFile) => {
    setErrorMsg('');
    if (selectedFile.type !== 'application/pdf' && !selectedFile.name.endsWith('.pdf')) {
      setErrorMsg('Please select a valid PDF document.');
      addToast('Invalid file format. PDF required.', 'error');
      return;
    }

    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (selectedFile.size > MAX_SIZE) {
      setErrorMsg('File is too large. Maximum size is 10MB.');
      addToast('File exceeds 10MB limit.', 'error');
      return;
    }

    setFile(selectedFile);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const clearFile = () => {
    setFile(null);
    setErrorMsg('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const parsePdfClientSide = async (selectedFile) => {
    if (typeof window.pdfjsLib === 'undefined') {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js';
        script.onload = resolve;
        script.onerror = () => reject(new Error('Failed to load PDF library.'));
        document.head.appendChild(script);
      });
    }

    const pdfjsLib = window.pdfjsLib;
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

    const arrayBuffer = await selectedFile.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    let fullText = '';
    const numPages = pdf.numPages;

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }

    return {
      text: fullText,
      numPages: numPages,
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
      info: {
        title: selectedFile.name.replace(/\.[^/.]+$/, ""),
        author: 'Unknown'
      }
    };
  };

  const uploadAndParse = async () => {
    if (!file) return;

    setLoading(true);
    setProgressText('Reading PDF file...');
    setErrorMsg('');

    try {
      // First try client-side parsing for speed and serverless compatibility
      setProgressText('Parsing PDF text in browser...');
      const result = await parsePdfClientSide(file);
      
      addToast('PDF processed successfully!', 'success');
      onUploadSuccess(result);
    } catch (err) {
      console.error('Client-side PDF parse failed, trying backend...', err);
      setProgressText('Uploading to server...');
      
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload-pdf', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to process PDF file.');
        }

        addToast('PDF processed successfully via backup server!', 'success');
        onUploadSuccess(result);
      } catch (backupErr) {
        console.error(backupErr);
        setErrorMsg('Failed to process PDF. Make sure it is not password-protected or corrupted.');
        addToast('Processing failed.', 'error');
      }
    } finally {
      setLoading(false);
      setProgressText('');
    }
  };


  return (
    <div className="pdf-uploader-card card animate-fadeIn">
      <div className="card-header">
        <h3>Upload Lesson Document</h3>
      </div>
      <div className="card-body">
        <p className="text-muted mb-md">
          Upload any PDF containing your lesson plan, lecture notes, textbook chapters, or course materials. 
          The platform will extract the contents and evaluate them across all educational categories.
        </p>

        {!file ? (
          <div 
            className={`pdf-drag-zone ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <input 
              ref={fileInputRef}
              type="file" 
              className="pdf-file-input" 
              accept=".pdf"
              onChange={handleChange}
            />
            <div className="upload-icon">📄</div>
            <div className="upload-prompt">
              <strong>Drag and drop your PDF here</strong> or <span>click to browse</span>
            </div>
            <div className="upload-limits">Maximum size: 10MB</div>
          </div>
        ) : (
          <div className="pdf-selected-file">
            <div className="file-info-bar">
              <div className="file-icon">📕</div>
              <div className="file-details">
                <div className="file-name">{file.name}</div>
                <div className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
              </div>
              {!loading && (
                <button className="btn-clear-file" onClick={clearFile} title="Remove file">
                  ✕
                </button>
              )}
            </div>

            {loading && (
              <div className="upload-progress-container">
                <div className="spinner"></div>
                <div className="progress-status-text">{progressText}</div>
              </div>
            )}

            {errorMsg && (
              <div className="alert alert-error mt-md">
                <span className="icon">⚠</span>
                <div>{errorMsg}</div>
              </div>
            )}

            {!loading && (
              <div className="upload-actions mt-lg">
                <button className="btn btn-gold btn-full btn-lg" onClick={uploadAndParse}>
                  ✨ Analyze Document Contents
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
