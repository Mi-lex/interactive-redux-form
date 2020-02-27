<?php

use Illuminate\Database\Seeder;

class VarnishTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $varnishTypes = [
            [
                'name' => 'глянцевый',
            ],
            [
                'name' => 'матовый',
            ],
            [
                'name' => 'софт-тач',
            ],
        ];

        foreach ($varnishTypes as $varnishType) {
            DB::table('varnish_types')->insert($varnishType);
        }
    }
}
