import React from 'react';
import MyContainer from './MyContainer';

const Loading = () => {
    return (
        <MyContainer className={`flex items-center justify-center py-20`}>
            <span className="loading loading-bars loading-xl"></span>
        </MyContainer>
    );
};

export default Loading;