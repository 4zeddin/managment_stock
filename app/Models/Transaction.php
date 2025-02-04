<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'client_id',
        'sub_warehouse_id',
        'product_id',
        'transaction_type',
        'amount',
        'transaction_date',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function subWarehouse()
    {
        return $this->belongsTo(SubWarehouse::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
