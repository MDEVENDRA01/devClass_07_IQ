'use client';

export default function AnalysisPanel({ metadata }) {
  const {
    subject,
    topic,
    title,
    objectives,
    teachingMethod,
    expectedOutcomes,
    keyConcepts,
    difficultyLevel,
    completenessScore
  } = metadata;

  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'easy': return 'var(--color-success)';
      case 'hard': return 'var(--color-danger)';
      case 'medium':
      default: return 'var(--color-gold-dark)';
    }
  };

  const getCompletenessColor = (score) => {
    if (score >= 85) return 'var(--color-success)';
    if (score >= 70) return 'var(--color-warning)';
    return 'var(--color-danger)';
  };

  const objectiveLines = objectives.split('\n').filter(l => l.trim().length > 0);

  return (
    <div className="analysis-panel animate-fadeIn">
      <div className="analysis-grid-top">
        {/* Circular Progress Completeness Card */}
        <div className="analysis-card completeness-card card">
          <div className="card-body flex-center" style={{ flexDirection: 'column', padding: 24 }}>
            <h4 style={{ marginBottom: 16, color: 'var(--color-text-muted)', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Content Completeness</h4>
            
            <div className="circular-progress-wrapper" style={{ position: 'relative', width: 120, height: 120 }}>
              <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                <circle 
                  cx="60" cy="60" r="50" 
                  fill="transparent" 
                  stroke="var(--color-border-light)" 
                  strokeWidth="8"
                />
                <circle 
                  cx="60" cy="60" r="50" 
                  fill="transparent" 
                  stroke={getCompletenessColor(completenessScore)} 
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - completenessScore / 100)}`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset var(--transition-slow)' }}
                />
              </svg>
              <div className="progress-percentage-label" style={{
                position: 'absolute', top: '50%', left: '50%', 
                transform: 'translate(-50%, -50%)', 
                fontSize: 24, fontWeight: 700,
                color: 'var(--color-primary)'
              }}>
                {completenessScore}%
              </div>
            </div>
            
            <p className="text-muted mt-md" style={{ fontSize: 12, textAlign: 'center' }}>
              Based on the presence of foundational pedagogical parameters.
            </p>
          </div>
        </div>

        {/* Primary Meta Card */}
        <div className="analysis-card primary-meta-card card" style={{ flex: 2 }}>
          <div className="card-header">
            <h3>Lesson Information Summary</h3>
          </div>
          <div className="card-body">
            <div className="meta-info-grid">
              <div className="meta-item">
                <span className="meta-label">Lesson Title</span>
                <span className="meta-value bold">{title}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Subject</span>
                <span className="meta-value">
                  <span className="chip" style={{ background: 'var(--color-border-light)', color: 'var(--color-accent)', fontWeight: 600 }}>{subject}</span>
                </span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Topic / Concept</span>
                <span className="meta-value">{topic}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Teaching Method</span>
                <span className="meta-value">
                  <span className="chip" style={{ background: 'var(--color-primary-light)', color: 'white' }}>{teachingMethod}</span>
                </span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Difficulty Level</span>
                <span className="meta-value">
                  <span className="badge" style={{ 
                    backgroundColor: getDifficultyColor(difficultyLevel) + '15', 
                    color: getDifficultyColor(difficultyLevel),
                    border: `1px solid ${getDifficultyColor(difficultyLevel)}30`,
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600
                  }}>
                    ● {difficultyLevel}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2 mt-md">
        {/* Objectives Card */}
        <div className="card">
          <div className="card-header border-accent">
            <h3>Learning Objectives</h3>
          </div>
          <div className="card-body">
            {objectiveLines.length > 0 ? (
              <ul className="list-styled">
                {objectiveLines.map((obj, i) => (
                  <li key={i} className="mb-sm">
                    <span className="list-bullet gold">🎯</span>
                    <div>{obj.replace(/^[\d•\-\*\s]+/, '')}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No explicit learning objectives detected.</p>
            )}
          </div>
        </div>

        {/* Expected Outcomes & Concepts Card */}
        <div className="card">
          <div className="card-header border-gold">
            <h3>Key Concepts & Outcomes</h3>
          </div>
          <div className="card-body">
            <h4 style={{ fontSize: 13, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 10 }}>Key Concepts Covered</h4>
            <div className="tag-select mb-lg" style={{ pointerEvents: 'none', border: 'none', padding: 0 }}>
              {keyConcepts.map((concept, i) => (
                <span key={i} className="tag-option selected" style={{ background: 'var(--color-border-light)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}>
                  🔑 {concept}
                </span>
              ))}
            </div>

            <h4 style={{ fontSize: 13, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 10 }}>Expected Outcomes</h4>
            <ul className="list-styled">
              {expectedOutcomes.map((out, i) => (
                <li key={i} className="mb-xs">
                  <span className="list-bullet text-success">✓</span>
                  <div>{out}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
