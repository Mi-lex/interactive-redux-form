<?php

namespace App\Providers;

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Relations\Relation;
use App\Models\PaperJoiner;
use App\Models\PostAction;

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
        Schema::defaultStringLength(191);
        
        $paperJoinersPath = 'App\Models\PaperJoiners';
        $postActionsPath = 'App\Models\PostActions';

        Relation::morphMap([
            // Joiners
            PaperJoiner::PAPER_CLIP => "$paperJoinersPath\PaperClip",
            PaperJoiner::TERMO => "$paperJoinersPath\Termo",
            PaperJoiner::SPRING => "$paperJoinersPath\Spring",
            PaperJoiner::PACKET => "$paperJoinersPath\Packet",
            PaperJoiner::GLUE_BONDING => "$paperJoinersPath\GlueBonding",
            PaperJoiner::BINDING => "$paperJoinersPath\Binding",
            PaperJoiner::PAPER_FILE => "$paperJoinersPath\PaperFile",
            PaperJoiner::SPECIAL => "$paperJoinersPath\Special",
            // Post Actions
            PostAction::CREASING => "$postActionsPath\Creasing",
            PostAction::BOOK_FOLDING => "$postActionsPath\BookFolding",
            PostAction::LAMINATION => "$postActionsPath\Lamination",
            PostAction::REVARNISHING => "$postActionsPath\Revarnishing",
            PostAction::EMBOSSING => "$postActionsPath\Embossing",
            PostAction::STAMP_CUT => "$postActionsPath\StampCut",
            PostAction::PERFORATION => "$postActionsPath\Perforation",
            PostAction::HOT_STAMP => "$postActionsPath\HotStamp",

        ]);
    }
}
