'use client';
import { SUBJECTS, GRADES, TEACHING_METHODS, RESOURCES, ASSESSMENT_METHODS, TEMPLATE_PRESETS } from '@/lib/constants';

export default function InputForm({ formData, setFormData, onGenerate, onRegenerate, onClear, loading, outputReady }) {
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const list = formData[name] || [];
      if (checked) setFormData({ ...formData, [name]: [...list, value] });
      else setFormData({ ...formData, [name]: list.filter(v => v !== value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleTagToggle = (method) => {
    const list = formData.teachingMethods || [];
    if (list.includes(method)) setFormData({ ...formData, teachingMethods: list.filter(m => m !== method) });
    else setFormData({ ...formData, teachingMethods: [...list, method] });
  };

  const loadTemplate = (idx) => {
    if (idx >= 0 && idx < TEMPLATE_PRESETS.length) {
      setFormData({ ...formData, ...TEMPLATE_PRESETS[idx] });
    }
  };

  return (
    <div className="coach-form-panel">
      <div className="coach-form-header flex-between">
        <div>
          <h3>Lesson Details</h3>
          <p>Fill in the form to get AI feedback</p>
        </div>
        <div style={{display: 'flex', gap: 8}}>
          {TEMPLATE_PRESETS.map((t, i) => (
            <button key={i} onClick={() => loadTemplate(i)} className="btn btn-outline-gold btn-sm" title={t.name}>
              {t.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="coach-form-body">
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Subject <span className="required">*</span></label>
            <select name="subject" className="form-input form-select" value={formData.subject || ''} onChange={handleChange}>
              <option value="">Select...</option>
              {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Grade / Class <span className="required">*</span></label>
            <select name="grade" className="form-input form-select" value={formData.grade || ''} onChange={handleChange}>
              <option value="">Select...</option>
              {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label flex-between">
            <span>Topic / Chapter <span className="required">*</span></span>
            <span className="form-char-count">{formData.topic?.length || 0}/120</span>
          </label>
          <input 
            type="text" name="topic" className="form-input" 
            placeholder="e.g. Photosynthesis, Trigonometry..." 
            value={formData.topic || ''} onChange={handleChange} 
            maxLength={120}
          />
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Duration (minutes) <span className="required">*</span></label>
            <input 
              type="number" name="duration" className="form-input" 
              min="20" max="180" 
              value={formData.duration || ''} onChange={handleChange} 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Assessment Method</label>
            <select name="assessmentMethod" className="form-input form-select" value={formData.assessmentMethod || ''} onChange={handleChange}>
              <option value="">Select...</option>
              {ASSESSMENT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Teaching Methods <span className="required">*</span></label>
          <div className="tag-select">
            {TEACHING_METHODS.map(method => (
              <div 
                key={method} 
                className={`tag-option ${formData.teachingMethods?.includes(method) ? 'selected' : ''}`}
                onClick={() => handleTagToggle(method)}
              >
                {method}
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label flex-between">
            <span>Learning Objectives <span className="required">*</span></span>
            <span className="form-char-count">{formData.learningObjectives?.length || 0}/600</span>
          </label>
          <textarea 
            name="learningObjectives" className="form-input form-textarea" 
            placeholder="After this lesson, students will be able to..." 
            value={formData.learningObjectives || ''} onChange={handleChange}
            maxLength={600}
            style={{minHeight: 80}}
          />
        </div>

        <div className="form-group">
          <label className="form-label flex-between">
            <span>Lesson Plan Summary <span className="required">*</span></span>
            <span className="form-char-count">{formData.lessonPlanSummary?.length || 0}/1500</span>
          </label>
          <textarea 
            name="lessonPlanSummary" className="form-input form-textarea" 
            placeholder="Describe your lesson flow, activities, timing..." 
            value={formData.lessonPlanSummary || ''} onChange={handleChange}
            maxLength={1500}
            style={{minHeight: 120}}
          />
        </div>

        <div className="form-group mb-0">
          <label className="form-label">Resources Available</label>
          <div className="grid-2">
            {RESOURCES.map(r => (
              <label key={r} className="form-check">
                <input 
                  type="checkbox" name="resources" value={r} 
                  checked={formData.resources?.includes(r) || false} 
                  onChange={handleChange} 
                />
                <span style={{fontSize: 13}}>{r}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="coach-form-actions">
        {outputReady ? (
          <>
            <button className="btn btn-outline" style={{flex: 1}} onClick={onRegenerate} disabled={loading}>
              {loading ? <><div className="spinner"></div> Wait...</> : '🔄 Regenerate Feedback'}
            </button>
            <button className="btn btn-danger-ghost" onClick={onClear} disabled={loading}>
              ✕ Clear Form
            </button>
          </>
        ) : (
          <button className="btn btn-primary btn-lg" style={{flex: 1}} onClick={onGenerate} disabled={loading}>
            {loading ? <><div className="spinner"></div> Generating Evaluation...</> : '✨ Generate AI Evaluation'}
          </button>
        )}
      </div>
    </div>
  );
}
