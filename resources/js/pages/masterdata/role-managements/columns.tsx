"use client"

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import DataTableRowActions from "@/components/ui/data-table-row-actions"
import { AssignPermission } from "@/types/role-permission"
import { ColumnDef } from "@tanstack/react-table"

interface RoleManagementProps {
    onEdit?: (value: AssignPermission) => void
}

export const GetRoleManagementColumns = ({ onEdit }: RoleManagementProps): ColumnDef<AssignPermission>[] => [
    {
        id: "no",
        header: () => <span>No</span>,
        cell: ({ row }) => (
            <span>{row.index + 1}</span>
        )
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
    },
    {
        accessorKey: "permissions",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Permission" />
        ),
        cell: ({ row }) => {
            const permission = row.original.permissions;
            return (
                <span>
                    {/* {permission.length > 0 ? permission?.map((p) => p.name).join(", ") : "No permissions assigned"} */}
                    {permission && permission.length > 0 ? permission.map((permis) => (permis.name)).join(", ") : "No permissions assigned"}
                </span>
            )
        }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => (
            <DataTableRowActions row={row} onEdit={onEdit} isDeleteActive={false} />
        ),
    },
]