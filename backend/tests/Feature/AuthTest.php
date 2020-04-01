<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Traits\InteractsWithAuthOverrides;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use JWTAuth;

class AuthTest extends TestCase
{
    use DatabaseMigrations, WithFaker, InteractsWithAuthOverrides;

    protected function setUp(): void
    {
        parent::setUp();
        $this->withHeaders([
            'Accept' => 'application/json',
            'X-Requested-With' => 'XMLHttpRequest'
        ]);
    }
    /** @test */
    public function a_user_can_register_using_form_credentials()
    {
        $this->withoutExceptionHandling();

        $password = Str::random(10);

        $formCredentials = factory(User::class)->raw();
        $formCredentials['password'] = $password;
        $formCredentials['password_confirmation'] = $password;

        $this->post('/api/auth/register', $formCredentials)->assertStatus(201);

        unset($formCredentials['password']);
        unset($formCredentials['password_confirmation']);
        unset($formCredentials['remember_token']);

        $this->assertDatabaseHas('users', $formCredentials);
    }

    /** @test */
    public function an_unauthorized_user_receives_error_logging_in()
    {
        $this->withoutExceptionHandling();

        $userCredentials = [
            'email' => $this->faker->safeEmail,
            'password' => $this->faker->password
        ];

        $this->post('/api/auth/login', $userCredentials)->assertStatus(401);
    }

    /** @test */
    public function an_authorized_user_can_login_and_receives_access_token()
    {
        $this->withoutExceptionHandling();

        $password = Str::random(10);

        $user = factory(User::class)->create(['password' => Hash::make($password)]);

        $userCredentials = [
            'email' => $user->email,
            'password' => $password
        ];

        $response = $this->post('/api/auth/login', $userCredentials)->assertOk();
        $this->assertNotEmpty($response->headers->get('Authorization'));
    }

    /** @test */
    public function an_unauthorized_user_cannot_access_protected_route()
    {
        $protected = 'api/orders';

        $this->get($protected, ['accept' => 'application/json'])->assertStatus(401);
    }

    /** @test */
    public function an_authorized_user_can_refresh_expired_token()
    {
        $this->actingAs(factory('App\Models\User')->create());

        Carbon::setTestNow(Carbon::now()->addMinutes(auth()->factory()->getTTL()));

        $response = $this->post('api/auth/refresh')->assertOk();
        $this->assertNotEmpty($response->headers->get('Authorization'));
    }

    /** @test */
    public function an_authorized_user_cannot_refresh_expired_token_past_refresh_time()
    {
        $this->withoutExceptionHandling();

        $this->actingAs(factory('App\Models\User')->create());

        // there is no getRefreshTTL method, so I just piked the value from config/jwt.php
        $configRefreshTimeTTL = 20160; // [minutes] = two weeks
        Carbon::setTestNow(Carbon::now()->addMinutes($configRefreshTimeTTL));

        $response = $this->post('api/auth/refresh')->assertStatus(401);
        $this->assertNull($response->headers->get('Authorization'));
    }
}
