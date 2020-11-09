<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\BillItem;
use App\Models\Customer;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BillController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $q = $request->input('q');
        if ($q) {
            $bills = Bill::query()->where(DB::raw("CONCAT_WS('',customer_name, status)"), 'like', '%' . $q . '%');
            return $bills->orderBy('created_at', 'desc')->paginate(10);
        } else {
            return Bill::orderBy('created_at', 'desc')->paginate(10);
        }
       
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
        DB::beginTransaction();
        $bill = new Bill();
        $bill->description = $request->input('description');
        $bill->cost = $request->input('cost');
        $bill->extra_cost = $request->input('extra_cost');
        $bill->customer_id = $request->input('customer_id');
        $bill->customer_name = $request->input('customer_name');
        $bill->customer_platform = $request->input('customer_platform');
        $bill->created_at = $request->input('created_at');

        if($bill->save()){
            $items = $request->input('items');
            if(is_array($items)){
                foreach($items as $item){
                    $bill_item = new BillItem();
                    $bill_item->quantity = $item['quantity'];
                    $bill_item->product_id = $item['product_id'];
                    $bill_item->bill_id = $bill->id;
                    $bill_item->product_name = $item['product_name'];
                    $bill_item->cost = $item['cost'];
                    $bill_item->sku = $item['sku'];
                    $bill_item->created_at = $request->input('created_at');
                    $bill_item->save();
                    $product = Product::find($item['product_id']);

                    if($product->quantity < $item['quantity']){
                        DB::rollBack();
                        return array(
                            'message'=>'Out of stock',
                            'error' => true
                        );
                    }
                    $product->quantity = $product->quantity - $item['quantity'];
                    $product->save();
                }
            }
        }
        DB::commit();
        return $bill;
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
        $bill_items = BillItem::where("bill_id", $bill->id)->get();
        $customer = Customer::find($bill->customer_id);
        return array(
            "bill" => $bill,
            "bill_items" => $bill_items,
            "customer" => $customer
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
        DB::beginTransaction();
        $bill = Bill::findOrfail($id);
        $bill->description = $request->input('description');
        $bill->cost = $request->input('cost');
        $bill->extra_cost = $request->input('extra_cost');
        $bill->customer_id = $request->input('customer_id');
        $bill->customer_name = $request->input('customer_name');
        $bill->customer_platform = $request->input('customer_platform');
        $bill->created_at = $request->input('created_at');

        if($bill->save()){
            $items = $request->input('items');
            if(is_array($items)){
                foreach($items as $item){
                    $bill_item = BillItem::findOrfail($item['id']);

                    if(!$bill_item){
                        $bill_item = new BillItem();
                        $bill_item->quantity = 0;
                    }

                    $added_quantity = $item['quantity'] - $bill_item->quantity;
                    $bill_item->quantity = $item['quantity'];
                    $bill_item->product_id = $item['product_id'];
                    $bill_item->bill_id = $bill->id;
                    $bill_item->product_name = $item['product_name'];
                    $bill_item->cost = $item['cost'];
                    $bill_item->sku = $item['sku'];
                    $bill_item->created_at = $request->input('created_at');
                    $bill_item->save();
                    $product = Product::find($item['product_id']);

                    if($product->quantity < $added_quantity){
                        DB::rollBack();
                        return array(
                            'message'=>'Out of stock',
                            'error' => true
                        );
                    }
                    $product->quantity = $product->quantity - $added_quantity;
                    $product->save();
                }
            }
        }
        DB::commit();
        return $bill; 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        
    }

    public function status(Request $request){
        $bill = Bill::find($request->input('id'));
        $bill->status = $request->input('status');
        if($bill->save()){
            return $bill;
        }
        return $bill;
    }

    public function search(Request $request){
        $bills = Bill::query()->where(DB::raw("CONCAT_WS('',customer_name, status)"), 'like', '%' . $request->input('q') . '%')->get();
        return $bills;
    }
}
