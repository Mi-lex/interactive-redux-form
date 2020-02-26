<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(PaymentOrgTypeSeeder::class);
        $this->call(PrintTypeSeeder::class);
        $this->call(PaperClipTypeSeeder::class);
    }
}
