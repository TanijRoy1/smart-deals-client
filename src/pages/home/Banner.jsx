import React from "react";
import MyContainer from "../../components/MyContainer";

const Banner = () => {
  return (
    <MyContainer className={`py-10 flex flex-col gap-4`}>
      <h1 className="text-accent sm:text-5xl text-3xl font-bold text-center">
        Deal your{" "}
        <span className="bg-linear-to-r from-blue-500 bg-red-500 bg-clip-text text-transparent">
          Products
        </span>{" "}
        in a{" "}
        <span className="bg-linear-to-r from-blue-500 bg-red-500 bg-clip-text text-transparent">
          Smart
        </span>{" "}
        way !
      </h1>
      <p className="text-accent-content text-center">
        SmartDeals helps you sell, resell, and shop from trusted local sellers —
        all in one place!
      </p>
    </MyContainer>
  );
};

export default Banner;
