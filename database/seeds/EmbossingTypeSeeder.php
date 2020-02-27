<?php

use Illuminate\Database\Seeder;

class EmbossingTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $embossingTypes = [
            [
                'name' => 'глянцевая',
            ],
            [
                'name' => 'матовая',
            ],
            [
                'name' => 'голографическая',
            ],
        ];

        foreach ($embossingTypes as $embossingType) {
            DB::table('embossing_types')->insert($embossingType);
        }

    }
}
