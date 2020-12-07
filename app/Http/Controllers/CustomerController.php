<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CustomerController extends Controller
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
            $customers = Customer::query()->where(DB::raw("CONCAT_WS('',name,phone)"), 'like', '%' .$q. '%');
            return $customers->orderBy('created_at','desc')->paginate(10);
        }
        
        return Customer::orderBy('created_at','desc')->paginate(10);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        return "test";
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $customer =  new Customer;
        $customer->name = $request->input('name');
        $customer->phone = $request->input('phone');
        $customer->email = $request->input('email');
        $customer->platform = $request->input('platform');
        $customer->description = $request->input('description');

        $old_customers = Customer::where('phone', $customer->phone)->get();

        if (count($old_customers)>0) {
            return 'Customer phone number already exist!';
        }

        if($customer->save()){
            return $customer;
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
        $customer = Customer::find($id);
        $bills = Bill::where('customer_id', $customer->id)->get();
        return array(
            'customer'=> $customer,
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
        $customer =  Customer::findOrfail($id);
        $customer->name = $request->input('name');
        $customer->phone = $request->input('phone');
        $customer->email = $request->input('email');
        $customer->platform = $request->input('platform');
        $customer->description = $request->input('description');


        if($customer->save()){
            return $customer;
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
        //
        $customer = Customer::find($id);
        if ($customer) {
            return $customer->delete();
        }
    }


    /**
     * Full text search for customer
     */
    public function search(Request $request)
    {
        $q = $request->input('q');
        $customers = Customer::query()->where(DB::raw("CONCAT_WS('',name,phone)"), 'like', '%' .$q. '%')->get();
        return $customers;
    }
}
