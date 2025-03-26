"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LoaderCircle, Save } from "lucide-react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { permissionSchema } from "@/pages/schemas/role-permission-schema";

type PermissionFormSchema = z.infer<typeof permissionSchema>

interface PermissionFormProps {
    permission: PermissionFormSchema | null
    onClose: (open: boolean) => void
}

export default function ActionsForm({ permission, onClose }: PermissionFormProps) {

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof permissionSchema>>({
        resolver: zodResolver(permissionSchema),
        defaultValues: {
            name: permission?.name ?? ""
        }
    })

    function onSubmit(data: z.infer<typeof permissionSchema>) {
        const permissionId = permission && permission.id;
        const method = permissionId ? 'put' : 'post'
        const url = permissionId ? route('permissions.update', permission.id) : route('permissions.store');

        setLoading(true);

        router[method](url, data, {
            onSuccess: () => {
                toast.success(permissionId ? "Permission updated successfully!" : "Permission added successfully!");
                form.reset()
                onClose(false);
            },
            onError: (errors) => {
                if (errors.name) {
                    toast.error(errors.name)
                } else {
                    toast.error(permissionId ? 'An error occured when updating permission!' : 'An error occured when adding permission!')
                }
            },
            onFinish: () => {
                setLoading(false);
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="article" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is permission name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex items-center justify-end gap-2">
                    <Button type="button" variant="outline" className="cursor-pointer" onClick={() => onClose(false)}>
                        Close
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? (
                            <>
                                <LoaderCircle className="h-4 w-4 animate-spin" />
                                {permission && permission.id ? "Updating ..." : "Saving ..."}
                            </>
                        ) : (
                            <>
                                <Save />
                                {permission && permission.id ? 'Update' : "Save"}
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
