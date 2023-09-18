import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../App';
import { Card } from 'react-bootstrap';


export default observer(function BrandBar() {
    const {brands, selectedBrand, setSelectedBrand} = useContext(Context);

  return (
    <div className='d-flex flex-wrap'>
        {brands.map(brand => 
            <Card
                style={{cursor: 'pointer'}}
                key={brand.id}
                className='p-3'
                onClick={() => setSelectedBrand(brand)}
                border={brand.id === selectedBrand.id ? 'danger' : 'light'}
            >
                {brand.value}
            </Card>
        )}
    </div>
  );
});