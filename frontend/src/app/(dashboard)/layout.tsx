'use client';

import Navbar from '@/components/Navbar';
import { DashboardLayoutSidebar } from '@/components/Sidebar';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayoutSidebar>
      <main
        id='main-content'
        className='min-h-0 flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 relative'
      >
        <Navbar />
        {children}
      </main>
    </DashboardLayoutSidebar>
  );
};

export default Layout;
