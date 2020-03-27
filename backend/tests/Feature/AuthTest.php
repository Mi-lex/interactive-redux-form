<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Str;
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

        $this->post('/api/register', $formCredentials)->assertStatus(201);

        unset($formCredentials['password']);
        unset($formCredentials['remember_token']);

        $this->assertDatabaseHas('users', $formCredentials);
    }
}
