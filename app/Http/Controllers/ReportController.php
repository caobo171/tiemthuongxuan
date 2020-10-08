<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\Bill;
use App\Models\BillItem;
use App\Models\ImportBill;
use App\Models\ImportBillItem;
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
        $assets = Asset::all();

        return array(
            'bills' => $bills,
            'import_bills' => $import_bills,
            'assets' => $assets
        );
    }

    //
    public  function product(Request $request)
    {
        # code...

        $start_date = $request->input('start_date');
        $end_date  = $request->input('end_date');

        $bill_items = BillItem::whereBetween('created_at', [$start_date, $end_date])->get();
        $importbill_items = ImportBillItem::whereBetween('created_at', [$start_date, $end_date])->get();

        return array(
            'bill_items' => $bill_items,
            'importbill_items' => $importbill_items
        );
    }
}
