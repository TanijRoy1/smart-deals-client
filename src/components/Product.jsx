import React from 'react';
import { Link } from 'react-router';

const Product = ({product}) => {
    const {_id, image, title, price_min, price_max} = product;
    return (
        <div className='bg-white rounded-xl shadow-md hover:shadow-2xl'>
            <img src={image} alt={title} className='w-full object-cover h-60 rounded-t-xl' />
            <div className="p-4">
                <h1 className='text-accent text-2xl font-bold'>{title}</h1>
            <p className='text-blue-500 text-xl font-semibold mt-2'>৳ {price_min} - {price_max}</p>
            <Link to={`/all-products/${_id}`} className='btn btn-outline border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white w-full mt-2 transition-all duration-300'>View Details</Link>
            </div>
        </div>
    );
};

export default Product;