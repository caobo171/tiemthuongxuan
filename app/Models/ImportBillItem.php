<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImportBillItem extends Model
{
    use HasFactory;

    protected $table = 'ImportBillItems';

    protected $attributes = [
        'status' => 'good',
    ];
}
