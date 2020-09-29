<?php

use App\Http\Controllers\BillController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ImportBillController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProviderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('product', ProductController::class);
Route::resource('provider', ProviderController::class);
Route::resource('customer', CustomerController::class);
Route::resource('importbill', ImportBillController::class);
Route::resource('bill', BillController::class);