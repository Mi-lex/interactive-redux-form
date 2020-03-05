<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Relations\Relation;
use App\Models\PaperJoiner;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $paperJoinersPath = 'App\Models\PaperJoiners';

        Relation::morphMap([
            PaperJoiner::PAPER_CLIP => "$paperJoinersPath\PaperClip",
            PaperJoiner::TERMO => "$paperJoinersPath\Termo",
            PaperJoiner::SPRING => "$paperJoinersPath\Spring",
            PaperJoiner::PACKET => "$paperJoinersPath\Packet",
            PaperJoiner::GLUE_BONDING => "$paperJoinersPath\GlueBonding",
            PaperJoiner::BINDING => "$paperJoinersPath\Binding",
            PaperJoiner::PAPER_FILE => "$paperJoinersPath\PaperFile",
            PaperJoiner::SPECIAL => "$paperJoinersPath\Special",
        ]);
    }
}
