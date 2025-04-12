import useRolePermission from '@/hooks/use-role-permission';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {

    const { hasRole } = useRolePermission();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    {hasRole('superadmin') && (
                        <h1 className=''>Halaman Super Admin</h1>
                    )}

                    {hasRole('admin') && (
                        <h1 className=''>Halaman Admin</h1>
                    )}

                    {hasRole('manager') && (
                        <h1 className=''>Halaman Manager</h1>
                    )}

                    {hasRole('guest') && (
                        <h1 className=''>Halaman Tamu/User</h1>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
