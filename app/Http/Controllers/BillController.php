<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\BillItem;
use App\Models\Product;
use Illuminate\Http\Request;

class BillController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return Bill::all();
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
        $is_editing = $request->isMethod('put');
        if(!$is_editing){
            $bill = new Bill();
            $bill->description = $request->input('description');
            $bill->cost = $request->input('cost');
            $bill->customer_id = $request->input('customer_id');

            if($bill->save()){
                $items = $request->input('items');
                if(is_array($items)){
                    foreach($items as $item){
                        for($i = 0 ; $i < $item['quantity'] ; $i++){
                            $bill_item = new BillItem();
                            $bill_item->product_id = $item['id'];
                            $bill_item->bill_id = $bill->id;
                            $bill_item->product_name = $item['name'];
                            $bill_item->cost = $item['cost'];
                            $bill_item->save();
                        }
                    }

                    $product = Product::find($item['id']);
                    $product->quantity = $product->quantity - $item['quantity'];
                    $product->save();
                }
            }
            return $bill;
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
        $bill = Bill::find($id);
        
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
    }
}
