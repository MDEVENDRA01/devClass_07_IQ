'use client';
import { useState, useEffect } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import InputForm from '@/components/Coach/InputForm';
import OutputPanel from '@/components/Coach/OutputPanel';
import { generateMockAIResponse } from '@/lib/mockAI';
import { useSearchParams } from 'next/navigation';
import { TEMPLATE_PRESETS } from '@/lib/constants';

import { Suspense } from 'react';

function CoachContent() {
  const searchParams = useSearchParams();
  const templateIdx = searchParams.get('template');
  
  const [formData, setFormData] = useState({
    subject: '', grade: '', topic: '', duration: '',
    assessmentMethod: '', teachingMethods: [],
    learningObjectives: '', lessonPlanSummary: '', resources: []
  });
  
  const [status, setStatus] = useState('empty'); // empty, loading, success, error
  const [outputData, setOutputData] = useState(null);

  useEffect(() => {
    if (templateIdx !== null && parseInt(templateIdx) >= 1 && parseInt(templateIdx) <= TEMPLATE_PRESETS.length) {
      setFormData({ ...formData, ...TEMPLATE_PRESETS[parseInt(templateIdx) - 1] });
    }
  }, [templateIdx]);

  const handleGenerate = async () => {
    // Basic validation
    if (!formData.subject || !formData.grade || !formData.topic || !formData.duration || 
        !formData.learningObjectives || !formData.lessonPlanSummary) {
      alert("Please fill in all required fields (marked with *).");
      return;
    }

    setStatus('loading');
    try {
      const data = await generateMockAIResponse(formData);
      setOutputData(data);
      setStatus('success');
    } catch (e) {
      setStatus('error');
    }
  };

  const handleRegenerate = async () => {
    setStatus('loading');
    try {
      const data = await generateMockAIResponse(formData);
      setOutputData(data);
      setStatus('success');
    } catch (e) {
      setStatus('error');
    }
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear the form? All entered data will be lost.')) {
      setFormData({
        subject: '', grade: '', topic: '', duration: '',
        assessmentMethod: '', teachingMethods: [],
        learningObjectives: '', lessonPlanSummary: '', resources: []
      });
      setStatus('empty');
      setOutputData(null);
    }
  };

  return (
    <>
      <div className="page-header mb-md">
        <h1>AI Coach Tool</h1>
        <p>Get instant feedback and pedagogical improvements for your lesson plans.</p>
      </div>

      <div className="coach-layout">
        <InputForm 
          formData={formData} 
          setFormData={setFormData}
          onGenerate={handleGenerate}
          onRegenerate={handleRegenerate}
          onClear={handleClear}
          loading={status === 'loading'}
          outputReady={status === 'success'}
        />
        
        <OutputPanel 
          status={status}
          data={outputData}
        />
      </div>
    </>
  );
}

export default function CoachPage() {
  return (
    <AppLayout>
      <Suspense fallback={
        <div className="flex-center" style={{height: 400}}>
          <div className="spinner" style={{borderColor: 'var(--color-primary)', borderTopColor: 'transparent', width: 40, height: 40, borderWidth: 4}}></div>
        </div>
      }>
        <CoachContent />
      </Suspense>
    </AppLayout>
  );
}
