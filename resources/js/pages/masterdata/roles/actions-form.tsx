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
import { roleSchema } from "@/pages/schemas/role-permission-schema";

type RoleFormSchema = z.infer<typeof roleSchema>

interface RoleFormProps {
    role: RoleFormSchema | null
    onClose: (open: boolean) => void
}

export default function ActionsForm({ role, onClose }: RoleFormProps) {

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof roleSchema>>({
        resolver: zodResolver(roleSchema),
        defaultValues: {
            name: role?.name ?? ""
        },
        mode: "onSubmit",
    })

    function onSubmit(data: z.infer<typeof roleSchema>) {
        const roleId = role && role.id;
        const method = roleId ? 'put' : 'post'
        const url = roleId ? route('roles.update', role.id) : route('roles.store');

        setLoading(true);

        router[method](url, data, {
            onSuccess: () => {
                toast.success(roleId ? "Role updated successfully!" : "Role added successfully!");
                form.reset()
                onClose(false);
            },
            onError: (errors) => {
                if (errors.name) {
                    toast.error(errors.name)
                } else {
                    toast.error(roleId ? 'An error occured when updating role!' : 'An error occured when adding role!')
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
                                <Input type="text" placeholder="admin" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is role name.
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
                                {role && role.id ? "Updating ..." : "Saving ..."}
                            </>
                        ) : (
                            <>
                                <Save />
                                {role && role.id ? 'Update' : "Save"}
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
