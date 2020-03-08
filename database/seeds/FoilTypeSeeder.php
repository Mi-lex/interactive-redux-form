<?php

use Illuminate\Database\Seeder;

class FoilTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $foilTypes = [
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

        foreach ($foilTypes as $foilType) {
            DB::table('foil_types')->insert($foilType);
        }

    }
}
