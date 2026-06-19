'use client';
import AppLayout from '@/components/Layout/AppLayout';
import { useApp } from '@/context/AppContext';
import { useMemo, useState, useEffect } from 'react';

const DEFAULT_SETTINGS = {
  theme: 'system',
  language: 'english',
  notifications: { email: true, digest: true },
};

export default function SettingsPage() {
  const {
    settings,
    saveSettings,
    settingsLoading,
    settingsSaving,
    settingsError,
    addToast,
  } = useApp();

  const [formValues, setFormValues] = useState(DEFAULT_SETTINGS);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    if (settings) {
      setFormValues(settings);
    }
  }, [settings]);

  const isDirty = useMemo(() => {
    return (
      settings?.theme !== formValues.theme ||
      settings?.language !== formValues.language ||
      settings?.notifications?.email !== formValues.notifications.email ||
      settings?.notifications?.digest !== formValues.notifications.digest
    );
  }, [settings, formValues]);

  const handleChange = (field, value) => {
    setFormValues(prev => {
      if (field.startsWith('notifications.')) {
        const key = field.split('.')[1];
        return {
          ...prev,
          notifications: {
            ...prev.notifications,
            [key]: value,
          },
        };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleSave = async () => {
    setLocalError(null);

    if (!formValues.theme || !formValues.language) {
      setLocalError('Please choose a theme and language.');
      return;
    }

    const saved = await saveSettings(formValues);
    if (!saved) {
      setLocalError('Could not save preferences. Please try again.');
    }
  };

  return (
    <AppLayout>
      <div className="page-header mb-md">
        <h1>Settings</h1>
        <p>Customize your AI Faculty Coach experience.</p>
      </div>

      <div className="card" style={{ maxWidth: 820 }}>
        <div className="card-body" style={{ padding: '32px 40px' }}>
          {settingsLoading ? (
            <div className="alert alert-info" style={{ marginBottom: 24 }}>
              Loading preferences…
            </div>
          ) : null}

          {settingsError || localError ? (
            <div className="alert alert-error" style={{ marginBottom: 24 }}>
              {settingsError || localError}
            </div>
          ) : null}

          <div className="settings-section">
            <h3>Appearance & Locale</h3>

            <div className="settings-row">
              <div>
                <div style={{ fontWeight: 500 }}>Theme Preference</div>
                <div className="text-muted" style={{ fontSize: 13, marginTop: 4 }}>
                  Choose how the app looks for you.
                </div>
              </div>
              <select
                className="form-input form-select"
                style={{ width: 220 }}
                value={formValues.theme}
                onChange={(e) => handleChange('theme', e.target.value)}
              >
                <option value="light">Light Mode</option>
                <option value="dark">Dark Mode</option>
                <option value="system">System Default</option>
              </select>
            </div>

            <div className="settings-row">
              <div>
                <div style={{ fontWeight: 500 }}>AI Output Language</div>
                <div className="text-muted" style={{ fontSize: 13, marginTop: 4 }}>
                  Select the primary language for AI evaluations.
                </div>
              </div>
              <select
                className="form-input form-select"
                style={{ width: 220 }}
                value={formValues.language}
                onChange={(e) => handleChange('language', e.target.value)}
              >
                <option value="english">English</option>
                <option value="telugu">Telugu</option>
                <option value="hindi">Hindi</option>
              </select>
            </div>
          </div>

          <div className="settings-section">
            <h3>Notifications</h3>

            <div className="settings-row">
              <div>
                <div style={{ fontWeight: 500 }}>Evaluation Ready Emails</div>
                <div className="text-muted" style={{ fontSize: 13, marginTop: 4 }}>
                  Receive an email when your AI evaluation finishes generating.
                </div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={formValues.notifications.email}
                  onChange={(e) => handleChange('notifications.email', e.target.checked)}
                />
                <span className="slider" />
              </label>
            </div>

            <div className="settings-row">
              <div>
                <div style={{ fontWeight: 500 }}>Weekly Quality Digest</div>
                <div className="text-muted" style={{ fontSize: 13, marginTop: 4 }}>
                  Get a summary of your performance and top improvement areas every Sunday.
                </div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={formValues.notifications.digest}
                  onChange={(e) => handleChange('notifications.digest', e.target.checked)}
                />
                <span className="slider" />
              </label>
            </div>
          </div>

          <div className="settings-section" style={{ marginBottom: 0 }}>
            <h3>Data & Privacy</h3>

            <div className="settings-row">
              <div>
                <div style={{ fontWeight: 500 }}>Download My Data</div>
                <div className="text-muted" style={{ fontSize: 13, marginTop: 4 }}>
                  Export all your generation history and profile data as JSON.
                </div>
              </div>
              <button
                className="btn btn-outline btn-sm"
                type="button"
                onClick={() => addToast('Export feature is a placeholder for now.', 'info')}
              >
                Export Data
              </button>
            </div>

            <div className="settings-row">
              <div>
                <div style={{ fontWeight: 500 }}>Clear Cache</div>
                <div className="text-muted" style={{ fontSize: 13, marginTop: 4 }}>
                  Remove locally saved draft lesson plans.
                </div>
              </div>
              <button
                className="btn btn-outline btn-sm"
                type="button"
                onClick={() => {
                  localStorage.removeItem('fc_settings');
                  addToast('Local settings cache cleared.', 'success');
                }}
              >
                Clear Drafts
              </button>
            </div>
          </div>
        </div>

        <div className="card-footer" style={{ padding: '20px 40px' }}>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={settingsSaving || settingsLoading || !isDirty}
          >
            {settingsSaving ? 'Saving…' : 'Save Preferences'}
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
