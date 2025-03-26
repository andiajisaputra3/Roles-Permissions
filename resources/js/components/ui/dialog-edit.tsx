import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface DialogEditProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string;
    children: React.ReactNode
}

export default function DialogEdit({ open, setOpen, title, children }: DialogEditProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit {title}</DialogTitle>
                    <DialogDescription>Make changes to your {title} here. Click save when you're done.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}