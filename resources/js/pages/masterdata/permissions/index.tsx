import { DataTable } from '@/components/ui/data-table'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'
import { GetPermissionColumns } from './columns'
import { useCallback, useMemo, useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import DialogAdd from '@/components/ui/dialog-add'
import DialogEdit from '@/components/ui/dialog-edit'
import DialogDelete from '@/components/ui/dialog-delete'
import ActionsForm from './actions-form'
import { Permission } from '@/types/role-permission'
import useRolePermission from '@/hooks/use-role-permission'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Permissions',
        href: '/masterdata/permissions/index'
    }
]

export default function Index() {

    const { permissions } = usePage<{ permissions: Permission[] }>().props;
    const [selectedPermission, setSelectedPermission] = useState<Permission>();
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const { hasPermission } = useRolePermission();

    const handleEditDialog = useCallback((permissions: Permission) => {
        setSelectedPermission(permissions);
        setOpenEditDialog(true);
    }, []);

    const handleDeleteDialog = useCallback((permissions: Permission) => {
        setSelectedPermission(permissions);
        setOpenDeleteDialog(true);
    }, [])

    const handleDeleteSubmit = () => {
        if (!selectedPermission) return;

        router.delete(route('permissions.destroy', selectedPermission.id), {
            onSuccess: () => {
                toast.success("Permission deleted successfully!");
                setOpenDeleteDialog(false)
            },
            onError: (errors) => {
                toast.error(errors.name || "An error occured when deleting permission!");
            }
        });
    }

    const columns = useMemo(() => GetPermissionColumns({ onEdit: handleEditDialog, onDelete: handleDeleteDialog }), [
        handleEditDialog,
        handleDeleteDialog
    ])

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permissions" />
            <div className="p-4">
                <h3 className='text-2xl font-semibold'>Permissions</h3>
                <span className='text-sm'>Permissions is used make permission for user</span>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20">
                        <DataTable columns={columns} data={permissions} placeholder='Search name...' filterSearch="name">
                            {hasPermission('create masterdata') && (
                                <Button variant="outline" className='lg:h-8' onClick={() => { setOpenAddDialog(true) }}>
                                    <PlusCircle />
                                    Add new
                                </Button>
                            )}
                        </DataTable>
                    </div>
                </div>
            </div>

            {/* Dialog Add */}
            {hasPermission('create masterdata') && (
                <DialogAdd open={openAddDialog} setOpen={setOpenAddDialog} title="permission">
                    <ActionsForm permission={null} onClose={setOpenAddDialog} />
                </DialogAdd>
            )}

            {/* Dialog Edit */}
            {hasPermission('update masterdata') && selectedPermission && (
                <DialogEdit open={openEditDialog} setOpen={setOpenEditDialog} title='permission'>
                    <ActionsForm permission={selectedPermission} onClose={setOpenEditDialog} />
                </DialogEdit>
            )}

            {/* Dialog Delete */}
            {hasPermission('delete masterdata') && selectedPermission && (
                <DialogDelete open={openDeleteDialog} setOpen={setOpenDeleteDialog} title={selectedPermission.name} onDelete={handleDeleteSubmit} />
            )}
        </AppLayout>
    )
}
