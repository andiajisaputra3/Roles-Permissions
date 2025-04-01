<?php

namespace App\Http\Controllers\MasterData;

use App\Http\Controllers\Controller;
use App\Http\Requests\MasterData\UserManagement\UpdateUserManagementRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserManagementController extends Controller
{
    public function index()
    {
        $users = User::with('roles')->get();
        $roles = Role::all();
        return Inertia::render('masterdata/user-managements/index', [
            'users' => $users,
            'roles' => $roles
        ]);
    }

    public function update(UpdateUserManagementRequest $request, string $id)
    {
        $users = User::findOrFail($id);

        $users->syncRoles($request->input('roles', []));

        return to_route('user-management.index');
    }
}