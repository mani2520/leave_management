'use client';
import React from 'react';
import { useTheme } from '@/hooks/useTheme';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  useTheme();

  return <>{children}</>;
};

export default ThemeProvider;
