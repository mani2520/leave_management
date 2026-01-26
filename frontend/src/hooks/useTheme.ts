'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

const THEME_QUERY_KEY = ['theme'] as const;

const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const getSavedTheme = (): Theme | null => {
  if (typeof window === 'undefined') return null;
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || saved === 'light') {
    return saved as Theme;
  }
  return null;
};

const getCurrentTheme = (): Theme => {
  const saved = getSavedTheme();
  return saved || getSystemTheme();
};

const applyTheme = (theme: Theme) => {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

export const useTheme = () => {
  const queryClient = useQueryClient();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: theme = 'light', refetch: refetchTheme } = useQuery<Theme>({
    queryKey: THEME_QUERY_KEY,
    queryFn: () => {
      const saved = getSavedTheme();
      const system = getSystemTheme();
      return saved || system;
    },
    enabled: mounted,
    staleTime: 0,
    gcTime: Infinity,
    refetchOnMount: true,
  });

  const setThemeMutation = useMutation<Theme, Error, Theme>({
    mutationFn: async (newTheme: Theme): Promise<Theme> => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
      }
      applyTheme(newTheme);
      return Promise.resolve(newTheme);
    },
    onSuccess: (newTheme) => {
      queryClient.setQueryData(THEME_QUERY_KEY, newTheme);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('themechange'));
      }
    },
  });

  const setSystemThemeMutation = useMutation<Theme, Error, void>({
    mutationFn: async (): Promise<Theme> => {
      const systemTheme = getSystemTheme();
      if (typeof window !== 'undefined') {
        localStorage.removeItem('theme');
      }
      applyTheme(systemTheme);
      return Promise.resolve(systemTheme);
    },
    onSuccess: (newTheme) => {
      queryClient.setQueryData(THEME_QUERY_KEY, newTheme);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('themechange'));
      }
    },
  });

  useEffect(() => {
    if (!mounted) return;

    const initialTheme = getCurrentTheme();
    applyTheme(initialTheme);
    queryClient.setQueryData(THEME_QUERY_KEY, initialTheme);
  }, [mounted, queryClient]);

  useEffect(() => {
    if (!mounted) return;

    applyTheme(theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const systemTheme = e.matches ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', systemTheme);
      }
      applyTheme(systemTheme);
      queryClient.setQueryData(THEME_QUERY_KEY, systemTheme);
      refetchTheme();
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('themechange'));
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleSystemThemeChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleSystemThemeChange);
      }
    };
  }, [queryClient, mounted, refetchTheme]);

  const toggleTheme = useCallback(() => {
    if (!mounted) return;
    const currentTheme =
      queryClient.getQueryData<Theme>(THEME_QUERY_KEY) || getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setThemeMutation.mutate(newTheme);
  }, [queryClient, setThemeMutation, mounted]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      if (!mounted) return;
      setThemeMutation.mutate(newTheme);
    },
    [setThemeMutation, mounted],
  );

  const isDark = mounted ? theme === 'dark' : false;

  return {
    theme: mounted ? theme : 'light',
    isDark,
    setTheme,
    toggleTheme,
    setSystemTheme: () => {
      if (mounted) {
        setSystemThemeMutation.mutate();
      }
    },
  };
};
