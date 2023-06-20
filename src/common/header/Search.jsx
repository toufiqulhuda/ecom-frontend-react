import React from "react"
import logo from "../../components/assets/images/logo.png"
// import logo1 from "../../components/assets/images/logo.svg"
import { Link } from "react-router-dom"
import { ToastContainer,toast } from "react-toastify";

const Search = ({ CartItem }) => {
  // fixed Header
  const  isAuthenticated  = window.localStorage.getItem("isAuthenticated");
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search")
    search.classList.toggle("active", window.scrollY > 100)
  })
  const logout = () => {
    localStorage.clear(); 
    sessionStorage.clear();
    toast.success("You've been signed out!");
    setTimeout(() => { window.location.href = '/' }, 2000);
    
  };

  return (
    <>
      <section className="search">
        <div className="container c_flex">
          <div className="logo width ">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
            {/* <Link to="/"> <img src={logo1} alt=''  /></Link> */}
          </div>

          <div className="search-box f_flex">
            <i className="fa fa-search"></i>
            <input type="text" placeholder="Search and hit enter..." />
            <span className="btn-success">All Category</span>
          </div>

          <div className="icon f_flex width">
            {isAuthenticated ? (
              <Link to="" onClickCapture={logout}>
                <i className="fa fa-lock icon-circle"></i>
              </Link>
            ) : (
              <Link to="/login">
                <i className="fa fa-user icon-circle"></i>
              </Link>
            )}

            <div className="cart">
              <Link to="/cart">
                <i className="fa fa-shopping-cart icon-circle"></i>
                <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
              </Link>
              <ToastContainer />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Search
