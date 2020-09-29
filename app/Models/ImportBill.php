<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImportBill extends Model
{
    use HasFactory;

    protected $table = 'ImportBills';

    protected $attributes = [
        'status' => 'processing',
        'data' => '{}'
    ];

}
