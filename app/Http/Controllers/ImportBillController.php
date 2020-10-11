<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\ImportBill;
use App\Models\ImportBillItem;
use App\Models\Product;
use App\Models\Provider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ImportBillController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return ImportBill::orderBy('created_at', 'desc')->get();
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
        $bill = new ImportBill();
        $bill->description = $request->input('description');
        $bill->cost = $request->input('cost');
        $bill->provider_id = $request->input('provider_id');
        $bill->extra_cost = $request->input('extra_cost');
        $bill->provider_name = $request->input('provider_name');
        $bill->created_at = $request->input('created_at');

        if($bill->save()){
            $items = $request->input('items');
            if(is_array($items)){
                foreach($items as $item){
                    $bill_item = new ImportBillItem();
                    $bill_item->quantity = $item['quantity'];
                    $bill_item->product_id = $item['product_id'];
                    $bill_item->bill_id = $bill->id;
                    $bill_item->product_name = $item['product_name'];
                    $bill_item->cost = $item['cost'];
                    $bill_item->sku = $item['sku'];
                    $bill->created_at = $request->input('created_at');
                    $bill_item->save();

                    $product = Product::find($item['product_id']);
                    $product->quantity = $product->quantity + $item['quantity'];
                    $product->save();
                }
            }
        }
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

        $bill = ImportBill::find($id);
        $bill_items = ImportBillItem::where('bill_id', $bill->id)->get();
        $provider = Provider::find($bill->provider_id);
        return array(
            "bill" => $bill,
            "bill_items" => $bill_items,
            "provider"=> $provider
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
        $bill = ImportBill::findOrfail($id);
        $bill->description = $request->input('description');
        $bill->cost = $request->input('cost');
        $bill->provider_id = $request->input('provider_id');
        $bill->extra_cost = $request->input('extra_cost');
        $bill->provider_name = $request->input('provider_name');
        $bill->created_at = $request->input('created_at');

        if($bill->save()){
            $items = $request->input('items');
            if(is_array($items)){
                foreach($items as $item){
                    $bill_item = ImportBillItem::findOrfail($item['id']);
                    if(!$bill_item){
                        $bill_item = new ImportBillItem();
                        $bill_item->quantity = 0;
                    }

                    $added_item = $item['quantity'] - $bill_item->quantity;
                    $bill_item->quantity = $item['quantity'];
                    $bill_item->product_id = $item['product_id'];
                    $bill_item->bill_id = $bill->id;
                    $bill_item->product_name = $item['product_name'];
                    $bill_item->cost = $item['cost'];
                    $bill_item->sku = $item['sku'];
                    $bill->created_at = $request->input('created_at');
                    $bill_item->save();

                    $product = Product::find($item['product_id']);
                    $product->quantity = $product->quantity + $added_item;
                    $product->save();
                }
            }
        }
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
        //
    }


    public function search(Request $request){
        $bills = ImportBill::query()->where(DB::raw("CONCAT_WS('',provider_name, status)"), 'like', '%' . $request->input('q') . '%')->get();
        return $bills;
    }
}
