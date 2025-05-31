import { Home, ListChecks, FolderPlus, User } from 'lucide-react';

export const sidebarRoutes = [
  {
    path: '/',
    name: 'Home',
    icon: Home,
    accessRoles: ['teacher', 'student'],
  },
  {
    path: '/tests',
    name: 'Tests',
    icon: ListChecks,
    accessRoles: ['teacher', 'student'],
  },
  {
    path: '/create-test',
    name: 'Create Test',
    icon: FolderPlus,
    accessRoles: ['teacher'],
  },
  {
    path: '/profile',
    name: 'Profile',
    icon: User,
    accessRoles: ['teacher', 'student'],
  },
];

export type TSidebarRoute = (typeof sidebarRoutes)[number];
