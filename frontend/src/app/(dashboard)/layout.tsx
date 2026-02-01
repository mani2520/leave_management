import Navbar from '@/components/Navbar';
import { DashboardLayoutSidebar } from '@/components/Sidebar';
import React from 'react';
import { cookies } from 'next/headers';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <DashboardLayoutSidebar defaultOpen={defaultOpen}>
      <main
        id='main-content'
        className='min-h-0 flex-1 overflow-y-auto overflow-x-hidden bg-slate-50 dark:bg-slate-950 relative'
      >
        <Navbar />
        {children}
      </main>
    </DashboardLayoutSidebar>
  );
};

export default Layout;
