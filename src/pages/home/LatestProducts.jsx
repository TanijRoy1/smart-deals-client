import React, { use } from 'react';
import MyContainer from '../../components/MyContainer';
import Product from '../../components/Product';
import { Link } from 'react-router';

const LatestProducts = ({latestProductsPromise}) => {
    const latestProducts = use(latestProductsPromise);
    return (
        <MyContainer className={`py-10`}>
            <h1 className='text-center text-accent text-3xl font-bold'>Recent <span className='bg-linear-to-r from-blue-500 to-red-500 bg-clip-text text-transparent'>Products</span> <span className='text-xs text-accent-content'>{latestProducts.length} products found</span></h1>

            <div className='grid grid-cols-3 gap-8 py-10'>
                {
                    latestProducts.map(product => <Product key={product._id} product={product}></Product>)
                }
            </div>
            <div className='flex justify-center'><Link to={`/all-products`} className='btn btn-primary'>See All</Link></div>
        </MyContainer>
    );
};

export default LatestProducts;