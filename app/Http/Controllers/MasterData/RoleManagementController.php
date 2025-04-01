<?php

namespace App\Http\Controllers\MasterData;

use App\Http\Controllers\Controller;
use App\Http\Requests\MasterData\RoleManagement\UpdateRoleManagementRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleManagementController extends Controller
{
    public function index()
    {
        $roles = Role::with('permissions')->get();
        $permissions = Permission::all();

        return Inertia::render('masterdata/role-managements/index', [
            'roles' => $roles,
            'permissions' => $permissions
        ]);
    }

    public function update(UpdateRoleManagementRequest $request, string $id)
    {
        $role = Role::findOrFail($id);

        $role->syncPermissions($request->input('permissions', []));

        return to_route('role-management.index');
    }
}