'use client';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function QuestionsPanel({ questions, onExportQuestions }) {
  const { addToast } = useApp();
  const [activeType, setActiveType] = useState('MCQ');
  const [activeDiff, setActiveDiff] = useState('Medium');
  const [revealedAnswers, setRevealedAnswers] = useState({});

  const questionTypes = [
    { key: 'MCQ', label: 'MCQs', icon: '❓' },
    { key: 'ShortAnswer', label: 'Short Answer', icon: '📝' },
    { key: 'LongAnswer', label: 'Long Answer', icon: '📜' },
    { key: 'Conceptual', label: 'Conceptual', icon: '🧠' },
    { key: 'CriticalThinking', label: 'Critical Thinking', icon: '🔬' },
    { key: 'ScenarioBased', label: 'Scenario-Based', icon: '💼' },
    { key: 'ActivityBased', label: 'Activity-Based', icon: '🏃' },
  ];

  const difficulties = ['Easy', 'Medium', 'Hard'];

  const toggleAnswer = (qIdx) => {
    setRevealedAnswers(prev => ({
      ...prev,
      [`${activeType}-${activeDiff}-${qIdx}`]: !prev[`${activeType}-${activeDiff}-${qIdx}`]
    }));
  };

  const copyToClipboard = (text, msg = 'Question copied!') => {
    navigator.clipboard.writeText(text);
    addToast(msg, 'success');
  };

  const copyActiveQuestions = () => {
    const list = questions[activeType]?.[activeDiff] || [];
    if (list.length === 0) return;

    let text = `--- ${activeType} Questions (${activeDiff} Level) ---\n\n`;
    list.forEach((q, idx) => {
      text += `Q${idx + 1}: ${q.question}\n`;
      if (activeType === 'MCQ' && q.options) {
        q.options.forEach((opt, oIdx) => {
          text += `  ${String.fromCharCode(65 + oIdx)}) ${opt}\n`;
        });
        text += `Correct Answer: ${q.answer}\n`;
      } else {
        text += `Suggested Answer/Rubric: ${q.answer}\n`;
      }
      text += `\n`;
    });

    copyToClipboard(text, 'Copied all active questions!');
  };

  const activeQuestionsList = questions[activeType]?.[activeDiff] || [];

  return (
    <div className="questions-panel animate-fadeIn">
      {/* Question Type Tabs */}
      <div className="questions-tabs-scroll-container" style={{ overflowX: 'auto', marginBottom: 16 }}>
        <div className="questions-type-tabs" style={{ display: 'flex', gap: 8, paddingBottom: 6, borderBottom: '1px solid var(--color-border-light)', minWidth: 'max-content' }}>
          {questionTypes.map(tab => (
            <button
              key={tab.key}
              className={`question-tab-btn ${activeType === tab.key ? 'active' : ''}`}
              onClick={() => {
                setActiveType(tab.key);
                setRevealedAnswers({});
              }}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 13,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: activeType === tab.key ? 'var(--color-primary)' : 'var(--color-bg-card)',
                color: activeType === tab.key ? 'white' : 'var(--color-text-muted)',
                border: `1px solid ${activeType === tab.key ? 'var(--color-primary)' : 'var(--color-border)'}`
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty & Export Controls */}
      <div className="flex-between flex-wrap gap-md mb-lg">
        {/* Difficulty Pills */}
        <div style={{ display: 'flex', gap: 8 }}>
          {difficulties.map(diff => (
            <button
              key={diff}
              onClick={() => setActiveDiff(diff)}
              className={`btn btn-sm ${activeDiff === diff ? 'btn-gold' : 'btn-outline'}`}
              style={{ padding: '6px 14px', borderRadius: 'var(--radius-pill)', fontWeight: 600 }}
            >
              {diff}
            </button>
          ))}
        </div>

        {/* Global Controls */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-outline btn-sm" onClick={copyActiveQuestions} disabled={activeQuestionsList.length === 0}>
            📋 Copy Section
          </button>
          <button className="btn btn-primary btn-sm" onClick={onExportQuestions}>
            ⬇ Handout PDF
          </button>
        </div>
      </div>

      {/* Questions list */}
      <div className="questions-container" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {activeQuestionsList.length > 0 ? (
          activeQuestionsList.map((q, idx) => {
            const isRevealed = revealedAnswers[`${activeType}-${activeDiff}-${idx}`];
            
            // Generate raw text for individual copy
            let rawQText = `Q: ${q.question}\n`;
            if (activeType === 'MCQ' && q.options) {
              q.options.forEach((opt, oIdx) => {
                rawQText += `${String.fromCharCode(65 + oIdx)}) ${opt}\n`;
              });
              rawQText += `Answer: ${q.answer}`;
            } else {
              rawQText += `Suggested Answer: ${q.answer}`;
            }

            return (
              <div key={idx} className="card question-card" style={{ borderLeft: '4px solid var(--color-gold)' }}>
                <div className="card-body" style={{ padding: '20px' }}>
                  <div className="flex-between mb-sm" style={{ alignItems: 'flex-start' }}>
                    <h4 style={{ fontSize: 15, lineHeight: 1.5, flex: 1, paddingRight: 16 }}>
                      Q{idx + 1}: {q.question}
                    </h4>
                    <button 
                      className="btn-copy-small" 
                      onClick={() => copyToClipboard(rawQText)}
                      style={{ background: 'var(--color-bg-page)', fontSize: 11, padding: '4px 8px', borderRadius: 4, color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}
                      title="Copy question"
                    >
                      📋 Copy
                    </button>
                  </div>

                  {/* Options for MCQs */}
                  {activeType === 'MCQ' && q.options && (
                    <div className="mcq-options-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, margin: '14px 0' }}>
                      {q.options.map((opt, oIdx) => {
                        const letter = String.fromCharCode(65 + oIdx);
                        const isCorrect = opt === q.answer;
                        return (
                          <div 
                            key={oIdx} 
                            style={{
                              padding: '10px 14px',
                              borderRadius: 'var(--radius-input)',
                              border: `1px solid ${isRevealed && isCorrect ? 'var(--color-success)' : 'var(--color-border)'}`,
                              background: isRevealed && isCorrect ? 'var(--color-success-light)' : 'var(--color-bg-input)',
                              fontSize: 13,
                              color: isRevealed && isCorrect ? 'var(--color-success)' : 'var(--color-text)',
                              fontWeight: isRevealed && isCorrect ? 600 : 'normal'
                            }}
                          >
                            <span style={{ fontWeight: 700, marginRight: 6 }}>{letter}.</span> {opt}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Answer Section */}
                  <div className="answer-section mt-md" style={{ borderTop: '1px dashed var(--color-border)', paddingTop: 12 }}>
                    <div className="flex-between">
                      <button 
                        className="btn btn-outline-gold btn-sm" 
                        onClick={() => toggleAnswer(idx)}
                        style={{ fontSize: 12, padding: '5px 12px' }}
                      >
                        {isRevealed ? '👁️ Hide Answer' : '👁️ Reveal Answer'}
                      </button>
                    </div>

                    {isRevealed && (
                      <div className="answer-reveal-box mt-sm animate-fadeIn" style={{
                        padding: '12px 16px',
                        background: 'var(--color-warning-light)',
                        border: '1px solid var(--color-gold)30',
                        borderRadius: 'var(--radius-btn)',
                        fontSize: 13
                      }}>
                        <strong style={{ color: 'var(--color-gold-dark)', display: 'block', marginBottom: 4 }}>
                          {activeType === 'MCQ' ? 'Correct Option:' : 'Suggested Answer / Evaluation Rubric:'}
                        </strong>
                        <span style={{ color: 'var(--color-text)' }}>{q.answer}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-muted py-lg">
            No questions available for this configuration.
          </div>
        )}
      </div>
    </div>
  );
}
