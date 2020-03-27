<?php

namespace App\Traits;

use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;

trait InteractsWithAuthOverrides
{
    public function actingAs(User $user, $driver = null)
    {
        $token = JWTAuth::fromUser($user);
        $this->withHeader('Authorization', 'Bearer ' . $token);

        return $this;
    }
}
