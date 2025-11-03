import React from "react";
import { Link } from "react-router";
import MyContainer from "../../components/MyContainer";
import Swal from "sweetalert2";
import { IoMdArrowRoundBack } from "react-icons/io";

const CreateProduct = () => {
  const handleCreateProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      title: e.target.title.value,
      price_min: parseInt(e.target.priceMin.value),
      price_max: parseInt(e.target.priceMax.value),
      email: e.target.sellerEmail.value,
      category: e.target.category.value,
      image: e.target.productImg.value,
      location: e.target.location.value,
      seller_image: e.target.sellerImg.value,
      seller_name: e.target.sellerName.value,
      condition: e.target.condition.value,
      usage: e.target.usage.value,
      description: e.target.description.value,
      seller_contact: e.target.sellerContact.value,
      status: "pending",
      created_at: new Date(),
    };
    // console.log(newProduct);
    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if(data.insertedId){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your Product has been created",
                showConfirmButton: false,
                timer: 1500,
            });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-gray-100">
      <MyContainer className={`py-10`}>
        <div className="text-center">
          <Link to={`/all-products`} className="text-center flex justify-center items-center gap-2"><IoMdArrowRoundBack />Back to Products</Link>
        </div>
        <h1 className="text-center text-3xl font-bold mt-4">
          Create{" "}
          <span className="bg-linear-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
            A Product
          </span>
        </h1>

        <form
          onSubmit={handleCreateProduct}
          className="border border-gray-300 rounded-2xl shadow-2xl bg-white max-w-2xl mx-auto p-4 mt-5"
        >
          <div className="flex gap-4">
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Title</legend>
              <input
                type="text"
                className="input"
                name="title"
                placeholder="e.g. Yamaha Fz Guitar for Sale"
              />
            </fieldset>
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Category</legend>
              <select
                defaultValue="Pick a browser"
                name="category"
                className="select"
              >
                <option value="" disabled={true}>
                  Choose a category
                </option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Vehicles">Vehicles</option>
              </select>
            </fieldset>
          </div>
          <div className="flex gap-4">
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">
                Min Price You want to Sale ($)
              </legend>
              <input
                type="text"
                className="input"
                name="priceMin"
                placeholder="e.g. 18.5"
              />
            </fieldset>
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">
                Max Price You want to Sale ($)
              </legend>
              <input
                type="text"
                className="input"
                name="priceMax"
                placeholder="Optional (default = Min Price)"
              />
            </fieldset>
          </div>
          <div className="flex gap-4">
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Product Condition</legend>
              <div className="flex gap-5">
                <div className="flex gap-3">
                  <input
                    type="radio"
                    name="condition"
                    value="Brand New"
                    className="radio radio-primary"
                    defaultChecked
                  />
                  <p>Brand New</p>
                </div>
                <div className="flex gap-3">
                  <input
                    type="radio"
                    name="condition"
                    value="Used"
                    className="radio radio-primary"
                  />
                  <p>Used</p>
                </div>
              </div>
            </fieldset>
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Product Usage time</legend>
              <input
                type="text"
                className="input"
                name="usage"
                placeholder="e.g. 1 year 3 month "
              />
            </fieldset>
          </div>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Your Product Image URL</legend>
            <input
              type="text"
              name="productImg"
              className="input w-full"
              placeholder="https://..."
            />
          </fieldset>

          <div className="flex gap-4">
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Seller Name</legend>
              <input
                type="text"
                className="input"
                name="sellerName"
                placeholder="e.g. Artisan Roasters"
              />
            </fieldset>
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Seller Email</legend>
              <input
                type="text"
                className="input"
                name="sellerEmail"
                placeholder="leli31955@nrlord.com"
              />
            </fieldset>
          </div>
          <div className="flex gap-4">
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Seller Contact</legend>
              <input
                type="text"
                className="input"
                name="sellerContact"
                placeholder="e.g. +1-555-1234"
              />
            </fieldset>
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Seller Image URL</legend>
              <input
                type="text"
                className="input"
                name="sellerImg"
                placeholder="https://..."
              />
            </fieldset>
          </div>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Location</legend>
            <input
              type="text"
              name="location"
              className="input w-full"
              placeholder="City, Country"
            />
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">
              Simple Description about your Product
            </legend>
            <textarea
              name="description"
              className="textarea h-24 w-full"
              placeholder="e.g. I bought this product 3 month ago. did not used more than 1/2 time. actually learning
 guitar is so tough..... "
            ></textarea>
          </fieldset>
          <button type="submit" className="btn btn-primary w-full mt-3">
            Create Product
          </button>
        </form>
      </MyContainer>
    </div>
  );
};

export default CreateProduct;
