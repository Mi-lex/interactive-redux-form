<?php

use Illuminate\Database\Seeder;

class PaymentOrgTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $orgs = [
            [
                'name' => 'эталон',
            ],
            [
                'name' => 'стандарт',
            ],
            [
                'name' => 'прессцентр',
            ],
        ];

        foreach ($orgs as $org) {
            DB::table('payment_org_types')->insert($org);
        }
    }
}
