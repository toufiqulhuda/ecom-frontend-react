import React, {  useState,useEffect } from "react"
import "./App.css"
import { BrowserRouter as Router, Routes , Route } from "react-router-dom"
import Header from "./common/header/Header"
import Pages from "./pages/Pages"
import AddProduct from "./pages/AddProduct"
import LoginPage from "./pages/Login"
// import Data from "./components/Data"
import Cart from "./common/Cart/Cart"
import Footer from "./common/footer/Footer"
// import Sdata from "./components/shops/Sdata"
import Shop  from "./components/shops/Shop"
import SignupPage from "./pages/SignupPage"

import axios from "axios";
import { server } from "./server";
// const Sdata = require("./components/shops/Sdata")
import 'react-toastify/dist/ReactToastify.css';
import ProductDetails from "./pages/ProductDetails"
import Page404 from "./pages/Page404"
import { ToastContainer,toast } from "react-toastify";
import Contact from "./pages/Contact"


function App() {
  const getLocalCartItem = () =>{
    let localStore = localStorage.getItem("CartItem")
    if(localStore===null){
      return []
    }else{
      return JSON.parse(localStore)
    }
  }
  
  const [CartItem, setCartItem] = useState(getLocalCartItem())
  // const [isAuthenticated, setisAuthenticated] = useState(getisAuthenticated())
  
  const [shopItems, setshopItems] = useState([])
  const [productItems, setproductItems] = useState([])
  const [topCataItems, settopCataItems] = useState([])
  const [newArrivalsItems, setnewArrivalsItems] = useState([])
  const [discountItems, setdiscountItems] = useState([])
  const [sliderItems, setsliderItems] = useState([])


  /* Shop Items call API */
  const shopItemsList =async()=>{
    return await axios.get(`${server}/product?section=shops`).then((res) => setshopItems(res.data) ).catch((err) => console.log(err)).finally(()=>{})
  }
   /* Product Items call API */
  const productItemsList = async()=>{
    return await axios.get(`${server}/product?section=flash_deals`).then((res) => setproductItems(res.data) ).catch((err) => console.log(err)).finally(()=>{})
  }
  
   const topCataItemsList = async()=>{
    return await axios.get(`${server}/product?section=top_categories`).then((res) => settopCataItems(res.data) ).catch((err) => console.log(err)).finally(()=>{})
  }

  const newArrivalsItemsList = async()=>{
    return await axios.get(`${server}/product?section=new_arrivals`).then((res) => setnewArrivalsItems(res.data) ).catch((err) => console.log(err)).finally(()=>{})
  }

  const discountItemsList = async ()=>{
    return await axios.get(`${server}/product?section=discounts`).then((res) => setdiscountItems(res.data) ).catch((err) => console.log(err)).finally(()=>{})
  }
  const sliderItemsList = async ()=>{
    return await axios.get(`${server}/product?section=slider`).then((res) => setsliderItems(res.data) ).catch((err) => console.log(err)).finally(()=>{})
  }
  // setCartItem(getLocalCartItem)
  useEffect(()=>{
    sliderItemsList()
    productItemsList()
    topCataItemsList()
    newArrivalsItemsList()
    discountItemsList()
    shopItemsList()
      localStorage.setItem("CartItem",JSON.stringify(CartItem))
      // setLoading(false)
  }, [CartItem])
 

  const  isAuthenticated   = window.localStorage.getItem("isAuthenticated");
  const  token  = window.localStorage.getItem("token");
  //Step 1 :

// const {productItems} = Data
  //Step 2 :
  
  

  //Step 4 :
  const addToCart = (product) => {
    const productExit = CartItem.find((item) => item._id === product._id)
    if (productExit) {
      setCartItem(CartItem.map((item) => (item._id === product._id ? { ...productExit, qty: productExit.qty + 1 } : item)))
    } else {
      setCartItem([...CartItem, { ...product, qty: 1 }])
    }
    toast.success("A new product has been added to your cart",{position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"})
  }

  // Stpe: 6
  const decreaseQty = (product) => {
      const productExit = CartItem.find((item) => item._id === product._id)
      if (productExit.qty === 1) {
        setCartItem(CartItem.filter((item) => item._id !== product._id))
      } else {
        setCartItem(CartItem.map((item) => (item._id === product._id ? { ...productExit, qty: productExit.qty - 1 } : item)))
      }
      toast.error("A product has been deleted from your cart",{position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"})
  }
  
  return (
    <>
      <Router>
        <Header CartItem={CartItem} />
        <Routes>
          <Route path='/' exact element={<Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} topCataItems={topCataItems} newArrivalsItems={newArrivalsItems} discountItems={discountItems} sliderItems={sliderItems}/>} /> 
          <Route path='/shop' exact element={ <Shop addToCart={addToCart} shopItems={shopItems}/>}/>
          <Route path='/user' exact element={ <Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} isAuthenticated={isAuthenticated} />}/>
          <Route path='/cart' exact element={<Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} isAuthenticated={isAuthenticated} />}/>
          <Route path='/login' exact element={<LoginPage CartItem={CartItem} /> }/>
          <Route path='/register' exact element={<SignupPage CartItem={CartItem} />}/>
          <Route path='/add-product' exact element={isAuthenticated ? <AddProduct CartItem={CartItem} token={token} /> : <LoginPage CartItem={CartItem} />}/>
          <Route path='/product/:productId' exact element={<ProductDetails productItems={productItems} CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty}  /> }/>
          <Route path='/contact' exact element={isAuthenticated ?<Contact CartItem={CartItem} token={token}/>:<LoginPage CartItem={CartItem} />} />
          <Route path='*' exact element={<Page404/>} />
        </Routes>
        <Footer /><ToastContainer/>
      </Router>
    </>
  )
}

export default App
