'use client';

export default function RecommendationsPanel({ recommendations }) {
  const {
    improvementTips,
    classroomActivities,
    explanationStrategies,
    visualSuggestions,
    realWorldExamples
  } = recommendations;

  return (
    <div className="recommendations-panel animate-fadeIn">
      {/* Top recommendations */}
      <div className="card mb-md">
        <div className="card-header border-gold">
          <h3>💡 Tactical Improvement Actions</h3>
        </div>
        <div className="card-body">
          <div className="grid-2">
            {improvementTips.map((tip, idx) => (
              <div key={idx} className="improvement-tip-card" style={{
                background: 'var(--color-bg-page)',
                padding: '16px',
                borderRadius: 'var(--radius-btn)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                gap: 12
              }}>
                <div style={{
                  fontSize: 20,
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'var(--color-gold-light)',
                  color: 'var(--color-gold-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {idx + 1}
                </div>
                <div style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--color-text)' }}>
                  {tip}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activities and Explanations Grid */}
      <div className="grid-2 mt-md">
        {/* Suggested Activities */}
        <div className="card">
          <div className="card-header border-success">
            <h3>⏰ Suggested Classroom Activities</h3>
          </div>
          <div className="card-body">
            <p className="text-muted mb-md" style={{ fontSize: 13 }}>
              Incorporate these active learning blocks to break up teacher-led lecture time.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {classroomActivities.map((act, i) => (
                <div key={i} style={{
                  padding: 16,
                  background: 'var(--color-bg-input)',
                  borderRadius: 'var(--radius-btn)',
                  border: '1px solid var(--color-border)'
                }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--color-primary)' }}>
                    🎯 {act.name}
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <span className="badge badge-dark" style={{ background: 'var(--color-primary-light)', color: 'white', fontSize: 11, padding: '3px 8px', borderRadius: 4 }}>
                      ⏱ {act.duration}
                    </span>
                    <span className="badge badge-gold" style={{ background: 'var(--color-gold-light)', color: 'var(--color-gold-dark)', fontSize: 11, padding: '3px 8px', borderRadius: 4, fontWeight: 600 }}>
                      🧠 {act.method}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Explanation Strategies */}
        <div className="card">
          <div className="card-header border-accent">
            <h3>💬 Better Explanation Strategies</h3>
          </div>
          <div className="card-body">
            <p className="text-muted mb-md" style={{ fontSize: 13 }}>
              Pedagogical pathways to explain abstract concepts more effectively.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {explanationStrategies.map((strat, i) => {
                const parts = strat.split(':');
                const title = parts[0];
                const desc = parts.slice(1).join(':');
                return (
                  <div key={i} style={{
                    padding: 12,
                    borderLeft: '4px solid var(--color-accent)',
                    background: 'var(--color-bg-page)',
                    borderRadius: '0 var(--radius-btn) var(--radius-btn) 0'
                  }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--color-accent)', marginBottom: 2 }}>
                      {title}
                    </div>
                    <div style={{ fontSize: 12.5, color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                      {desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Suggestions and Real World Examples Grid */}
      <div className="grid-2 mt-md">
        {/* Visual Aids */}
        <div className="card">
          <div className="card-header">
            <h3>🖼️ Suggested Visual Aids</h3>
          </div>
          <div className="card-body">
            <ul className="list-styled">
              {visualSuggestions.map((vis, i) => (
                <li key={i} className="mb-sm">
                  <span className="list-bullet" style={{ color: 'var(--color-accent)' }}>🖽</span>
                  <div>{vis}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Real World Examples */}
        <div className="card">
          <div className="card-header">
            <h3>🌍 Real-World Connections</h3>
          </div>
          <div className="card-body">
            <p className="text-muted mb-md" style={{ fontSize: 13 }}>
              Answer the common student question: <em>"Why are we learning this?"</em>
            </p>
            <ul className="list-styled">
              {realWorldExamples.map((ex, i) => (
                <li key={i} className="mb-sm">
                  <span className="list-bullet" style={{ color: 'var(--color-gold-dark)' }}>⚡</span>
                  <div>{ex}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
