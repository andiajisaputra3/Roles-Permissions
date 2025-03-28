import { NavItem } from '@/types';
import { BookOpen, Folder, LayoutGrid } from 'lucide-react';

export const sidebarMenuItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Masterdata',
        href: '/masterdata',
        icon: LayoutGrid,
        subItems: [
            { title: 'Roles', url: '/masterdata/roles' },
            { title: 'Permissions', url: '/masterdata/permissions' },
            { title: 'Role Managements', url: '/masterdata/role-managements' },
            { title: 'User Managenments', url: '/masterdata/user-managements' },
        ],
    },
];
export const footerMenuItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];
