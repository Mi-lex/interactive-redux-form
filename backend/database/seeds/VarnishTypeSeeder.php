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
                'alias' => 'glos',
                'name' => 'глянцевый',
            ],
            [
                'alias' => 'matt',
                'name' => 'матовый',
            ],
            [
                'alias' => 'soft',
                'name' => 'софт-тач',
            ],
        ];

        foreach ($varnishTypes as $varnishType) {
            DB::table('varnish_types')->insert($varnishType);
        }
    }
}
