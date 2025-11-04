import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router";
import MyContainer from "../../components/MyContainer";
import Swal from "sweetalert2";
import { IoMdArrowRoundBack } from "react-icons/io";
import AuthContext from "../../contexts/AuthContext";

const ProductDetails = () => {
  const [bids, setBids] = useState([]);
  const { user } = useContext(AuthContext);
  const {
    _id: productId,
    title,
    price_min,
    price_max,
    email,
    category,
    created_at,
    image,
    status,
    location,
    seller_image,
    seller_name,
    condition,
    usage,
    description,
    seller_contact,
  } = useLoaderData();

  const bidModalRef = useRef(null);
  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };

  const handlePostBid = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const price = parseInt(e.target.price.value);
    const contact = e.target.contact.value;
    // console.log({name, email, price, contact})
    const newBid = {
      product: productId,
      buyer_image:
        "https://i.ibb.co.com/LdY05dfY/Screenshot-2022-09-30-14-12-01-310-com-mxtech-videoplayer-ad-01.jpg",
      buyer_name: name,
      buyer_contact: contact,
      buyer_email: email,
      bid_price: price,
      status: "pending",
    };

    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("after post bid", data);
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your bid has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          newBid._id = data.insertedId;
          const newBids = [...bids, newBid];
          const sortedBids = newBids.sort((a, b) => b.bid_price - a.bid_price);
          setBids(sortedBids);
        }
      });
  };

  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${productId}`)
      .then((res) => res.json())
      .then((data) => setBids(data));
  }, [productId]);

  return (
    <div className="bg-gray-100">
      <MyContainer className={`flex gap-8 py-10`}>
        <div className="w-[40%]">
          <img src={image} alt={title} className="w-full h-80 object-cover" />
          <div className="bg-white p-4 mt-4 rounded-2xl shadow">
            <h1 className="py-4 text-2xl font-bold text-accent">
              Product Description
            </h1>
            <div className="mt-10 mb-5 font-semibold text-lg flex items-center justify-between">
              <p>
                <span className="bg-linear-to-r from-blue-500 to-orange-500 bg-clip-text text-transparent">
                  Condition:
                </span>{" "}
                {condition}
              </p>
              <p>
                <span className="bg-linear-to-r from-blue-500 to-orange-500 bg-clip-text text-transparent">
                  Usage Time:
                </span>{" "}
                {usage}
              </p>
            </div>
            <div className="w-full h-0.5 bg-black/50 mb-4"></div>
            <p>{description}</p>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <Link
              to={`/all-products`}
              className="cursor-pointer flex items-center gap-2"
            >
              <IoMdArrowRoundBack />
              Back To Products
            </Link>
            <Link
              to={`/update-product/${productId}`}
              className="border px-2 py-0.5 rounded-lg border-blue-600 text-blue-600 cursor-pointer"
            >
              Edit
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-accent my-2">{title}</h1>
          <div className="bg-green-100 text-green-500 inline px-2 py-1">
            {category}
          </div>
          <div className="bg-white p-4 mt-4 rounded-2xl shadow">
            <p className="text-green-600 text-2xl font-bold">
              ৳ {price_min} - {price_max}
            </p>
            <p>Price starts from</p>
          </div>
          <div className="bg-white p-4 mt-4 rounded-2xl shadow">
            <h1 className="pb-3 text-2xl font-bold text-accent">
              Product Details
            </h1>
            <p>
              <span className="font-semibold">Product ID: </span>
              {productId}
            </p>
            <p>
              <span className="font-semibold">Posted: </span>
              {created_at.slice(0, 10)}
            </p>
          </div>
          <div className="bg-white p-4 mt-4 rounded-2xl shadow flex flex-col gap-2">
            <h1 className="pb-3 text-2xl font-bold text-accent">
              Seller Information
            </h1>
            <div className="flex items-center gap-4">
              <img
                src={seller_image}
                alt={seller_name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{seller_name}</p>
                <p>{email}</p>
              </div>
            </div>
            <p>
              <span className="font-semibold">Location: </span>
              {location}
            </p>
            <p>
              <span className="font-semibold">Contact: </span>
              {seller_contact}
            </p>
            <p>
              <span className="font-semibold">Status: </span>
              <span className="badge badge-warning rounded-full">{status}</span>
            </p>
          </div>
          <button
            onClick={handleBidModalOpen}
            className="btn btn-primary mt-2 w-full"
          >
            I want Buy This Product
          </button>
        </div>

        {/* BidModal  */}
        <dialog
          ref={bidModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h1 className="text-xl text-accent font-semibold mb-2">
              Give Seller Your Offered Price
            </h1>
            <form onSubmit={handlePostBid}>
              <fieldset className="fieldset">
                <div className="flex gap-3">
                  <div>
                    <label className="label">Name</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={user?.displayName}
                      className="input"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <label className="label">Email</label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={user?.email}
                      className="input"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <label className="label">Place your Price</label>
                <input
                  type="text"
                  name="price"
                  className="input"
                  placeholder="Place Your Price"
                />
                <label className="label">Contact Info</label>
                <input
                  type="text"
                  name="contact"
                  className="input"
                  placeholder="+880179678586"
                />

                <button className="btn btn-primary mt-4">Submit Bid</button>
              </fieldset>
            </form>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Cencel</button>
              </form>
            </div>
          </div>
        </dialog>
      </MyContainer>

      <MyContainer>
        <h1 className="text-3xl font-bold text-accent">
          {" "}
          Bids For This Products:{" "}
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
                <th>
                  <label>SL No</label>
                </th>
                <th>Product</th>
                <th>Seller</th>
                <th>Bid Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {bids.map((bid, index) => (
                <tr key={bid._id}>
                  <th>
                    <label>{index + 1}</label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{title}</div>
                        <div className="text-sm opacity-50">
                          ৳ {price_min} - {price_max}
                        </div>
                      </div>
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
                    <span className="text-green-500 border border-green-500 rounded-2xl px-2 py-1 text-xs font-semibold mr-2">
                      Accept Offer
                    </span>
                    <span className="text-orange-500 border border-orange-500 rounded-2xl px-2 py-1 text-xs font-semibold">
                      Reject Offer
                    </span>
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

export default ProductDetails;
