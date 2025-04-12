import { NavItem } from '@/types';
import { BookOpen, Folder, LayoutGrid } from 'lucide-react';

export const sidebarMenuItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
        permission: 'view dashboard',
    },
    {
        title: 'Masterdata',
        href: '/masterdata',
        icon: LayoutGrid,
        role: ['superadmin', 'admin'],
        subItems: [
            { title: 'Roles', url: '/masterdata/roles', role: 'superadmin' },
            { title: 'Permissions', url: '/masterdata/permissions', role: 'superadmin' },
            { title: 'Role Managements', url: '/masterdata/role-managements', role: ['superadmin', 'admin'] },
            { title: 'User Managenments', url: '/masterdata/user-managements', role: ['superadmin', 'admin'] },
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
