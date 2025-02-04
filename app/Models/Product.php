<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'sub_warehouse_id',
        'name',
        'quantity',
        'price',
        'total_price',
    ];

    public function subWarehouse()
    {
        return $this->belongsTo(SubWarehouse::class);
    }

    public function transaction()
    {
        return $this->hasMany(Transaction::class);
    }
    
}
