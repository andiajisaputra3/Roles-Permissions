import { AccessProps } from '@/types';
import { usePage } from '@inertiajs/react';

export default function useRolePermission() {
    const { auth } = usePage<AccessProps>().props;
    const roles = auth.roles || [];
    const permissions = auth.permissions || [];

    const hasRole = (role: string | string[]) => {
        return Array.isArray(role) ? role.some((r) => roles.includes(r)) : roles.includes(role);
    };

    const hasPermission = (permission: string | string[]) => {
        return Array.isArray(permission) ? permission.some((p) => permissions.includes(p)) : permissions.includes(permission);
    };

    return { user: auth.user, roles, permissions, hasRole, hasPermission };
}
