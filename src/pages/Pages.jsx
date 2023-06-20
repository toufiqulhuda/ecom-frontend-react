import React from "react"
import Home from "../components/MainPage/Home"
import FlashDeals from "../components/flashDeals/FlashDeals"
import TopCate from "../components/top/TopCate"
import NewArrivals from "../components/newarrivals/NewArrivals"
import Discount from "../components/discount/Discount"
import Shop from "../components/shops/Shop"
import Annocument from "../components/annocument/Annocument"
import Wrapper from "../components/wrapper/Wrapper"

const Pages = ({ productItems, addToCart, CartItem, shopItems, topCataItems, newArrivalsItems, discountItems , isLoading}) => {
  return (
    <>
      <Home CartItem={CartItem} isLoading={isLoading} />
      <FlashDeals productItems={productItems} addToCart={addToCart} isLoading={isLoading} />
      <TopCate topCataItems={topCataItems} isLoading={isLoading} />
      <NewArrivals  newArrivalsItems={newArrivalsItems} isLoading={isLoading}/>
      <Discount discountItems={discountItems} isLoading={isLoading}/>
      <Shop shopItems={shopItems} addToCart={addToCart} isLoading={isLoading} />
      <Annocument />
      <Wrapper />
    </>
  )
}

export default Pages
