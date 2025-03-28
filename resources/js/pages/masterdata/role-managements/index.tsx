import { DataTable } from '@/components/ui/data-table'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head, usePage } from '@inertiajs/react'
import { useCallback, useMemo, useState } from 'react'
import { GetRoleManagementColumns } from './columns'
import { Permission, RoleManagement } from '@/types/role-permission'
import DialogEdit from '@/components/ui/dialog-edit'
import ActionsForm from './actions-form'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Role Managements',
        href: '/masterdata/role-managements/index'
    }
]

export default function Index() {

    const { roles, permissions } = usePage<{ roles: RoleManagement[]; permissions: Permission[] }>().props;
    const [selectedRoleManagement, setSelectedRoleManagement] = useState<RoleManagement | null>(null);
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = useCallback((roles: RoleManagement) => {
        setSelectedRoleManagement(roles)
        setOpenDialog(true);
    }, [])

    const columns = useMemo(() => GetRoleManagementColumns({ onEdit: handleOpenDialog }), [handleOpenDialog])
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Role Managements" />
            <div className="p-4">
                <h3 className='text-2xl font-semibold'>Role Managements</h3>
                <span className='text-sm'>Role Managements is used make assign permission for role</span>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20">
                        <DataTable columns={columns} data={roles} placeholder='Search name ...' filterSearch="name" />
                    </div>
                </div>
            </div>

            {/* Dialog Add/Edit */}
            {selectedRoleManagement && (
                <DialogEdit open={openDialog} setOpen={setOpenDialog} title='permission'>
                    <ActionsForm roleManagement={selectedRoleManagement} permissions={permissions} onClose={setOpenDialog} />
                </DialogEdit>
            )}
        </AppLayout>
    )
}
