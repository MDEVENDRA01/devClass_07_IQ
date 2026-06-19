'use client';
import { useAuth } from '@/context/AuthContext';
import AppLayout from '@/components/Layout/AppLayout';
import Link from 'next/link';
import { generateMockHistory } from '@/lib/mockAI';
import { useState, useEffect } from 'react';

import { SUBJECTS, GRADES } from '@/lib/constants';
import { useApp } from '@/context/AppContext';
import { analyzeLessonContent } from '@/lib/lessonAnalyzer';
import { generateQuestionsForLesson } from '@/lib/questionGenerator';
import { generateSummaries } from '@/lib/summaryGenerator';
import { exportToPdf } from '@/lib/pdfExport';

export default function Dashboard() {
  const { user } = useAuth();
  const { addToast } = useApp();
  const [recentGens, setRecentGens] = useState([]);
  
  // Concept Generator States
  const [conceptSubject, setConceptSubject] = useState('');
  const [conceptGrade, setConceptGrade] = useState('');
  const [conceptName, setConceptName] = useState('');
  const [generatingConcept, setGeneratingConcept] = useState(false);

  useEffect(() => {
    // Get just the 3 most recent for the dashboard
    setRecentGens(generateMockHistory().slice(0, 3));
  }, []);

  const handleGenerateConceptPdf = async (e) => {
    e.preventDefault();
    if (!conceptSubject || !conceptGrade || !conceptName.trim()) {
      addToast('Please fill in all concept details.', 'error');
      return;
    }

    setGeneratingConcept(true);
    addToast('Generating concept PDF...', 'info');

    try {
      // Simulate small AI generation delay for realistic feel
      await new Promise(resolve => setTimeout(resolve, 1500));

      const synthesizedText = `
Subject: ${conceptSubject}
Grade: ${conceptGrade}
Topic: ${conceptName.trim()}
Lesson Title: Detailed Concept Notes on ${conceptName.trim()}

Learning Objectives:
- Students will understand and define the fundamental aspects of ${conceptName.trim()}.
- Students will explain the practical relevance of ${conceptName.trim()} in everyday scenarios.
- Students will solve conceptual challenges and questions related to ${conceptName.trim()}.

Overview:
This study guide offers an intensive conceptual overview of ${conceptName.trim()} under the ${conceptSubject} curriculum for ${conceptGrade}. 
It outlines definitions, operational parameters, real-world examples, and questions.
      `;

      // 1. Run analysis
      const analysis = analyzeLessonContent(synthesizedText);
      analysis.metadata.subject = conceptSubject;
      analysis.metadata.topic = conceptName.trim();
      analysis.metadata.title = `Concept Notes: ${conceptName.trim()}`;
      analysis.metadata.difficultyLevel = 'Medium';

      // 2. Run questions and summaries
      const generatedQuestions = generateQuestionsForLesson(analysis.metadata);
      const generatedSummaries = generateSummaries(analysis.metadata);

      // 3. Export to PDF!
      exportToPdf('full', {
        metadata: analysis.metadata,
        feedback: analysis.feedback,
        recommendations: analysis.recommendations,
        questions: generatedQuestions,
        summaries: generatedSummaries
      });

      addToast('Concept PDF generated & downloaded!', 'success');
      setConceptName(''); // clear input on success
    } catch (error) {
      console.error(error);
      addToast('Failed to generate concept PDF.', 'error');
    } finally {
      setGeneratingConcept(false);
    }
  };

  return (
    <AppLayout>
      <div className="page-header">
        <h1>Welcome Back, {user?.name.split(' ')[0]} 👋</h1>
        <p>Here's what's happening with your lesson planning today.</p>
      </div>
      
      {/* PDF Evaluation Banner Card */}
      <div className="card mb-lg animate-fadeIn" style={{
        background: 'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-accent) 100%)',
        color: 'white',
        border: 'none',
        boxShadow: 'var(--shadow-card)'
      }}>
        <div className="card-body" style={{ padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <h2 style={{ color: 'var(--color-gold)', marginBottom: 8, fontSize: 22 }}>📁 Advanced PDF Lesson Evaluation</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 14 }}>
              Upload lesson plans, curriculum sheets, or textbooks as PDFs. Extract topics, generate diagnostic questions, analyze alignment, and export PDF reports instantly.
            </p>
          </div>
          <Link href="/lesson-eval" className="btn btn-gold btn-lg" style={{ height: 'fit-content', boxShadow: 'var(--shadow-gold)' }}>
            ⚡ Upload & Evaluate PDF
          </Link>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon dark">📄</div>
          <div>
            <div className="kpi-value">54</div>
            <div className="kpi-label">Evaluations (12 PDF)</div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon success">⭐</div>
          <div>
            <div className="kpi-value">8.5</div>
            <div className="kpi-label">Average Quality Score</div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon accent">🔥</div>
          <div>
            <div className="kpi-value">6</div>
            <div className="kpi-label">Day Streak</div>
          </div>
        </div>
        <div className="kpi-card" style={{
          background: 'linear-gradient(135deg, var(--color-primary) 0%, #1A1A1A 100%)', 
          color: 'white', 
          flexDirection: 'column', 
          alignItems: 'stretch',
          gap: 10, 
          padding: '16px',
          minWidth: '260px'
        }}>
          <h4 style={{ color: 'var(--color-gold)', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, fontWeight: 700 }}>
            ⚡ Quick Concept PDF
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <select 
              className="form-input form-select" 
              style={{ padding: '6px 10px', height: '32px', fontSize: 12, background: '#262626', color: 'white', borderColor: '#404040' }}
              value={conceptSubject}
              onChange={(e) => setConceptSubject(e.target.value)}
              disabled={generatingConcept}
            >
              <option value="" style={{color: 'black'}}>Select Subject...</option>
              {SUBJECTS.filter(s => s !== 'Other').map(s => <option key={s} value={s} style={{color: 'black'}}>{s}</option>)}
            </select>

            <select 
              className="form-input form-select" 
              style={{ padding: '6px 10px', height: '32px', fontSize: 12, background: '#262626', color: 'white', borderColor: '#404040' }}
              value={conceptGrade}
              onChange={(e) => setConceptGrade(e.target.value)}
              disabled={generatingConcept}
            >
              <option value="" style={{color: 'black'}}>Select Class...</option>
              {GRADES.map(g => <option key={g} value={g} style={{color: 'black'}}>{g}</option>)}
            </select>

            <input 
              type="text" 
              className="form-input" 
              placeholder="Concept Name (e.g. Inertia)" 
              style={{ padding: '6px 10px', height: '32px', fontSize: 12, background: '#262626', color: 'white', borderColor: '#404040' }}
              value={conceptName}
              onChange={(e) => setConceptName(e.target.value)}
              disabled={generatingConcept}
            />

            <button 
              type="button" 
              className="btn btn-gold btn-sm btn-full" 
              style={{ height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 12, fontWeight: 600 }}
              onClick={handleGenerateConceptPdf}
              disabled={generatingConcept}
            >
              {generatingConcept ? (
                <><div className="spinner" style={{width: 14, height: 14, borderWidth: 2}}></div> Generating...</>
              ) : (
                '⚡ Generate Concept PDF'
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3>Recent Generations</h3>
            <Link href="/history" style={{fontSize: 13, fontWeight: 600}}>View All →</Link>
          </div>
          <div className="card-body" style={{padding: '16px 24px'}}>
            {recentGens.map((gen, idx) => (
              <div key={gen.id} style={{
                padding: '16px 0', 
                borderBottom: idx < recentGens.length - 1 ? '1px solid var(--color-border-light)' : 'none',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <div>
                  <div style={{display: 'flex', gap: 8, marginBottom: 4}}>
                    <span className="chip" style={{background: 'var(--color-bg-page)', color: 'var(--color-primary)'}}>{gen.subject}</span>
                    <span className="chip" style={{background: 'var(--color-bg-page)', color: 'var(--color-primary)'}}>{gen.grade}</span>
                  </div>
                  <h4 style={{marginBottom: 4}}>{gen.topic}</h4>
                  <div className="text-muted" style={{fontSize: 12}}>
                    {new Date(gen.date).toLocaleDateString('en-IN', {day: 'numeric', month: 'short', year: 'numeric'})}
                  </div>
                </div>
                <div className={`score-badge ${gen.qualityScore >= 7 ? 'high' : gen.qualityScore >= 4 ? 'medium' : 'low'}`} style={{padding: '6px 14px', fontSize: 14}}>
                  {gen.qualityScore.toFixed(1)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Quick Launch Templates</h3>
          </div>
          <div className="card-body">
            <p className="text-muted mb-md">Start a new evaluation instantly using one of our verified presets.</p>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
              <Link href="/coach?template=1" className="feature-pill" style={{background: 'var(--color-bg-input)', color: 'var(--color-text)', border: '1px solid var(--color-border)', textDecoration: 'none'}}>
                <span className="pill-icon">🔬</span>
                <div>
                  <div style={{fontWeight: 600}}>Science — Photosynthesis</div>
                  <div style={{fontSize: 12, color: 'var(--color-text-muted)'}}>Class 9 • Lecture + Demo</div>
                </div>
              </Link>
              <Link href="/coach?template=2" className="feature-pill" style={{background: 'var(--color-bg-input)', color: 'var(--color-text)', border: '1px solid var(--color-border)', textDecoration: 'none'}}>
                <span className="pill-icon">📐</span>
                <div>
                  <div style={{fontWeight: 600}}>Maths — Quadratic Equations</div>
                  <div style={{fontSize: 12, color: 'var(--color-text-muted)'}}>Class 10 • Discussion</div>
                </div>
              </Link>
              <Link href="/coach?template=3" className="feature-pill" style={{background: 'var(--color-bg-input)', color: 'var(--color-text)', border: '1px solid var(--color-border)', textDecoration: 'none'}}>
                <span className="pill-icon">📖</span>
                <div>
                  <div style={{fontWeight: 600}}>English — Creative Writing</div>
                  <div style={{fontSize: 12, color: 'var(--color-text-muted)'}}>Class 8 • Collaborative</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
