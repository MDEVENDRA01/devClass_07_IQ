'use client';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

const AppContext = createContext(null);

const DEFAULT_SETTINGS = {
  theme: 'system',
  language: 'english',
  notifications: {
    email: true,
    digest: true,
  },
};

function resolveTheme(theme) {
  if (theme === 'dark') return 'dark';
  if (theme === 'light') return 'light';
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

function applyTheme(theme) {
  if (typeof document === 'undefined') return;
  const resolved = theme === 'system' ? resolveTheme(theme) : theme;
  document.documentElement.dataset.theme = resolved;
  document.body.style.backgroundColor = resolved === 'dark' ? 'var(--color-bg-dark)' : 'var(--color-bg-page)';
}

export function AppProvider({ children }) {
  const { user } = useAuth();

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'generation', message: 'Your AI evaluation for Photosynthesis is ready (Score: 8.2/10)', read: false, time: '2 min ago' },
    { id: 2, type: 'system', message: 'Welcome to AI Faculty Coach! Start by creating your first evaluation.', read: false, time: '1 hour ago' },
    { id: 3, type: 'weekly', message: 'Weekly digest: 5 generations, avg score 7.8, top area: Assessment Methods', read: true, time: '2 days ago' },
  ]);

  const [toasts, setToasts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [settingsError, setSettingsError] = useState(null);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const loadSettings = useCallback(async () => {
    if (!user?.id) return;
    setSettingsLoading(true);
    setSettingsError(null);

    try {
      const response = await fetch('/api/settings', {
        headers: {
          'x-user-id': user.id,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          // If the server doesn't support the API (statically hosted), fallback silently
          const fallback = localStorage.getItem('fc_settings');
          let nextSettings = DEFAULT_SETTINGS;
          if (fallback) {
            try {
              nextSettings = { ...DEFAULT_SETTINGS, ...JSON.parse(fallback) };
            } catch {}
          }
          setSettings(nextSettings);
          applyTheme(nextSettings.theme);
          return;
        }
        throw new Error('Unable to load settings from server.');
      }

      const json = await response.json();
      const nextSettings = {
        ...DEFAULT_SETTINGS,
        ...(json?.data || {}),
      };

      setSettings(nextSettings);
      applyTheme(nextSettings.theme);
      localStorage.setItem('fc_settings', JSON.stringify(nextSettings));
    } catch (error) {
      const fallback = localStorage.getItem('fc_settings');
      if (fallback) {
        try {
          const parsed = JSON.parse(fallback);
          const nextSettings = {
            ...DEFAULT_SETTINGS,
            ...parsed,
          };
          setSettings(nextSettings);
          applyTheme(nextSettings.theme);
        } catch {
          setSettings(DEFAULT_SETTINGS);
          applyTheme(DEFAULT_SETTINGS.theme);
        }
      } else {
        setSettings(DEFAULT_SETTINGS);
        applyTheme(DEFAULT_SETTINGS.theme);
      }
      // If it's a TypeError (e.g. failed to fetch/no server/offline), fallback silently
      if (error instanceof TypeError) {
        console.warn('Network error loading settings from server, using localStorage instead:', error);
      } else {
        setSettingsError(error.message || 'Failed to load settings.');
      }
    } finally {
      setSettingsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      loadSettings();
    }
  }, [user?.id, loadSettings]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (user?.id) return;
    const cached = localStorage.getItem('fc_settings');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        const nextSettings = {
          ...DEFAULT_SETTINGS,
          ...parsed,
        };
        setSettings(nextSettings);
        applyTheme(nextSettings.theme);
      } catch {
        setSettings(DEFAULT_SETTINGS);
        applyTheme(DEFAULT_SETTINGS.theme);
      }
    }
  }, [user?.id]);

  const saveSettings = useCallback(async (updatedSettings) => {
    if (!user?.id) {
      const errorMessage = 'You must be signed in to save preferences.';
      setSettingsError(errorMessage);
      addToast(errorMessage, 'error');
      return null;
    }

    const nextSettings = {
      ...settings,
      ...updatedSettings,
      notifications: {
        ...settings.notifications,
        ...(updatedSettings.notifications || {}),
      },
    };

    setSettings(nextSettings);
    applyTheme(nextSettings.theme);
    localStorage.setItem('fc_settings', JSON.stringify(nextSettings));
    setSettingsSaving(true);
    setSettingsError(null);

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id,
        },
        body: JSON.stringify(nextSettings),
      });

      if (!response.ok) {
        if (response.status === 404) {
          // If server doesn't support settings API, count localStorage save as success
          console.warn('Settings API not found (404), saved locally in browser instead.');
          addToast('Preferences saved successfully!', 'success');
          return nextSettings;
        }
        throw new Error('Unable to persist settings to the server.');
      }

      const json = await response.json();
      const saved = {
        ...DEFAULT_SETTINGS,
        ...(json?.data || {}),
      };
      setSettings(saved);
      localStorage.setItem('fc_settings', JSON.stringify(saved));
      addToast('Preferences saved successfully!', 'success');
      return saved;
    } catch (error) {
      if (error instanceof TypeError) {
        // Network error (e.g. failed to fetch/offline), count localStorage save as success
        console.warn('Network error fetching settings API, saved locally in browser:', error);
        addToast('Preferences saved successfully!', 'success');
        return nextSettings;
      }
      setSettingsError(error.message || 'Unable to save settings.');
      addToast('Unable to save settings.', 'error');
      return null;
    } finally {
      setSettingsSaving(false);
    }
  }, [user?.id, settings, addToast]);

  return (
    <AppContext.Provider value={{
      notifications,
      unreadCount,
      markNotificationRead,
      toasts,
      addToast,
      sidebarOpen,
      setSidebarOpen,
      settings,
      settingsLoading,
      settingsSaving,
      settingsError,
      loadSettings,
      saveSettings,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
