<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubWarehouse extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'total_price',
        'total_paid',
        'total_debt',
    ];

    public function product()
    {
        return $this->hasMany(Product::class);
    }

    public function transaction()
    {
        return $this->hasMany(Transaction::class);
    }
}
