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


function App() {
  const getLocalCartItem = () =>{
    let localStore = localStorage.getItem("CartItem")
    if(localStore===null){
      return []
    }else{
      return JSON.parse(localStore)
    }
  }
  const [isLoading, setLoading] = useState(true)
  const [CartItem, setCartItem] = useState(getLocalCartItem())
  
  const [shopItems, setshopItems] = useState([])
  const [productItems, setproductItems] = useState([])
  const [topCataItems, settopCataItems] = useState([])
  const [newArrivalsItems, setnewArrivalsItems] = useState([])
  const [discountItems, setdiscountItems] = useState([])


  /* Shop Items call API */
  const shopItemsList =async()=>{
    return await axios.get(`${server}/product?section=shops`).then((res) => setshopItems(res.data) ).catch(err => console.log(err))
  }
   /* Product Items call API */
  const productItemsList = async()=>{
    return await axios.get(`${server}/product?section=flash_deals`).then((res) => setproductItems(res.data) ).catch(err => console.log(err))
  }
  
   const topCataItemsList = async()=>{
    return await axios.get(`${server}/product?section=top_categories`).then((res) => settopCataItems(res.data) ).catch(err => console.log(err))
  }

  const newArrivalsItemsList = async()=>{
    return await axios.get(`${server}/product?section=new_arrivals`).then((res) => setnewArrivalsItems(res.data) ).catch(err => console.log(err))
  }

  const discountItemsList = async ()=>{
    return await axios.get(`${server}/product?section=discounts`).then((res) => setdiscountItems(res.data) ).catch(err => console.log(err))
  }
  // setCartItem(getLocalCartItem)
  useEffect(()=>{
    shopItemsList()
    productItemsList()
    topCataItemsList()
    newArrivalsItemsList()
    discountItemsList()
      localStorage.setItem("CartItem",JSON.stringify(CartItem))
      setLoading(false)
  }, [CartItem])
 

  const  isAuthenticated  = window.localStorage.getItem("isAuthenticated");
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
    toast.success("A new product has been added to your cart")
  }

  // Stpe: 6
  const decreaseQty = (product) => {
      const productExit = CartItem.find((item) => item._id === product._id)
      if (productExit.qty === 1) {
        setCartItem(CartItem.filter((item) => item._id !== product._id))
      } else {
        setCartItem(CartItem.map((item) => (item._id === product._id ? { ...productExit, qty: productExit.qty - 1 } : item)))
      }
      toast.error("A product has been deleted from your cart")
  }
  
  return (
    <>
      <Router>
        <Header CartItem={CartItem} />
        <Routes>
          <Route path='/' exact element={<Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} topCataItems={topCataItems} newArrivalsItems={newArrivalsItems} discountItems={discountItems} isLoading={isLoading}/>} /> 
          <Route path='/shop' exact element={ <Shop addToCart={addToCart} shopItems={shopItems}/>}/>
          <Route path='/user' exact element={ <Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />}/>
          <Route path='/cart' exact element={<Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />}/>
          <Route path='/login' exact element={!isAuthenticated ? <LoginPage CartItem={CartItem} /> : <Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} topCataItems={topCataItems} newArrivalsItems={newArrivalsItems} discountItems={discountItems} isLoading={isLoading} />}/>
          <Route path='/register' exact element={<SignupPage CartItem={CartItem} />}/>
          <Route path='/add-product' exact element={isAuthenticated ? <AddProduct CartItem={CartItem} token={token} /> : <LoginPage CartItem={CartItem} />}/>
          <Route path='/product/:productId' exact element={<ProductDetails productItems={productItems} CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty}  /> }/>
          <Route path='*' exact element={<Page404/>} />
        </Routes>
        <Footer /><ToastContainer/>
      </Router>
    </>
  )
}

export default App
