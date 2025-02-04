<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequesst;
use App\Models\Client;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = Client::orderBy('id', 'asc')->paginate(10);
        return inertia('Client', compact('clients'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClientRequest $request)
    {
        sleep(1);
        Client::create($request->validated());
        return to_route('client.index');       
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // $client = Client::findorfail($id);
        // return inertia('', ['client' => $client]);
    } 

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClientRequesst $request, string $id)
    {
        $client = Client::findorfail($id);
        $client->update($request->validated());
        return to_route('client.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Client::destroy($id);
        return to_route('client.index');
    }
}
