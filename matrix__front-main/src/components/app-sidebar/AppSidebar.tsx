import { LogOut } from 'lucide-react';

import Logo from '@/assets/logo.svg?react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { useSignOut } from '@/hooks/useAuth';
import { useGetUser } from '@/hooks/useGetUser';

import Navigation from './components/Navigation';

export default function AppSidebar() {
  const { onSignOut } = useSignOut();
  const { user } = useGetUser();

  const handleSignOut = async () => {
    await onSignOut();
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center mt-16">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <Navigation userRole={user?.role} />
      </SidebarContent>
      <SidebarFooter>
        <div
          onClick={handleSignOut}
          className="flex items-center gap-2 mb-3 text-white text-lg font-medium  cursor-pointer hover:ring-1 ring-white/80  duration-300 rounded-md p-2"
        >
          <LogOut /> Logout
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
