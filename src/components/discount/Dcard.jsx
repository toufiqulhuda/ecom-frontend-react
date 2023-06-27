import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
// import Ddata from "./Ddata"
import "../newarrivals/style.css"
import Loader from "../Loader/Loader"

const Dcard = ({discountItems}) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
  }
  const imageWH = {
    width: "139px",
    height: "139px"
  }
  return (
    <>
      <Slider {...settings}>
        {discountItems.length > 0 ?
        discountItems.map((value, index) => {
          return (
            <>
              <div className='box product' key={index}>
                <div className='img'>
                  <img src={value.cover} alt='' style={imageWH} />
                </div>
                <h4>{value.name}</h4>
                <span>${value.price}</span>
              </div>
            </>
          )
        }): <Loader/>}
      </Slider>
    </>
  )
}

export default Dcard
