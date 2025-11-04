import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import MyContainer from "./MyContainer";
import AuthContext from "../contexts/AuthContext";

const Header = () => {
  const {user, setUser, signOutUser} = useContext(AuthContext);

  const handleSignOutUser = () => {
    signOutUser()
     .then(() => {
      setUser(null);
     })
     .catch(err => console.log(err))
  }

  const links = (
    <>
      <li>
        <NavLink to="/" className="myNavLink">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-products" className="myNavLink">All Products</NavLink>
      </li>
      <li>
        <NavLink to="/my-products" className="myNavLink">My Products</NavLink>
      </li>
      <li>
        <NavLink to="/my-bids" className="myNavLink">My Bids</NavLink>
      </li>
      <li>
        <NavLink to="/create-product" className="myNavLink">Create Product</NavLink>
      </li>
    </>
  );
  return (
    <MyContainer>
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="text-3xl font-black text-[#001931]">Smart<span className="bg-clip-text text-transparent bg-linear-to-r from-[#632EE3] to-[#9F62F2]">Deals</span></a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {
            user ? <div className="flex items-center gap-2">
              <img src={user?.photoURL} className="w-11 h-11 rounded-full border-orange-500 border-2" alt="" />
              <button onClick={handleSignOutUser} className="btn btn-primary">SignOut</button>
            </div>
            :
          <div className="flex items-center gap-2">
            <Link to={`/auth/login`} className="btn btn-outline border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 transition-all duration-300">Login</Link>
          <Link to={`/auth/register`} className="btn btn-primary">Register</Link>
          </div>
          }
        </div>
      </div>
    </MyContainer>
  );
};

export default Header;
