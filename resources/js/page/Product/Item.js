import React from 'react';

const ProductItem = React.memo(()=>{
    return (
        <div class="row mb-2">
            <div class="col">PVN05</div>
            <div class="col">Dưa hấu</div>
            <div class="col">
                <input value="quả" className="form-control"/>
            </div>
            <div class="col"><input value="3" type="number" className="form-control"/></div>
            <div class="col"><input value="25000" type="number" className="form-control"/></div>
            <div class="col">75000</div>
        </div>

    );
});

export default ProductItem;