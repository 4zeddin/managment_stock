<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\Product;
use App\Models\SubWarehouse;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'client_id' => Client::factory(),
            'sub_warehouse_id' => SubWarehouse::factory(),
            'product_id' => Product::factory(),
            'transaction_type' => $this->faker->randomElement(['sur site', 'online']),
            'amount' => $this->faker->randomFloat(2, 50, 1000),
            'transaction_date' => $this->faker->dateTimeThisYear,
        ];
    }
}
