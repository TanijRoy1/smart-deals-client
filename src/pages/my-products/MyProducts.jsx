import React, { useEffect, useState } from "react";
import MyContainer from "../../components/MyContainer";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/my-products?sellerEmail=tanijroy@roy.com")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

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
        fetch(`http://localhost:3000/products/${id}`, {
          method: "DELETE"
        })
          .then(res => res.json())
          .then(data => {
            // console.log("delete", data);
            if(data.deletedCount){

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
      <MyContainer className={`py-10`}>
        <h1 className=" text-center mb-3">
          <span className="text-3xl font-bold bg-linear-to-r from-blue-500 to-orange-500 bg-clip-text text-transparent">My Product as A Seller{" "}</span>
          <span className="text-xs text-accent-content font-semibold">
            {products.length} products found
          </span>
        </h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
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
              {/* row 1 */}
              {products.map((product, index) => (
                <tr key={product._id}>
                  <th>{index + 1}</th>
                  <td>
                    <img
                      src={product.image}
                      className="w-15 h-11 object-cover border border-orange-500 rounded-xl"
                      alt=""
                    />
                  </td>
                  <td>{product.title}</td>

                  <td className="flex gap-2 items-center font-semibold text-accent">
                    <img
                      src={product.seller_image}
                      alt=""
                      className="w-10 h-10 object-cover rounded-full"
                    />
                    <p>{product.seller_name}</p>
                  </td>
                  <td>{product.category}</td>
                  <td>{product.price_min}</td>
                  <td>
                    <span className="badge badge-warning">
                      {product.status}
                    </span>
                  </td>
                  <td className="flex gap-1.5">
                    <button className="border px-2 py-0.5 rounded-lg border-blue-600 text-blue-600 cursor-pointer">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="border px-2 py-0.5 rounded-lg border-orange-600 text-orange-600 cursor-pointer"
                    >
                      Delete
                    </button>
                    <button className="border px-2 py-0.5 rounded-lg border-green-500 text-green-500 cursor-pointer">
                      Make Sold
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

export default MyProducts;
