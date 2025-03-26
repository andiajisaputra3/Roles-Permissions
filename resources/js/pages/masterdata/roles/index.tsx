import { DataTable } from '@/components/ui/data-table'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'
import { useCallback, useMemo, useState } from 'react'
import { GetRoleColumns } from './columns'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import DialogAdd from '@/components/ui/dialog-add'
import ActionsForm from './actions-form'
import DialogEdit from '@/components/ui/dialog-edit'
import DialogDelete from '@/components/ui/dialog-delete'
import { toast } from 'sonner'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/masterdata/roles/index'
    }
]

export type Role = {
    id: number
    name: string
    guard_name: string
    created_at: string
    updated_at: string
}

export default function Index() {

    const { roles } = usePage<{ roles: Role[] }>().props;
    const [selectedRole, setSelectedRole] = useState<Role>();
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleEdit = useCallback((roles: Role) => {
        setSelectedRole(roles);
        setOpenEditDialog(true);
    }, []);

    const handleDelete = useCallback((roles: Role) => {
        setSelectedRole(roles);
        setOpenDeleteDialog(true);
    }, []);

    const handleDeleteSubmit = () => {
        if (!selectedRole) return;

        router.delete(route('roles.destroy', selectedRole.id), {
            onSuccess: () => {
                toast.success("Role deleted successfully!");
                setOpenDeleteDialog(false)
            },
            onError: (errors) => {
                toast.error(errors.name || "An error occured when deleting role!");
            }
        });
    }

    const columns = useMemo(() => GetRoleColumns({ onEdit: handleEdit, onDelete: handleDelete }), [
        handleEdit,
        handleDelete
    ]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />
            <div className="p-4">
                <h3 className='text-2xl font-semibold'>Roles</h3>
                <span className='text-sm'>Roles is used make role for user</span>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20">
                        <DataTable columns={columns} data={roles} placeholder='Search name...' filterSearch="name">
                            <Button variant="outline" className='lg:h-8' onClick={() => { setOpenAddDialog(true) }}>
                                <PlusCircle />
                                Add new
                            </Button>
                        </DataTable>
                    </div>
                </div>
            </div>

            {/* Dialog Add */}
            <DialogAdd open={openAddDialog} setOpen={setOpenAddDialog} title="role">
                <ActionsForm role={null} onClose={setOpenAddDialog} />
            </DialogAdd>

            {/* Dialog Edit */}
            {selectedRole && (
                <DialogEdit open={openEditDialog} setOpen={setOpenEditDialog} title='role'>
                    <ActionsForm role={selectedRole} onClose={setOpenEditDialog} />
                </DialogEdit>
            )}

            {/* Dialog Delete */}
            {selectedRole && (
                <DialogDelete open={openDeleteDialog} setOpen={setOpenDeleteDialog} title={selectedRole.name} onDelete={handleDeleteSubmit} />
            )}

        </AppLayout>
    )
}
