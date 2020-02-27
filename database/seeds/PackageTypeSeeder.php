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
                'name' => 'коробка',
            ],
            [
                'name' => 'пачка',
            ],
        ];

        foreach ($packageTypes as $packageType) {
            DB::table('package_types')->insert($packageType);
        }

    }
}
