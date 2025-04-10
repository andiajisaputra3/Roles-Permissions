export type Role = {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
};

export type Permission = {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
};

export type RoleManagement = {
    id: number;
    name: string;
    permissions: Permission[];
};

export type UserManagement = {
    id: number;
    name: string;
    roles: Roles[];
};
