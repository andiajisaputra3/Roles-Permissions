"use client"

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { assignUserManagementSchema } from '@/pages/schemas/role-permission-schema'
import { Role, UserManagement } from '@/types/role-permission'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from '@inertiajs/react'
import { LoaderCircle, Save } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type AssignForm = z.infer<typeof assignUserManagementSchema>

interface UserManagementProps {
    userManagement: UserManagement | null
    roles: Role[]
    onClose: (open: boolean) => void
}

export default function ActionsForm({ userManagement, roles, onClose }: UserManagementProps) {
    const [loading, setLoading] = useState(false);

    const form = useForm<AssignForm>({
        resolver: zodResolver(assignUserManagementSchema),
        defaultValues: {
            id: userManagement?.id ?? 0,
            roles: userManagement?.roles.map((role) => role.id) ?? []
        }
    });

    function onSubmit(data: AssignForm) {
        if (!userManagement || !userManagement.id) {
            toast.error("User not found!");
            return;
        }

        setLoading(true);

        router.put(route('user-management.update', userManagement?.id), data, {
            onSuccess: () => {
                toast.success("Role added successfully!");
                form.reset();
                onClose(false)
            },
            onError: (errors) => {
                if (errors.name) {
                    toast.error(errors.name)
                } else {
                    toast.error('An error occurred when adding role!')
                }
            },
            onFinish: () => {
                setLoading(false)
            }
        })

    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormItem>
                    <FormLabel>User</FormLabel>
                    <FormControl>
                        <Input name="name" value={userManagement?.name ?? ""} className="cursor-not-allowed" readOnly />
                    </FormControl>
                </FormItem>
                <FormField control={form.control} name="roles" render={() => (
                    <FormItem>
                        <div className="mb-4">
                            <FormLabel>Roles</FormLabel>
                            <FormDescription>
                                <span>Assign roles to the user.</span>
                                <span>Select at least 1 role.</span>
                            </FormDescription>
                            <div className="flex mt-2 mb-4 gap-3">
                                {roles?.map((role) => (
                                    <FormField key={role.id} control={form.control} name="roles" render={({ field }) => {
                                        return (
                                            <FormItem key={role.id} className="w-full flex flex-row items-center space-y-0 ">
                                                <FormControl className="flex cursor-pointer">
                                                    <Checkbox checked={field.value?.includes(role.id)}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...field.value ?? [], role.id])
                                                                : field.onChange((field.value ?? []).filter((id) => id !== role.id))
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel>{role.name}</FormLabel>
                                            </FormItem>
                                        )
                                    }} />
                                ))}
                            </div>
                            <FormMessage />
                        </div>
                    </FormItem>
                )} />
                <div className="flex items-center justify-end gap-2">
                    <Button type="button" variant="outline" className="cursor-pointer" onClick={() => onClose(false)}>
                        Close
                    </Button>
                    <Button type='submit' disabled={loading}>
                        {loading ? (
                            <>
                                <LoaderCircle className="h-4 w-4 animate-spin" />
                                Updating ...
                            </>
                        ) : (
                            <>
                                <Save />
                                Save
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form >
    )
}
