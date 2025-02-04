<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\dashController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\RedirectIfAuthenticated;

Route::inertia('/', 'Auth/Login')->middleware(RedirectIfAuthenticated::class);

Route::middleware('auth')->group(function () {
    
    Route::get('/dashboard', [dashController::class, 'index'])->name('dashboard');
    
    Route::resource('client', ClientController::class);
    
    Route::resource('product', ProductController::class);

    Route::resource('transaction', TransactionController::class);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});

require __DIR__.'/auth.php';
