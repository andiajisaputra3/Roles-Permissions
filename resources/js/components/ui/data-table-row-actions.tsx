import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import { Row } from "@tanstack/react-table";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
    onEdit?: (value: TData) => void;
    onDelete?: (value: TData) => void;
}

export default function DataTableRowActions<TData>({ row, onEdit, onDelete }: DataTableRowActionsProps<TData>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer' onClick={() => onEdit?.(row.original)}>
                    <Edit />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer' onClick={() => onDelete?.(row.original)}>
                    <Trash2 />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
