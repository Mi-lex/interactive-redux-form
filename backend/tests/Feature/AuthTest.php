<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class AuthTest extends TestCase
{
    use DatabaseMigrations, WithFaker;

    /** @test */
    public function a_user_can_register_using_form_credentials()
    {
        $this->withoutExceptionHandling();

        $formCredentials = factory(User::class)->raw(['password' => Str::random(10)]);

        $this->post('/api/auth/register', $formCredentials)->assertStatus(201);

        unset($formCredentials['password']);
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

        $this->post('/api/auth/login', $userCredentials)->assertStatus(200)->assertJsonStructure([
            'access_token',
            'token_type',
            'expires_in'
        ]);
    }
}
