'use client';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function SummaryPanel({ summaries }) {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState('short');

  const tabs = [
    { id: 'short', label: 'Short Summary', icon: '📝' },
    { id: 'detailed', label: 'Detailed Summary', icon: '📜' },
    { id: 'studentFriendly', label: 'Student-Friendly', icon: '👶' },
    { id: 'revisionNotes', label: 'Revision Notes', icon: '📌' },
  ];

  const handleCopy = () => {
    let text = '';
    if (activeTab === 'revisionNotes') {
      text = summaries.revisionNotes.map(note => note.replace(/\*\*/g, '')).join('\n');
    } else {
      text = summaries[activeTab];
    }
    
    navigator.clipboard.writeText(text);
    addToast('Summary copied to clipboard!', 'success');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'revisionNotes':
        return (
          <ul className="list-styled" style={{ marginTop: 8 }}>
            {summaries.revisionNotes.map((note, idx) => {
              // Parse **bold** parts
              const parts = note.split('**');
              return (
                <li key={idx} className="mb-sm" style={{ fontSize: 14.5 }}>
                  <span className="list-bullet" style={{ color: 'var(--color-accent)' }}>●</span>
                  <div>
                    {parts.map((part, pIdx) => 
                      pIdx % 2 === 1 ? <strong key={pIdx} style={{ color: 'var(--color-primary)' }}>{part}</strong> : part
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        );
      case 'studentFriendly':
        return (
          <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--color-text)', fontStyle: 'italic', background: 'var(--color-warning-light)', padding: '20px', borderRadius: 'var(--radius-btn)', borderLeft: '4px solid var(--color-gold)' }}>
            "{summaries.studentFriendly}"
          </p>
        );
      case 'detailed':
        return (
          <p style={{ fontSize: 14.5, lineHeight: 1.8, color: 'var(--color-text)' }}>
            {summaries.detailed}
          </p>
        );
      case 'short':
      default:
        return (
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--color-text)' }}>
            {summaries.short}
          </p>
        );
    }
  };

  return (
    <div className="summary-panel card animate-fadeIn">
      <div className="card-header flex-between" style={{ borderBottom: '1px solid var(--color-border-light)', paddingBottom: 16 }}>
        <h3>📖 Summarized Lesson Formats</h3>
        <button className="btn btn-outline btn-sm" onClick={handleCopy}>
          📋 Copy Summary
        </button>
      </div>
      <div className="card-body">
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid var(--color-border-light)', paddingBottom: 10, marginBottom: 20, overflowX: 'auto' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: 'var(--radius-btn)',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: activeTab === tab.id ? 'var(--color-accent-light)' : 'transparent',
                color: activeTab === tab.id ? 'var(--color-accent-hover)' : 'var(--color-text-muted)'
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Box */}
        <div className="summary-content-box" style={{ minHeight: 120 }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
