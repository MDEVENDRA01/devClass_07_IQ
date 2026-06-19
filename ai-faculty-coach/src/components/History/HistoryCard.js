'use client';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function HistoryCard({ generation }) {
  const { addToast } = useApp();
  const [showFull, setShowFull] = useState(false);

  const getScoreColorClass = (score) => {
    if (score >= 7) return 'high';
    if (score >= 4) return 'medium';
    return 'low';
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generation.fullResponse?.overallAssessment || generation.preview);
    addToast('Content copied to clipboard!');
  };

  const handleExport = () => {
    try {
      const text = `Topic: ${generation.topic}\nSubject: ${generation.subject}\nGrade: ${generation.grade}\nQuality Score: ${generation.qualityScore}\n\nOVERALL ASSESSMENT:\n${generation.fullResponse?.overallAssessment || generation.preview}\n\n${generation.fullResponse?.strengths ? `STRENGTHS:\n${generation.fullResponse.strengths.map(s => `- ${s}`).join('\n')}\n\n` : ''}${generation.fullResponse?.improvements ? `IMPROVEMENTS:\n${generation.fullResponse.improvements.map(i => `- ${i}`).join('\n')}\n\n` : ''}${generation.fullResponse?.deliveryRecommendations ? `DELIVERY RECOMMENDATIONS:\n${generation.fullResponse.deliveryRecommendations.map(d => `- ${d}`).join('\n')}\n` : ''}`;

      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Evaluation_${generation.topic.replace(/\s+/g, '_')}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      addToast('Evaluation exported successfully!');
    } catch (e) {
      addToast('Failed to export', 'error');
    }
  };

  return (
    <div className="history-card">
      <div 
        className={`history-bookmark ${generation.bookmarked ? 'active' : ''}`}
        title={generation.bookmarked ? "Bookmarked" : "Bookmark this"}
      >
        🔖
      </div>
      
      <div className="history-card-top">
        <span className="chip" style={{background: 'var(--color-bg-page)', color: 'var(--color-primary)'}}>{generation.subject}</span>
        <span className="chip" style={{background: 'var(--color-bg-page)', color: 'var(--color-primary)'}}>{generation.grade}</span>
        <span style={{fontSize: 12, color: 'var(--color-text-muted)', marginLeft: 'auto', marginRight: 24}}>
          {new Date(generation.date).toLocaleDateString('en-IN', {day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'})}
        </span>
      </div>
      
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12}}>
        <h4>{generation.topic}</h4>
        <div className={`score-badge ${getScoreColorClass(generation.qualityScore)}`} style={{padding: '4px 10px', fontSize: 13, height: 26}}>
          {generation.qualityScore.toFixed(1)}
        </div>
      </div>
      
      <div className="history-card-preview">
        {generation.preview}
      </div>
      
      {generation.rating && (
        <div className="star-rating" style={{marginBottom: 16}}>
          {[1,2,3,4,5].map(star => (
            <span key={star} className={`star ${star <= generation.rating ? 'filled' : ''}`} style={{fontSize: 16, cursor: 'default'}}>★</span>
          ))}
        </div>
      )}
      
      <div className="history-card-actions">
        <button className="btn btn-outline btn-sm" onClick={() => setShowFull(!showFull)}>
          {showFull ? 'Hide Evaluation' : 'View Full Evaluation'}
        </button>
        <button className="btn btn-outline btn-sm" onClick={handleCopy}>Copy Summary</button>
        <button className="btn btn-outline btn-sm" onClick={handleExport}>⬇ Export</button>
      </div>

      {showFull && generation.fullResponse && (
        <div style={{
          marginTop: 16,
          padding: 16,
          background: 'var(--color-bg-page)',
          borderRadius: 8,
          border: '1px solid var(--color-border)'
        }}>
          <h5 style={{marginBottom: 8, color: 'var(--color-primary)'}}>Overall Assessment</h5>
          <p style={{fontSize: 13, marginBottom: 16, lineHeight: 1.5}}>{generation.fullResponse.overallAssessment}</p>
          
          {generation.fullResponse.strengths && (
            <>
              <h5 style={{marginBottom: 8, color: 'var(--color-success)'}}>Strengths</h5>
              <ul style={{fontSize: 13, paddingLeft: 20, marginBottom: 16, lineHeight: 1.5}}>
                {generation.fullResponse.strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </>
          )}
          
          {generation.fullResponse.improvements && (
            <>
              <h5 style={{marginBottom: 8, color: 'var(--color-accent)'}}>Areas for Improvement</h5>
              <ul style={{fontSize: 13, paddingLeft: 20, marginBottom: 16, lineHeight: 1.5}}>
                {generation.fullResponse.improvements.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
