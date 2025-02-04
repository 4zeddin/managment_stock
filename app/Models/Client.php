<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'total_product_price',
        'total_paid',
        'total_debt',
    ];

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
