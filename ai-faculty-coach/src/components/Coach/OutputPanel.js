'use client';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function OutputPanel({ status, data }) {
  const { addToast } = useApp();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleCopy = () => {
    if (!data) return;
    const text = `Quality Score: ${data.qualityScore}/10\n\nOverall Assessment:\n${data.overallAssessment}\n\nStrengths:\n${data.strengths.join('\n')}\n\nImprovements:\n${data.improvements.join('\n')}\n\nDelivery Recommendations:\n${data.deliveryRecommendations.join('\n')}`;
    navigator.clipboard.writeText(text);
    addToast('Copied to clipboard!');
  };

  const handleRate = (val) => {
    setRating(val);
    addToast('Thanks for your feedback!', 'success');
  };

  if (status === 'empty') {
    return (
      <div className="output-panel flex-center" style={{minHeight: 500}}>
        <div className="output-empty">
          <div className="empty-icon">🤖</div>
          <h3>Ready to Evaluate</h3>
          <p>Fill in your lesson details and click Generate to see the AI analysis here.</p>
        </div>
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <div className="output-panel">
        <div className="output-header">
          <h3 style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <div className="spinner" style={{borderColor: 'var(--color-primary)', borderTopColor: 'transparent', width: 20, height: 20, borderWidth: 3}}></div>
            AI is analysing your lesson...
          </h3>
        </div>
        <div className="output-body">
          <div className="skeleton skeleton-card mb-lg" style={{height: 140}}></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line short"></div>
          <br/>
          <div className="skeleton-line"></div>
          <div className="skeleton-line medium"></div>
          <div className="skeleton-line"></div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="output-panel flex-center" style={{minHeight: 500}}>
        <div className="alert alert-error">
          <span className="icon" style={{fontSize: 24}}>⚠</span>
          <div>
            <h4 style={{marginBottom: 4, color: 'var(--color-danger)'}}>Generation Failed</h4>
            <p>There was an error communicating with the AI service. Please try again.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const getScoreColorClass = (score) => {
    if (score >= 7) return 'high';
    if (score >= 4) return 'medium';
    return 'low';
  };

  return (
    <div className="output-panel animate-fadeIn">
      <div className="output-header">
        <h3>AI Evaluation Results</h3>
        <div className={`score-badge ${getScoreColorClass(data.qualityScore)}`}>
          {data.qualityScore.toFixed(1)} <span style={{fontSize: 14, opacity: 0.8, marginLeft: 2}}>/ 10</span>
        </div>
      </div>

      <div className="output-body">
        <div className="output-section blue-border">
          <h4 style={{color: 'var(--color-accent)'}}>Overall Assessment</h4>
          <p>{data.overallAssessment}</p>
        </div>

        <div className="grid-2">
          <div className="output-section green-border">
            <h4 style={{color: 'var(--color-success)'}}>Strengths</h4>
            <ul>
              {data.strengths.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>

          <div className="output-section amber-border">
            <h4 style={{color: 'var(--color-gold-dark)'}}>Areas for Improvement</h4>
            <ul>
              {data.improvements.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        </div>

        <div className="output-section dark-border" style={{background: 'linear-gradient(135deg, var(--color-primary) 0%, #1A1A1A 100%)', color: 'white'}}>
          <h4 style={{color: 'var(--color-gold)'}}>Delivery Recommendations</h4>
          <ol style={{paddingLeft: 20, color: 'rgba(255,255,255,0.9)', fontSize: 14, lineHeight: 1.6}}>
            {data.deliveryRecommendations.map((s, i) => <li key={i} style={{padding: '4px 0'}}>{s}</li>)}
          </ol>
        </div>

        <div className="output-section blue-border">
          <h4 style={{color: 'var(--color-accent)'}}>Alignment Analysis</h4>
          <p>{data.alignmentAnalysis}</p>
        </div>

        <div className="output-section green-border">
          <h4 style={{color: 'var(--color-success)'}}>Suggested Activities</h4>
          <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
            {data.suggestedActivities.map((act, i) => (
              <div key={i} style={{padding: 12, background: 'var(--color-bg-page)', borderRadius: 'var(--radius-btn)', border: '1px solid var(--color-border)'}}>
                <div style={{fontWeight: 600, color: 'var(--color-primary)'}}>{act.name}</div>
                <div style={{fontSize: 12, color: 'var(--color-text-muted)', display: 'flex', gap: 8, marginTop: 4}}>
                  <span className="badge badge-dark">⏱ {act.duration}</span>
                  <span className="badge badge-gold">🧠 {act.method}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="output-section amber-border" style={{background: 'var(--color-warning-light)'}}>
          <h4 style={{color: 'var(--color-gold-dark)'}}>Assessment Tips</h4>
          <ul>
            {data.assessmentTips.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      </div>

      <div className="output-actions">
        <button className="btn btn-outline btn-sm" onClick={handleCopy}>📋 Copy</button>
        <button className="btn btn-outline btn-sm" onClick={() => addToast('Downloading TXT...')}>⬇ TXT</button>
        <button className="btn btn-outline btn-sm" onClick={() => addToast('Downloading PDF...')}>⬇ PDF</button>
        
        <div style={{flex: 1}}></div>
        
        <div style={{display: 'flex', alignItems: 'center', gap: 12, paddingRight: 8}}>
          <span style={{fontSize: 13, color: 'var(--color-text-muted)'}}>Rate this response:</span>
          <div className="star-rating">
            {[1,2,3,4,5].map(star => (
              <span 
                key={star} 
                className={`star ${star <= (hoverRating || rating) ? 'filled' : ''}`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleRate(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
