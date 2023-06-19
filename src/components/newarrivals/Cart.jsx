import React from "react"
// import Ndata from "./Ndata"
const imageWH = {
  width: "167px",
  height: "167px"
}
const Cart = ({newArrivalsItems}) => {
  return (
    <>
      <div className='content grid product'>
        {newArrivalsItems.map((val, index) => {
          return (
            <div className='box' key={index}>
              <div className='img'>
                <img src={val.cover} alt='' style={imageWH} />
              </div>
              <h4>{val.name}</h4>
              <span>${val.price}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Cart
