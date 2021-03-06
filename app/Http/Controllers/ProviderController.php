<?php

namespace App\Http\Controllers;

use App\Models\ImportBill;
use App\Models\ImportBillItem;
use App\Models\Provider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProviderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $q = $request->input('q');

        if ($q) {
            $customers = Provider::query()->where(DB::raw("CONCAT_WS('',name,phone)"), 'like', '%' .$q. '%');
            return [
                "data" => $customers->orderBy('created_at','desc')->paginate(10)
            ];
        }
        return [
            "data" => Provider::orderBy('created_at','desc')->paginate(10)
        ];
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $provider = new Provider;
        $provider->name = $request->input('name');
        $provider->phone = $request->input('phone');
        $provider->email = $request->input('email');
        $provider->description = $request->input('description');

        if($provider->save()){
            return $provider;
        }
        return null;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $provider = Provider::find($id);
        $bills = ImportBill::where('provider_id', $provider->id)->get();
        return array(
            'provider'=> $provider,
            'bills' => $bills
        );
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $provider = Provider::findOrFail($id) ;
        $provider->name = $request->input('name');
        $provider->phone = $request->input('phone');
        $provider->email = $request->input('email');
        $provider->description = $request->input('description');

        if($provider->save()){
            return $provider;
        }
        return null;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $provider = Provider::find($id);
        if ($provider) {
            return $provider->delete();
        }
    }
    
    /**
     * Full text search for provider
     */
    public function search(Request $request)
    {
        $q = $request->input('q');
        $customers = Provider::query()->where(DB::raw("CONCAT_WS('',name,phone)"), 'like', '%' .$q. '%')->get();
        return $customers;
    }

}
