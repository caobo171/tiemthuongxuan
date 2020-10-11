<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use Illuminate\Http\Request;

class AssetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return Asset::orderBy('created_at')->get();
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
        $asset = new Asset();
        $asset->name = $request->input('name');
        $asset->cycle = $request->input('cycle');
        $asset->description = $request->input('description');
        $asset->cost = $request->input('cost');

        if ($request->input('created_at')){
            $asset->created_at = $request->input('created_at');
        }
        if($asset->save()){
            return $asset;
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
        $asset = Asset::findOrFail($id);
        $asset->name = $request->input('name');
        $asset->cycle = $request->input('cycle');
        $asset->description = $request->input('description');
        $asset->cost = $request->input('cost');

        if ($request->input('created_at')){
            $asset->created_at = $request->input('created_at');
        }
        if($asset->save()){
            return $asset;
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
        $asset = Asset::find($id);
        if($asset->delete()){
            return true;
        }

        return false;
    }


    public function search(Request $request){
        $q = $request->input('q');
        $assets = Asset::query()->where('name', 'like', '%' .$q. '%')->get();
        return $assets;
    }
    /**
     *
     */

}
