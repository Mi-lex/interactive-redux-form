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
        $this->call(PackageTypeSeeder::class);
        $this->call(BookFoldingTypeSeeder::class);
        $this->call(FoilTypeSeeder::class);
        $this->call(LaminationTypeSeeder::class);
        $this->call(VarnishTypeSeeder::class);
    }
}
