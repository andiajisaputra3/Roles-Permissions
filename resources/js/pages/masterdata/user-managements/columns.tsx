"use client"

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import DataTableRowActions from "@/components/ui/data-table-row-actions"
import { UserManagement } from "@/types/role-permission"
import { ColumnDef } from "@tanstack/react-table"

interface UserManagementProps {
    onEdit: (value: UserManagement) => void
}

export const GetUserManagmentColumns = ({ onEdit }: UserManagementProps): ColumnDef<UserManagement>[] => [
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
        )
    },
    {
        accessorKey: "roles",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Roles" />
        ),
        cell: ({ row }) => {
            const role = row.original.roles;
            return (
                <span>
                    {role && role.length > 0 ? role.map((role) => role.name).join(", ") : "No role assigned"}
                </span>
            )
        }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => (
            <DataTableRowActions row={row} onEdit={onEdit} isDeleteActive={false} />
        )
    }

]