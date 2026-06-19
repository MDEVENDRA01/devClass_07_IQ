'use client';
import { useState, Suspense } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import StepProgress from '@/components/LessonEval/StepProgress';
import PdfUploader from '@/components/LessonEval/PdfUploader';
import AnalysisPanel from '@/components/LessonEval/AnalysisPanel';
import FeedbackPanel from '@/components/LessonEval/FeedbackPanel';
import RecommendationsPanel from '@/components/LessonEval/RecommendationsPanel';
import QuestionsPanel from '@/components/LessonEval/QuestionsPanel';
import SummaryPanel from '@/components/LessonEval/SummaryPanel';

import { analyzeLessonContent } from '@/lib/lessonAnalyzer';
import { generateQuestionsForLesson } from '@/lib/questionGenerator';
import { generateSummaries } from '@/lib/summaryGenerator';
import { exportToPdf } from '@/lib/pdfExport';
import { useApp } from '@/context/AppContext';

function LessonEvalContent() {
  const { addToast } = useApp();
  const [step, setStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);
  
  // PDF Text info
  const [pdfInfo, setPdfInfo] = useState(null);

  // Analysis result state
  const [metadata, setMetadata] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [summaries, setSummaries] = useState(null);

  const handleUploadSuccess = (result) => {
    try {
      setPdfInfo({
        fileName: result.fileName,
        numPages: result.numPages,
        fileSize: result.fileSize
      });

      // Run mock AI analysis pipeline
      const analysis = analyzeLessonContent(result.text);
      const generatedQuestions = generateQuestionsForLesson(analysis.metadata);
      const generatedSummaries = generateSummaries(analysis.metadata);

      setMetadata(analysis.metadata);
      setFeedback(analysis.feedback);
      setRecommendations(analysis.recommendations);
      setQuestions(generatedQuestions);
      setSummaries(generatedSummaries);

      setMaxStepReached(6); // Unlock all steps since evaluation is fully generated
      setStep(2); // Jump to analysis
      addToast('Lesson evaluation ready!', 'success');
    } catch (error) {
      console.error(error);
      addToast('Failed to evaluate lesson text.', 'error');
    }
  };

  const handleStepClick = (stepNum) => {
    setStep(stepNum);
  };

  const nextStep = () => {
    if (step < 6) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handlePdfExport = (exportType) => {
    if (!metadata) {
      addToast('No evaluation data to export.', 'error');
      return;
    }
    
    addToast(`Preparing PDF export (${exportType})...`, 'info');
    
    try {
      exportToPdf(exportType, {
        metadata,
        feedback,
        recommendations,
        questions,
        summaries
      });
      addToast('PDF downloaded!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to generate PDF.', 'error');
    }
  };

  const resetFlow = () => {
    if (confirm('Are you sure you want to discard this analysis and upload a new PDF?')) {
      setStep(1);
      setMaxStepReached(1);
      setPdfInfo(null);
      setMetadata(null);
      setFeedback(null);
      setRecommendations(null);
      setQuestions(null);
      setSummaries(null);
    }
  };

  const renderActiveStep = () => {
    switch (step) {
      case 1:
        return <PdfUploader onUploadSuccess={handleUploadSuccess} />;
      case 2:
        return <AnalysisPanel metadata={metadata} />;
      case 3:
        return <FeedbackPanel feedback={feedback} />;
      case 4:
        return <RecommendationsPanel recommendations={recommendations} />;
      case 5:
        return (
          <QuestionsPanel 
            questions={questions} 
            onExportQuestions={() => handlePdfExport('questions')} 
          />
        );
      case 6:
        return <SummaryPanel summaries={summaries} />;
      default:
        return null;
    }
  };

  return (
    <div className="lesson-eval-layout-container">
      {/* Page Header */}
      <div className="page-header flex-between flex-wrap gap-md mb-md">
        <div>
          <h1>AI Lesson Evaluation Platform</h1>
          <p>Evaluate teaching materials, generate questionnaires, and customize classroom recommendations.</p>
        </div>
        
        {pdfInfo && (
          <div className="header-actions" style={{ display: 'flex', gap: 10 }}>
            {/* Quick action buttons */}
            <div className="dropdown-action-group" style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-outline btn-sm" onClick={() => handlePdfExport('full')}>
                ⬇ Export Report
              </button>
              <button className="btn btn-outline-gold btn-sm" onClick={() => handlePdfExport('recommendations')}>
                💡 Export Guide
              </button>
              <button className="btn btn-danger-ghost btn-sm" onClick={resetFlow}>
                ✕ Upload New
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Step Navigation Wizard */}
      <StepProgress 
        currentStep={step} 
        maxStepReached={maxStepReached} 
        onStepClick={handleStepClick} 
      />

      {/* Wizard Content Viewport */}
      <div className="wizard-viewport mt-lg">
        {renderActiveStep()}
      </div>

      {/* Wizard Bottom Controls */}
      {pdfInfo && (
        <div className="wizard-bottom-controls card mt-lg" style={{ borderTop: '1px solid var(--color-border-light)' }}>
          <div className="card-body flex-between flex-wrap gap-md" style={{ padding: '16px 24px' }}>
            <div className="loaded-file-indicator text-muted" style={{ fontSize: 13 }}>
              📕 <strong>{pdfInfo.fileName}</strong> ({pdfInfo.numPages} pages) • {metadata?.subject}
            </div>

            <div className="wizard-nav-buttons" style={{ display: 'flex', gap: 10 }}>
              {step > 1 && (
                <button className="btn btn-outline" onClick={prevStep}>
                  ← Previous Section
                </button>
              )}
              {step < 6 ? (
                <button className="btn btn-primary" onClick={nextStep}>
                  Next Section →
                </button>
              ) : (
                <button className="btn btn-gold" onClick={() => addToast('You have reached the end of the evaluation!', 'info')}>
                  ✓ Review Complete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LessonEvalPage() {
  return (
    <AppLayout>
      <Suspense fallback={
        <div className="flex-center" style={{ height: 400 }}>
          <div className="spinner" style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent', width: 40, height: 40, borderWidth: 4 }}></div>
        </div>
      }>
        <LessonEvalContent />
      </Suspense>
    </AppLayout>
  );
}
