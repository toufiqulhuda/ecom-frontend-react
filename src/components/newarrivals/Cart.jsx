import React from "react"
import Loader from "../Loader/Loader"
// import Ndata from "./Ndata"
const imageWH = {
  width: "167px",
  height: "167px"
}
const Cart = ({newArrivalsItems}) => {
  return (
    <>
      <div className='content grid product'>
        { newArrivalsItems.lenght > 0 ?
        newArrivalsItems.map((val, index) => {
          return (
            <div className='box' key={index}>
              <div className='img'>
                <img src={val.cover} alt='' style={imageWH} />
              </div>
              <h4>{val.name}</h4>
              <span>${val.price}</span>
            </div>
          )
        }) : <Loader/>}
      </div>
    </>
  )
}

export default Cart
