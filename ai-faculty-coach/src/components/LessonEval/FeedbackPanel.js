'use client';
import { useState, useEffect } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export default function FeedbackPanel({ feedback }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    clarityScore,
    structureScore,
    engagementScore,
    vocabularyScore,
    effectivenessScore,
    overallAssessment,
    strengths,
    improvements,
    missingConcepts
  } = feedback;

  const chartData = [
    { subject: 'Clarity', value: clarityScore },
    { subject: 'Structure', value: structureScore },
    { subject: 'Engagement', value: engagementScore },
    { subject: 'Vocabulary', value: vocabularyScore },
    { subject: 'Effectiveness', value: effectivenessScore },
  ];

  return (
    <div className="feedback-panel animate-fadeIn">
      <div className="analysis-grid-top">
        {/* Overall Assessment Box */}
        <div className="card" style={{ flex: 1.2 }}>
          <div className="card-header border-accent">
            <h3>Overall Educational Assessment</h3>
          </div>
          <div className="card-body">
            <p className="assessment-narrative" style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
              {overallAssessment}
            </p>
            
            <div className="score-bars-container">
              <h4 style={{ fontSize: 13, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 12 }}>Score Details</h4>
              {chartData.map((item, idx) => (
                <div key={idx} className="score-bar-row" style={{ marginBottom: 12 }}>
                  <div className="score-bar-info flex-between" style={{ marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, fontSize: 13 }}>{item.subject}</span>
                    <span style={{ fontWeight: 700, color: 'var(--color-accent)' }}>{item.value.toFixed(1)} / 10</span>
                  </div>
                  <div className="score-bar-track" style={{ height: 6, background: 'var(--color-border-light)', borderRadius: 3, overflow: 'hidden' }}>
                    <div 
                      className="score-bar-fill" 
                      style={{ 
                        height: '100%', 
                        width: `${item.value * 10}%`, 
                        background: 'linear-gradient(90deg, var(--color-accent) 0%, var(--color-gold) 100%)',
                        borderRadius: 3,
                        transition: 'width var(--transition-slow)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Radar Chart Visual */}
        <div className="card flex-center" style={{ flex: 0.8, minHeight: 320 }}>
          <div className="card-body flex-center" style={{ width: '100%', height: '100%', position: 'relative', flexDirection: 'column' }}>
            <h4 style={{ color: 'var(--color-text-muted)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Performance Footprint</h4>
            {mounted ? (
              <div style={{ width: '100%', height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                    <PolarGrid stroke="var(--color-border)" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: 'var(--color-text)', fontSize: 11, fontWeight: 500 }}
                    />
                    <PolarRadiusAxis 
                      angle={30} 
                      domain={[0, 10]} 
                      tick={{ fill: 'var(--color-text-light)', fontSize: 9 }}
                    />
                    <Radar
                      name="Lesson Quality"
                      dataKey="value"
                      stroke="var(--color-accent)"
                      fill="var(--color-accent)"
                      fillOpacity={0.25}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="spinner"></div>
            )}
          </div>
        </div>
      </div>

      {/* Strengths & Improvements Grid */}
      <div className="grid-2 mt-md">
        <div className="card">
          <div className="card-header border-success">
            <h3 style={{ color: 'var(--color-success)' }}>✨ Strengths Detected</h3>
          </div>
          <div className="card-body">
            <ul className="list-styled">
              {strengths.map((str, i) => (
                <li key={i} className="mb-sm">
                  <span className="list-bullet text-success">✓</span>
                  <div>{str}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="card-header border-gold">
            <h3 style={{ color: 'var(--color-gold-dark)' }}>⚠️ Recommendations for Improvement</h3>
          </div>
          <div className="card-body">
            <ul className="list-styled mb-lg">
              {improvements.map((imp, i) => (
                <li key={i} className="mb-sm">
                  <span className="list-bullet text-danger">●</span>
                  <div>{imp}</div>
                </li>
              ))}
            </ul>

            {missingConcepts && missingConcepts.length > 0 && (
              <div className="missing-concepts-box" style={{ background: 'var(--color-danger-light)', border: '1px solid var(--color-danger)20', borderRadius: 'var(--radius-btn)', padding: '12px 16px' }}>
                <h4 style={{ color: 'var(--color-danger)', fontSize: 12, textTransform: 'uppercase', marginBottom: 8, letterSpacing: '0.02em' }}>⚠️ Missing Pedagogical Elements</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {missingConcepts.map((mis, i) => (
                    <span key={i} className="badge" style={{ background: 'white', color: 'var(--color-danger)', border: '1px solid var(--color-danger)30', padding: '4px 8px', borderRadius: 6, fontSize: 12 }}>
                      {mis}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
