<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\Bill;
use App\Models\BillItem;
use App\Models\ImportBill;
use App\Models\ImportBillItem;
use App\Models\Product;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    //
    public  function index(Request $request)
    {
        # code...

        $start_date = $request->input('start_date');
        $end_date  = $request->input('end_date');

        $bills = Bill::whereBetween('created_at', [$start_date, $end_date])->get();
        $import_bills = ImportBill::whereBetween('created_at', [$start_date, $end_date])->get();
        $importbill_items = ImportBillItem::whereBetween('created_at', [$start_date, $end_date])->get();
        $product_ids = $importbill_items->map(function ($e) {
            return $e->product_id;
        });

        // Calculate revenue
        $bill_items = BillItem::whereBetween('created_at', [$start_date, $end_date])->get();
        $revenue_product_ids = $bill_items->map(function ($e) {
            return $e->product_id;
        });
        $revenue_importbill_items = ImportBillItem::whereIn('product_id', $revenue_product_ids)->get();

        // $bill_items = BillItem::whereIn('product_id', $product_ids)->get();
        $import_products = Product::whereIn('id', $product_ids)->get();
        $assets = Asset::all();

        return array(
            'bills' => $bills,
            'import_bills' => $import_bills,
            'assets' => $assets,
            'importbill_items' => $importbill_items,
            'bill_items' => $bill_items,
            'revenue_importbill_items' => $revenue_importbill_items,
            'products' => $import_products
        );
    }

    //
    public  function product(Request $request)
    {
        # code...

        $start_date = $request->input('start_date');
        $end_date  = $request->input('end_date');

        $bill_items = BillItem::whereBetween('created_at', [$start_date, $end_date])->get();
        $product_ids = $bill_items->map(function ($e) {
            return $e->product_id;
        });
        $importbill_items = ImportBillItem::whereIn('product_id', $product_ids)->get();

        return array(
            'bill_items' => $bill_items,
            'importbill_items' => $importbill_items
        );
    }
}
