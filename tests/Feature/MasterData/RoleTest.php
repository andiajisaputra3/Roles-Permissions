<?php

use App\Models\User;
use Spatie\Permission\Models\Role;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('roles screen can be rendered', function () {
    $role = Role::create(['name' => 'superadmin']);
    $superadmin = User::factory()->create();
    $superadmin->assignRole($role);
    $response = $this->actingAs($superadmin)->get('/masterdata/roles');

    $response->assertStatus(200);
});

test('can create a role', function () {
    $role = Role::firstOrCreate(['name' => 'superadmin']);

    $superadmin = User::factory()->create();
    $superadmin->assignRole($role);

    $response = $this->actingAs($superadmin)->postJson(route('roles.store'), [
        'name' => 'Test Role',
    ]);

    $response->assertStatus(302);

    $this->assertDatabaseHas('roles', [
        'name' => 'Test Role',
    ]);
});


test('can update a role', function () {
    $role = Role::firstOrCreate(['name' => 'superadmin']);

    $superadmin = User::factory()->create();
    $superadmin->assignRole($role);

    $roleToUpdate = Role::create(['name' => 'Test Role']);

    $response = $this->actingAs($superadmin)->putJson(route('roles.update', $roleToUpdate->id), [
        'name' => 'Updated',
    ]);

    $response->assertStatus(302);

    $this->assertDatabaseHas('roles', [
        'id' => $roleToUpdate->id,
        'name' => 'Updated',
    ]);
});

test('can delete a role', function () {
    $role = Role::firstOrCreate(['name' => 'superadmin']);

    $superadmin = User::factory()->create();
    $superadmin->assignRole($role);

    $role = Role::create(['name' => 'Delete Role']);

    $response = $this->actingAs($superadmin)->deleteJson(route('roles.destroy', $role->id));

    $response->assertStatus(302);

    $this->assertDatabaseMissing('roles', [
        'name' => 'Delete Role',
    ]);
});