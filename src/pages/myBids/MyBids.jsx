import React, { useContext, useEffect, useState } from "react";
import MyContainer from "../../components/MyContainer";
import Swal from "sweetalert2";
import AuthContext from "../../contexts/AuthContext";
import Loading from "../../components/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AOS from "aos";
import "aos/dist/aos.css";

const MyBids = () => {
  const [bids, setBids] = useState([]);
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  // console.log(user?.accessToken);

  useEffect(() => {
    if (loading) return;
    // fetch(`https://smart-deals-api-server-gamma.vercel.app/bids?email=${user?.email}`, {
    //   headers : {
    //     authorization : `Bearer ${user?.accessToken}`
    //   }
    // })
    //   .then((res) => res.json())
    axiosSecure
      .get(`/bids?email=${user?.email}`)
      .then((data) => setBids(data.data));
  }, [user, loading, axiosSecure]);

  const handleDeleteBid = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // fetch(`https://smart-deals-api-server-gamma.vercel.app/bids/${id}`, {
        //   method: "DELETE",
        // })
        //   .then((res) => res.json())
        axiosSecure.delete(`/bids/${id}`).then((data) => {
          if (data.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your bid has been deleted.",
              icon: "success",
            });

            const remainingBids = bids.filter((bid) => bid._id !== id);
            setBids(remainingBids);
          }
        });
      }
    });
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 100,
      easing: "ease-in-out",
      once: false,
      mirror: true,
    });
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="bg-gray-100">
      <MyContainer className="py-10">
        {/* Header */}
        <h1 className="text-3xl font-bold text-accent text-center mb-6">
          My Bids:{" "}
          <span className="bg-linear-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
            {bids.length < 10 && 0}
            {bids.length}
          </span>
        </h1>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th>SL NO</th>
                <th>Product</th>
                <th>Seller</th>
                <th>Bid Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((bid, index) => (
                <tr
                  data-aos="fade-left"
                  data-aos-delay={index * 200}
                  data-aos-duration="500"
                  data-aos-once="false"
                  key={bid._id}
                  className="hover:bg-gray-50"
                >
                  <td>{index + 1}</td>
                  <td>
                    <div>
                      <p className="font-semibold">
                        {bid.product_name || "iPhone 14 Pro"}
                      </p>
                      <p className="text-sm text-gray-500">{bid.product}</p>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle rounded-full h-12 w-12">
                          <img
                            src={bid.buyer_image}
                            alt="Seller Avatar"
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{bid.buyer_name}</div>
                        <div className="text-sm opacity-50">
                          {bid.buyer_email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-semibold text-gray-800">
                    ৳ {bid.bid_price}
                  </td>
                  <td>
                    <span className="bg-orange-500 border border-orange-500 text-white rounded-2xl px-2 py-1 text-xs font-semibold">
                      {bid.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteBid(bid._id)}
                      className="text-green-500 border border-green-500 hover:shadow-md transition-all cursor-pointer rounded-2xl px-2 py-1 text-xs font-semibold"
                    >
                      Remove Bid
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="md:hidden space-y-4">
          {bids.map((bid, index) => (
            <div
              data-aos="fade-up"
              data-aos-delay={index * 200}
              data-aos-duration="500"
              data-aos-once="false"
              key={bid._id}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
            >
              {/* Header row */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-600">
                  #{index + 1}
                </span>
                <span className="bg-orange-500 text-white text-xs font-semibold rounded-2xl px-2 py-0.5">
                  {bid.status}
                </span>
              </div>

              {/* Product info */}
              <div className="mb-3">
                <h3 className="text-lg font-bold">
                  {bid.product_name || "iPhone 14 Pro"}
                </h3>
                <p className="text-sm text-gray-500">{bid.product}</p>
              </div>

              {/* Seller info */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={bid.buyer_image}
                  alt="Seller Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-700">
                    {bid.buyer_name}
                  </p>
                  <p className="text-xs text-gray-500">{bid.buyer_email}</p>
                </div>
              </div>

              {/* Bid info & actions */}
              <div className="flex justify-between items-center">
                <p className="text-base font-semibold text-gray-800">
                  ৳ {bid.bid_price}
                </p>
                <button
                  onClick={() => handleDeleteBid(bid._id)}
                  className="text-green-500 border border-green-500 hover:shadow-md transition-all rounded-2xl px-2 py-1 text-xs font-semibold"
                >
                  Remove Bid
                </button>
              </div>
            </div>
          ))}
        </div>
      </MyContainer>
    </div>
  );
};

export default MyBids;
