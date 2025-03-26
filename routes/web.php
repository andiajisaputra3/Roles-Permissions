<?php

use App\Http\Controllers\MasterData\PermissionController;
use App\Http\Controllers\MasterData\RoleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::resource('masterdata/roles', RoleController::class);
Route::resource('masterdata/permissions', PermissionController::class);

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';