import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
import React from 'react'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Managements',
        href: '/masterdata/user-managements/index'
    }
]

export default function Index() {
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
                        {/* <DataTable columns={columns} data={roles} placeholder='Search name ...' filterSearch="name" /> */}
                    </div>
                </div>
            </div>

            {/* Dialog Add/Edit */}
            {/* {selectedRoleManagement && (
                <DialogEdit open={openDialog} setOpen={setOpenDialog} title='permission'>
                    <ActionsForm roleManagement={selectedRoleManagement} permissions={permissions} onClose={setOpenDialog} />
                </DialogEdit>
            )} */}
        </AppLayout>
    )
}
