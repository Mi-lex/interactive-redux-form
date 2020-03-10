<?php

use Illuminate\Database\Seeder;

class PrintTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $printTypes = [
            [
                'alias' => 'none',
                'name' => 'без_печати',
            ],
            [
                'alias' => 'ofs',
                'name' => 'офсет',
            ],
            [
                'alias' => 'digit',
                'name' => 'цифровая',
            ],
            [
                'alias' => 'ultr',
                'name' => 'уф-принтер',
            ],
            [
                'alias' => 'plot',
                'name' => 'плоттер',
            ]
        ];

        foreach ($printTypes as $printType) {
            DB::table('print_types')->insert($printType);
        }
    }
}
