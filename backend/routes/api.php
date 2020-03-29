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

Route::group([
    'prefix' => 'auth',
], function () {
    Route::post('/register', 'Auth\RegisterController@register');
    Route::post('/protected', 'Auth\LoginController@protected');
    Route::post('/login', 'Auth\LoginController@login');
    Route::post('/refresh', 'Auth\LoginController@refresh');
    Route::post('me', 'Auth\LoginController@me');
});


Route::group([
    'prefix' => 'passport',
    'middleware' => 'jwt.auth'
], function () {
    Route::get('/{id}', 'OrderController@show');
    Route::post('/', 'OrderController@create');
    Route::patch('/{order}', 'OrderController@update');
});

Route::group([
    'prefix' => 'orders',
    'middleware' => 'jwt.auth'
], function () {
    Route::get('/', 'OrderController@index');
});
