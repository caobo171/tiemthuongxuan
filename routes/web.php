<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});

Route::get('/bill/create', function () {
    return view('index');
});

Route::get('/importbill/create', function () {
    return view('index');
});

Route::get('/importbills', function () {
    return view('index');
});

Route::get('/users', function () {
    return view('index');
});

Route::get('/providers', function () {
    return view('index');
});

Route::get('/bills', function () {
    return view('index');
});
// Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
