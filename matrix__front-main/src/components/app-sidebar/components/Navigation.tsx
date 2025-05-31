import { NavLink } from 'react-router-dom';

import { sidebarRoutes } from '@/constants/routes';
import { cn } from '@/lib/utils';
import { TRole } from '@/types/auth';

type NavigationProps = {
  userRole: TRole;
};

export default function Navigation({ userRole }: NavigationProps) {
  const hasAccess = (routeRoles: string[], userRole: TRole) => {
    return routeRoles.includes(userRole);
  };

  return (
    <ul className="flex flex-col mx-2 gap-4 mt-8">
      {sidebarRoutes.map(
        (route) =>
          hasAccess(route.accessRoles, userRole) && (
            <li
              key={route.path}
              className="flex items-center gap-2 text-xl font-medium rounded-md   "
            >
              <NavLink
                to={route.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 p-2 text-white w-full rounded-md transition duration-300 hover:ring-1 ring-white/80',
                    {
                      'inset-shadow-sm inset-shadow-white shadow-lg ': isActive,
                    },
                  )
                }
              >
                <route.icon className="icon" />
                {route.name}
              </NavLink>
            </li>
          ),
      )}
    </ul>
  );
}
