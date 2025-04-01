"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { assignRoleManagementSchema } from "@/pages/schemas/role-permission-schema";
import { Permission, RoleManagement } from "@/types/role-permission";
import { useState } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Save } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

type AssignForm = z.infer<typeof assignRoleManagementSchema>

interface RoleManagementProps {
    roleManagement: RoleManagement | null
    permissions: Permission[]
    onClose: (open: boolean) => void
}

export default function ActionsForm({ roleManagement, permissions, onClose }: RoleManagementProps) {

    const [loading, setLoading] = useState(false);

    const form = useForm<AssignForm>({
        resolver: zodResolver(assignRoleManagementSchema),
        defaultValues: {
            id: roleManagement?.id ?? 0,
            permissions: roleManagement?.permissions.map(permission => permission.id) ?? []
        }
    });

    function onSubmit(data: AssignForm) {

        if (!roleManagement || !roleManagement.id) {
            toast.error("Role not found!");
            return;
        }

        setLoading(true);

        router.put(route('role-management.update', roleManagement?.id), data, {
            onSuccess: () => {
                toast.success("Permission added successfully!");
                form.reset();
                onClose(false);
            },
            onError: (errors) => {
                if (errors.name) {
                    toast.error(errors.name)
                } else {
                    toast.error('An error occurred when adding permission to the role!')
                }
            },
            onFinish: () => {
                setLoading(false)
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input value={roleManagement?.name ?? ""} className="cursor-not-allowed" readOnly />
                    </FormControl>
                    <FormDescription>The name of the role being edited</FormDescription>
                </FormItem>
                <FormField control={form.control} name="permissions" render={() => (
                    <FormItem>
                        <div className="mb-4">
                            <FormLabel className="text-base">Permissions</FormLabel>
                            <FormDescription>
                                <span>Assign permissions to the role.</span>
                                <span>Select at least 1 permission.</span>
                            </FormDescription>
                            <div className="flex mt-2 mb-4">
                                {permissions?.map(permission => (
                                    <FormField key={permission.id} control={form.control} name="permissions" render={({ field }) => {
                                        return (
                                            <FormItem key={permission.id} className="w-full flex flex-row items-center space-y-0">
                                                <FormControl className="flex cursor-pointer">
                                                    <Checkbox checked={field.value?.includes(permission.id)}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...(field.value ?? []), permission.id])
                                                                : field.onChange((field.value ?? [])?.filter(id => id !== permission.id))
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel>{permission.name}</FormLabel>
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
                    <Button type="submit" disabled={loading}>
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
        </Form>
    )
}
