<?php

namespace App\Http\Controllers;

use App\Models\BillItem;
use App\Models\ImportBillItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Product::orderBy('created_at')->get();
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
        $product = $request->isMethod('put') ? Product::findOrFail($request->input('id')) : new Product;
        $product->name = $request->input('name');
        $product->sku = $request->input('sku');
        $product->cost = $request->input('cost');
        $product->description = $request->input('description');

        if($product->save()){
            return $product;
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
        $product = Product::find($id);
        $bill_items = BillItem::where('product_id', $product->id)->get();
        $importbill_items = ImportBillItem::where('product_id', $product->id)->get();
        return array(
            "product" => $product,
            "bill_items" => $bill_items,
            "importbill_items" => $importbill_items
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
        $product = Product::findOrFail($id);
        $product->name = $request->input('name');
        $product->sku = $request->input('sku');
        $product->cost = $request->input('cost');
        $product->description = $request->input('description');

        if($product->save()){
            return $product;
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
        $product = Product::find($id);

        if ($product) {
            return $product->delete();
        }
    }

    /**
     * Full Text Search for product
     */
    public function search(Request $request)
    {
        $q = $request->input('q');
        $products = Product::query()->where('name', 'like', '%' .$q. '%')->get();
        return $products;
    }
}
