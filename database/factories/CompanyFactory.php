<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Company::class, function (Faker $faker) {
    $rand = rand(6,10);
    return [
        'company_name' => $faker->name,
        'url' => $rand,
        'chat_user_id' => $rand,
        'created_at' => date('Y-m-d h:i:s', time())
    ];
});
