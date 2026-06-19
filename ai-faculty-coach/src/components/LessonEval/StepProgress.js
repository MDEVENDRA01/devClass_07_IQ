'use client';

export default function StepProgress({ currentStep, maxStepReached, onStepClick }) {
  const steps = [
    { number: 1, label: 'Upload PDF', icon: '📁' },
    { number: 2, label: 'Analysis', icon: '📊' },
    { number: 3, label: 'AI Feedback', icon: '🤖' },
    { number: 4, label: 'Recommendations', icon: '💡' },
    { number: 5, label: 'Question Bank', icon: '📝' },
    { number: 6, label: 'Lesson Summary', icon: '📖' },
  ];

  return (
    <div className="step-progress-container">
      <div className="step-progress-track">
        <div 
          className="step-progress-fill" 
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
        {steps.map((step) => {
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          const isClickable = step.number <= maxStepReached;

          return (
            <div 
              key={step.number} 
              className={`step-node ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isClickable ? 'clickable' : ''}`}
              onClick={() => isClickable && onStepClick(step.number)}
            >
              <div className="step-node-bubble">
                {isCompleted ? '✓' : step.icon}
              </div>
              <span className="step-node-label">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
