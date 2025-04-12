import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head, usePage } from '@inertiajs/react'
import { useCallback, useMemo, useState } from 'react'
import { GetUserManagmentColumns } from './columns'
import { Role, UserManagement } from '@/types/role-permission'
import { DataTable } from '@/components/ui/data-table'
import DialogEdit from '@/components/ui/dialog-edit'
import ActionsForm from './actions-form'
import useRolePermission from '@/hooks/use-role-permission'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Managements',
        href: '/masterdata/user-managements/index'
    }
]

export default function Index() {

    const { users, roles } = usePage<{ users: UserManagement[]; roles: Role[] }>().props;
    const [selectedUserManagement, setSelectedUserManagement] = useState<UserManagement | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const { hasPermission } = useRolePermission();

    const handleOpenDialog = useCallback((users: UserManagement) => {
        setSelectedUserManagement(users)
        setOpenDialog(true)

    }, [])

    const columns = useMemo(() => GetUserManagmentColumns({ onEdit: handleOpenDialog }), [handleOpenDialog]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Managements" />
            <div className="p-4">
                <h3 className='text-2xl font-semibold'>User Managements</h3>
                <span className='text-sm'>User Managements is used make assign role for user account</span>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20">
                        <DataTable columns={columns} data={users} placeholder='Search name ...' filterSearch="name" />
                    </div>
                </div>
            </div>

            {/* Dialog Add/Edit */}
            {hasPermission('update masterdata') && selectedUserManagement && (
                <DialogEdit open={openDialog} setOpen={setOpenDialog} title='permission'>
                    <ActionsForm userManagement={selectedUserManagement} roles={roles} onClose={setOpenDialog} />
                </DialogEdit>
            )}
        </AppLayout>
    )
}
