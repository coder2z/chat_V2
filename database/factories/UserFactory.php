<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\Models\User::class, function (Faker $faker) {
    return [
        'cname' => $faker->name,
        'status' => 1,
        'password' => '$2y$10$qYsKIW3tO5RjQJRyxagXkuR9wAYwD5ZWuls8DhZnqVY4VMExa1mya', // 123456
        'type' => 1,
        'tel' => 13890000111,
        'created_at' => date('Y-m-d h:i:s', time())
    ];
});

$factory->define(App\Models\Blacklist::class, function (Faker $faker) {
    return [
        'credential' => 'credential',
        'created_at' => date('Y-m-d h:i:s', time()),
        'state' => 1
    ];
});
