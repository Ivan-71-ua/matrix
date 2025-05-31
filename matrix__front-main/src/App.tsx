import { useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import AppSidebar from '@/components/app-sidebar/AppSidebar';

import { SidebarProvider } from './components/ui/sidebar';
import { useAuthContext } from './providers/AuthProvider';

function App() {
  const { user } = useAuthContext();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'student') {
      document.documentElement.classList.add('rose');
    } else {
      document.documentElement.classList.remove('rose');
    }
  }, [user]);

  return (
    <SidebarProvider>
      {user && <AppSidebar />}

      <Outlet />
    </SidebarProvider>
  );
}

export default App;
