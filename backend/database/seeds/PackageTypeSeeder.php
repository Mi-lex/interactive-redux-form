<?php

use Illuminate\Database\Seeder;

class PackageTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $packageTypes = [
            [
                'alias' => 'box',
                'name' => 'коробка',
            ],
            [
                'alias' => 'pac',
                'name' => 'пачка',
            ],
        ];

        foreach ($packageTypes as $packageType) {
            DB::table('package_types')->insert($packageType);
        }

    }
}
