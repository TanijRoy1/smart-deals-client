import React, { useContext, useEffect, useState } from "react";
import MyContainer from "../../components/MyContainer";
import Swal from "sweetalert2";
import AuthContext from "../../contexts/AuthContext";
import Loading from "../../components/Loading";

const MyBids = () => {
  const [bids, setBids] = useState([]);
  const {user, loading} = useContext(AuthContext);
  // console.log(user?.accessToken);

  useEffect(() => {
    if(loading) return;
    fetch(`http://localhost:3000/bids?email=${user?.email}`, {
      headers : {
        authorization : `Bearer ${user?.accessToken}`
      }
    })
      .then((res) => res.json())
      .then((data) => setBids(data));
  }, [user, loading]);

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
        fetch(`http://localhost:3000/bids/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
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

  if(loading) {
    return <Loading></Loading>
  }
  return (
    <div className="bg-gray-100">
      <MyContainer className={`py-10`}>
        <h1 className="text-3xl font-bold text-accent text-center">
          {" "}
          My Bids:{" "}
          <span className="bg-linear-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
            {bids.length < 10 && 0}
            {bids.length}
          </span>
        </h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
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
              {/* row 1 */}
              {bids.map((bid, index) => (
                <tr key={bid._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div>
                      <p>iPhone 14 Pro</p>
                      <p>{bid.product}</p>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle rounded-full h-12 w-12">
                          <img
                            src={bid.buyer_image}
                            alt="Avatar Tailwind CSS Component"
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
                  <td>৳ {bid.bid_price}</td>
                  <td>
                    <span className="bg-orange-500 border border-orange-500 text-white rounded-2xl px-2 py-1 text-xs font-semibold">
                      {bid.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteBid(bid._id)}
                      className="text-green-500 border border-green-500 cursor-pointer hover:shadow-xl rounded-2xl px-2 py-1 text-xs font-semibold mr-2"
                    >
                      Remove Bid
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MyContainer>
    </div>
  );
};

export default MyBids;
