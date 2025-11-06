import React, { useContext, useEffect, useState } from "react";
import MyContainer from "../../components/MyContainer";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";
import AuthContext from "../../contexts/AuthContext";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const {user, loading} = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if(loading) return ;
    // fetch(`https://smart-deals-api-server-gamma.vercel.app`, {
    //   headers: {
    //     authorization : `Bearer ${user?.accessToken}`
    //   }
    // })
    //   .then((res) => res.json())
    axiosSecure.get(`/my-products?sellerEmail=${user?.email}`)
      .then((data) => {
        setProducts(data.data);
      });
  }, [user, loading, axiosSecure]);

  const handleDeleteProduct = (id) => {
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
        // fetch(`https://smart-deals-api-server-gamma.vercel.app/my-products/${id}`, {
        //   method: "DELETE"
        // })
        //   .then(res => res.json())
        axiosSecure.delete(`/my-products/${id}`)
          .then(data => {
            // console.log("delete", data);
            if(data.data.deletedCount){

              Swal.fire({
                title: "Deleted!",
                text: "Your Product has been deleted.",
                icon: "success",
              });
              
              const remainingProducts = products.filter(product => product._id !== id);
              setProducts(remainingProducts);
            }
          })
      }
    });
  };
  if(loading){
    return <Loading></Loading>
  }
  return (
    <div className="bg-gray-100">
  <MyContainer className="py-10">
    <h1 className="text-center mb-3">
      <span className="text-3xl font-bold bg-linear-to-r from-blue-500 to-orange-500 bg-clip-text text-transparent">
        My Product as A Seller{" "}
      </span>
      <span className="text-xs text-accent-content font-semibold block mt-1">
        {products.length} products found
      </span>
    </h1>

    {/* Desktop Table */}
    <div className="hidden md:block overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th>SL NO</th>
            <th>Image</th>
            <th>Title</th>
            <th>Seller Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id} className="hover:bg-gray-50">
              <td>{index + 1}</td>
              <td>
                <img
                  src={product.image}
                  className="w-16 h-12 object-cover border border-orange-500 rounded-xl"
                  alt=""
                />
              </td>
              <td className="font-medium">{product.title}</td>

              <td className="flex items-center gap-2 font-semibold text-accent">
                <img
                  src={product.seller_image}
                  alt=""
                  className="w-10 h-10 object-cover rounded-full"
                />
                <p>{product.seller_name}</p>
              </td>
              <td>{product.category}</td>
              <td>${product.price_min}</td>
              <td>
                <span className="badge badge-warning">{product.status}</span>
              </td>
              <td className="flex flex-wrap gap-2">
                <Link
                  to={`/update-product/${product._id}`}
                  className="border px-2 py-0.5 rounded-lg border-blue-600 text-blue-600 text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="border px-2 py-0.5 rounded-lg border-orange-600 text-orange-600 text-sm"
                >
                  Delete
                </button>
                <button className="border px-2 py-0.5 rounded-lg border-green-500 text-green-500 text-sm">
                  Make Sold
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Mobile Cards */}
    <div className="md:hidden space-y-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="flex gap-3 items-center">
            <img
              src={product.image}
              alt=""
              className="w-20 h-16 object-cover border border-orange-500 rounded-xl"
            />
            <div>
              <h3 className="font-bold text-lg">{product.title}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-sm font-semibold text-gray-700">
                ${product.price_min}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <img
              src={product.seller_image}
              alt=""
              className="w-8 h-8 rounded-full object-cover"
            />
            <p className="text-sm font-semibold">{product.seller_name}</p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="badge badge-warning text-xs">
              {product.status}
            </span>
            <div className="flex gap-2">
              <Link
                to={`/update-product/${product._id}`}
                className="border px-2 py-0.5 rounded-lg border-blue-600 text-blue-600 text-xs"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="border px-2 py-0.5 rounded-lg border-orange-600 text-orange-600 text-xs"
              >
                Delete
              </button>
              <button className="border px-2 py-0.5 rounded-lg border-green-500 text-green-500 text-xs">
                Sold
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </MyContainer>
</div>

  );
};

export default MyProducts;
