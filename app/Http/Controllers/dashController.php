<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Transaction;

class dashController extends Controller
{
    public function index() {
        $clients = Client::orderBy('id', 'asc')->get();
        $total_paid = Client::sum('total_paid');
        $total_debt = Client::sum('total_debt');
        $transactions = Transaction::with(['client', 'subWarehouse', 'product'])->orderBy('transaction_date', 'desc')->take(8)->get();
        return inertia('Dashboard', compact('clients', 'total_paid', 'total_debt', 'transactions'));
    }
}
