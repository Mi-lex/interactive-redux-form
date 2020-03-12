<?php

use Illuminate\Http\Request;

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

Route::group([
    'prefix' => 'passport',
], function () {
    Route::get('/{id}', 'OrderController@show');
    Route::post('/', 'OrderController@store');
    Route::patch('/{order}', 'OrderController@update');
});

Route::group([
    'prefix' => 'orders',
], function () {
    Route::get('/', 'OrderController@index');
});