import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Loader from "../Loader/Loader"
// import Tdata from "./Tdata"

const TopCart = ({topCataItems}) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
  }
  const imageWH = {
    width: "345px",
    height: "116px"
  }
  return (
    <>
      <Slider {...settings}>
        { topCataItems.length > 0 ?
        topCataItems.map((value, index) => {
          return (
            <>
              <div className='box product' key={index}>
                <div className='nametop d_flex'>
                  <span className='tleft'>{value.name}</span>
                  <span className='tright'>{value.desc}</span>
                </div>
                <div className='img'>
                  <img src={value.cover} alt='' style={imageWH} />
                </div>
              </div>
            </>
          )
        }) : <Loader/>}
      </Slider>
    </>
  )
}

export default TopCart
