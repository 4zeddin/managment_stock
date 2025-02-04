<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SubWarehouse>
 */
class SubWarehouseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->company,
            'total_price' => $this->faker->randomFloat(2, 1000, 10000),
            'total_paid' => $this->faker->randomFloat(2, 500, 8000),
        ];
    }
}
