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
                'name' => 'без_печати',
            ],
            [
                'name' => 'офсет',
            ],
            [
                'name' => 'цифровая',
            ],
            [
                'name' => 'уф-принтер',
            ],
            [
                'name' => 'плоттер',
            ]
        ];

        foreach ($printTypes as $printType) {
            DB::table('print_types')->insert($printType);
        }
    }
}
