<?php

use Illuminate\Database\Seeder;

class BookFoldingTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $bookFoldingTypes = [
            [
                'name' => 'евро',
            ],
            [
                'name' => 'гармошка',
            ],
            [
                'name' => 'оконная',
            ],
        ];

        foreach ($bookFoldingTypes as $bookFoldingType) {
            DB::table('book_folding_types')->insert($bookFoldingType);
        }
    }
}
