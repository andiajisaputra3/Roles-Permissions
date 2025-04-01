<?php

use App\Http\Controllers\MasterData\PermissionController;
use App\Http\Controllers\MasterData\RoleController;
use App\Http\Controllers\MasterData\RoleManagementController;
use App\Http\Controllers\MasterData\UserManagementController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('masterdata/roles', RoleController::class);
    Route::resource('masterdata/permissions', PermissionController::class);
    Route::get('masterdata/role-managements', [RoleManagementController::class, 'index'])->name('role-management.index');
    Route::put('masterdata/role-managements/{id}', [RoleManagementController::class, 'update'])->name('role-management.update');
    Route::get('masterdata/user-managements', [UserManagementController::class, 'index'])->name('user-management.index');
    Route::put('masterdata/user-managements/{id}', [UserManagementController::class, 'update'])->name('user-management.update');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';