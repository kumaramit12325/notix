<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth'])->group(function () {
    Route::get('settings', function () {
        return Inertia::render('settings/index');
    })->name('settings.index');

    Route::get('settings/general', function () {
        return Inertia::render('settings/general');
    })->name('settings.general');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/language', function () {
        return Inertia::render('settings/language');
    })->name('settings.language');

    Route::get('settings/backup', function () {
        return Inertia::render('settings/backup');
    })->name('settings.backup');

    Route::get('settings/advanced', function () {
        return Inertia::render('settings/advanced');
    })->name('settings.advanced');

    Route::get('settings/update', function () {
        return Inertia::render('settings/update');
    })->name('settings.update');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');

    Route::put('settings/password', [PasswordController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance');
});
