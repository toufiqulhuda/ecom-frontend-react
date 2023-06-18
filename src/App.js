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


function App() {
  const [shopItems, setshopItems] = useState([])
  const [productItems, setproductItems] = useState([])
  // const [topCataItems, settopCataItems] = useState([])
  // const [newArrivalsItems, setnewArrivalsItems] = useState([])
  // const [discountItems, setdiscountItems] = useState([])

  /* Shop Items call API */
  const shopItemsList = ()=>{
    return axios.get(`${server}/product?section=shops`).then((res) => setshopItems(res.data) ).catch(err => console.log(err))
  }
   /* Product Items call API */
  const productItemsList = ()=>{
    return axios.get(`${server}/product?section=flash_deals`).then((res) => setproductItems(res.data) ).catch(err => console.log(err))
  }
  /*
   const topCataItemsList = ()=>{
    return axios.get(`${server}/product?section=top_categories`).then((res) => settopCataItems(res.data) )
  }

  const newArrivalsItemsList = ()=>{
    return axios.get(`${server}/product?section=new_arrivals`).then((res) => setnewArrivalsItems(res.data) )
  }

  const discountItemsList = ()=>{
    return axios.get(`${server}/product?section=discounts`).then((res) => setdiscountItems(res.data) )
  }*/
  useEffect(()=>{
    shopItemsList()
    productItemsList()
    // topCataItemsList()
    // newArrivalsItemsList()
    // discountItemsList()
  }, [])
 

  const  isAuthenticated  = window.localStorage.getItem("isAuthenticated");
  const  token  = window.localStorage.getItem("token");
  //Step 1 :

// const {productItems} = Data
  //Step 2 :
  const [CartItem, setCartItem] = useState([])

  //Step 4 :
  const addToCart = (product) => {
    // if hamro product alredy cart xa bhane  find garna help garxa
    const productExit = CartItem.find((item) => item.id === product.id)
    if (productExit) {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty + 1 } : item)))
    } else {
      setCartItem([...CartItem, { ...product, qty: 1 }])
    }
  }

  // Stpe: 6
  const decreaseQty = (product) => {
      const productExit = CartItem.find((item) => item.id === product.id)
      if (productExit.qty === 1) {
        setCartItem(CartItem.filter((item) => item.id !== product.id))
      } else {
        setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty - 1 } : item)))
      }
  }

  return (
    <>
      <Router>
        <Header CartItem={CartItem} />
        <Routes>
          <Route path='/' exact element={<Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems}  />} /> {/* topCataItems={topCataItems} newArrivalsItems={newArrivalsItems} discountItems={discountItems}*/}
          <Route path='/shop' exact element={ <Shop addToCart={addToCart} shopItems={shopItems}/>}/>
          <Route path='/user' exact element={ <Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />}/>
          <Route path='/cart' exact element={<Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />}/>
          <Route path='/login' exact element={!isAuthenticated ? <LoginPage CartItem={CartItem} /> : <Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />}/>
          <Route path='/register' exact element={<SignupPage CartItem={CartItem} />}/>
          <Route path='/add-product' exact element={isAuthenticated ? <AddProduct CartItem={CartItem} token={token} /> : <LoginPage CartItem={CartItem} />}/>
          
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
