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
                'alias' => 'eu',
                'name' => 'евро',
            ],
            [
                'alias' => 'gar',
                'name' => 'гармошка',
            ],
            [
                'alias' => 'win',
                'name' => 'оконная',
            ],
        ];

        foreach ($bookFoldingTypes as $bookFoldingType) {
            DB::table('book_folding_types')->insert($bookFoldingType);
        }
    }
}
