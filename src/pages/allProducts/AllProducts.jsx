import React from 'react';
import MyContainer from '../../components/MyContainer';
import Product from '../../components/Product';
import { useLoaderData } from 'react-router';

const AllProducts = () => {
    const allProducts = useLoaderData();
    return (
        <div className='bg-gray-100'>
            <MyContainer className={`py-10`}>
            <h1 className='text-center text-accent text-3xl font-bold'>All <span className='bg-linear-to-r from-blue-500 to-red-500 bg-clip-text text-transparent'>Products</span> <span className='text-xs text-accent-content'>{allProducts.length} products found</span></h1>

            <div className='grid grid-cols-3 gap-8 py-10'>
                {
                    allProducts.map(product => <Product key={product._id} product={product}></Product>)
                }
            </div>
        </MyContainer>
        </div>
    );
};

export default AllProducts;