import React, { Suspense } from 'react';
import Banner from './Banner';
import LatestProducts from './LatestProducts';
import Loading from "../../components/Loading";


const latestProductsPromise = fetch("https://smart-deals-api-server-gamma.vercel.app/latest-products").then(res => res.json());
const Home = () => {
    return (
        <div className='bg-gray-100'>
            <Banner></Banner>
            <Suspense fallback={<Loading></Loading>}>
                <LatestProducts latestProductsPromise={latestProductsPromise}></LatestProducts>
            </Suspense>
            
        </div>
    );
};

export default Home;