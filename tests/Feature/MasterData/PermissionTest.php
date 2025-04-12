<?php

use App\Models\User;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('permissions screen can be rendered', function () {
    $role = Role::create(['name' => 'superadmin']);
    $permission = Permission::create(['name' => 'read']);
    $role->givePermissionTo($permission);

    $superadmin = User::factory()->create();
    $superadmin->assignRole($role);

    $response = $this->actingAs($superadmin)->get('masterdata/permissions');

    $response->assertStatus(200);
});

test('can create a permission', function () {
    $role = Role::create(['name' => 'superadmin']);
    $permission = Permission::create(['name' => 'create']);
    $role->givePermissionTo($permission);

    $superadmin = User::factory()->create();
    $superadmin->assignRole($role);

    $response = $this->actingAs($superadmin)->postJson(route('permissions.store'), [
        'name' => 'Test Permission',
    ]);

    $response->assertStatus(302);

    $this->assertDatabaseHas('permissions', [
        'name' => 'Test Permission'
    ]);
});

test('can update a permission', function () {
    $role = Role::create(['name' => 'superadmin']);
    $permission = Permission::create(['name' => 'update']);
    $role->givePermissionTo($permission);

    $superadmin = User::factory()->create();
    $superadmin->assignRole($role);

    $permissionToUpdate = Permission::create(['name' => 'Test Permission']);

    $response = $this->actingAs($superadmin)->putJson(route('permissions.update', $permissionToUpdate->id), [
        'name' => 'Update',
    ]);

    $response->assertStatus(302);

    $this->assertDatabaseHas('permissions', [
        'id' => $permissionToUpdate->id,
        'name' => 'Update'
    ]);
});

test('can delete a permission', function () {
    $role = Role::create(['name' => 'superadmin']);
    $permission = Permission::create(['name' => 'update']);
    $role->givePermissionTo($permission);

    $superadmin = User::factory()->create();
    $superadmin->assignRole($role);

    $permissionToUpdate = Permission::create(['name' => 'Delete Permission']);

    $response = $this->actingAs($superadmin)->deleteJson(route('permissions.destroy', $permissionToUpdate->id));

    $response->assertStatus(302);

    $this->assertDatabaseMissing('permissions', [
        'id' => $permissionToUpdate->id,
        'name' => 'Delete Permission'
    ]);
});