<?php

use Illuminate\Database\Seeder;

class LaminationTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $laminationTypes = [
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

        foreach ($laminationTypes as $laminationType) {
            DB::table('lamination_types')->insert($laminationType);
        }
    }
}
