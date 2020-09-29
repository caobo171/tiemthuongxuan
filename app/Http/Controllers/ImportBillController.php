<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\ImportBill;
use App\Models\ImportBillItem;
use App\Models\Product;
use App\Models\Provider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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
        
        $is_editing = $request->isMethod('put');
        if(!$is_editing){
            $bill = new ImportBill();
            $bill->description = $request->input('description');
            $bill->cost = $request->input('cost');
            $bill->provider_id = $request->input('provider_id');

            if($bill->save()){
                $items = $request->input('items');
                if(is_array($items)){
                    foreach($items as $item){
                        for($i = 0 ; $i < $item['quantity'] ; $i++){
                            $bill_item = new ImportBillItem();
                            $bill_item->product_id = $item['id'];
                            $bill_item->bill_id = $bill->id;
                            $bill_item->product_name = $item['name'];
                            $bill_item->cost = $item['cost'];
                            $bill_item->save();
                        }
                    }

                    $product = Product::find($item['id']);
                    $product->quantity = $product->quantity + $item['quantity'];
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
        
        $bill = ImportBill::find($id);
        $bill_items = ImportBillItem::where('bill_id', $bill->id)->get();
        return array(
            "bill" => $bill,
            "bill_items" => $bill_items
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
