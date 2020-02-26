<?php

use Illuminate\Database\Seeder;

class PaperClipTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $paperClipTypes = [
            [
                "name" => 'файловая',
            ],
            [
                "name" => 'овальная',
            ],
        ];

        foreach ($paperClipTypes as $paperClipType) {
            DB::table('paper_clip_types')->insert($paperClipType);
        }
    }
}
