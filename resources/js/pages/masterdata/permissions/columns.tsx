"use client"

import dayjs from "dayjs"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import DataTableRowActions from "@/components/ui/data-table-row-actions"
import { ColumnDef } from "@tanstack/react-table"
import { Permission } from "@/types/role-permission"

interface PermissionColumnProps {
    onEdit?: (value: Permission) => void
    onDelete?: (value: Permission) => void
}

export const GetPermissionColumns = ({ onEdit, onDelete }: PermissionColumnProps): ColumnDef<Permission>[] => [
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
        accessorKey: "guard_name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Guard Name" />
        ),
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created At" />
        ),
        cell: ({ row }) => (
            <span>{dayjs(row.original.created_at).format('HH:mm , DD MMM YYYY')}</span>
        ),
    },
    {
        accessorKey: "updated_at",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Updated At" />
        ),
        cell: ({ row }) => (
            <span>{dayjs(row.original.updated_at).format('HH:mm , DD MMM YYYY')}</span>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => (
            <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />
        ),
    },
]