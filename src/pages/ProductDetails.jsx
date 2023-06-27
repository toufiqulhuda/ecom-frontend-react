
import React from "react"
import {useParams} from "react-router-dom"
// import axios from "axios";
// import { server } from "../server";


const ProductDetails = ({productItems, addToCart, CartItem}) => {
    const {productId} = useParams()
    const thisProduct = productItems.find(item => item._id === productId)
    
    const imageWH = {
        "width": "500px",
        "height": "500px",
        "marginRight": "50px",
    }
    const currentHost = `${window.location.protocol}//${window.location.hostname}`;
    return (
      <div className="flash">
        <div className="container">
          <div className="">
            <div className="product mtop">
              <div className="box d_flex">
                <img src={currentHost+thisProduct.cover} alt="" style={imageWH} />
                <div className="product_details right">
                  <h2>{thisProduct.name}</h2>
                  <p>{thisProduct.desc}</p>
                  <div className="product-details">
                    <h3>{thisProduct.name}</h3>
                    <div className="rate">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </div>
                    <div className="price">
                      <h4>${thisProduct.price}.00 </h4>
                    </div>
                  </div>
                  <button
                    className="btn-primary"
                    onClick={() => addToCart(thisProduct)}
                  >
                    <i className="fa fa-plus"></i> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ProductDetails