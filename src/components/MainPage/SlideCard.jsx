import React from "react"
// import Sdata from "./Sdata"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
// import { server } from "../../../src/server"
// import axios from "axios"
import Loader from "../Loader/Loader"

const SlideCard = ({sliderItems}) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: (dots) => {
      return <ul style={{ margin: "0px" }}>{dots}</ul>
    },
  }
  const imageWH = {
    width: "300px",
    height: "300px"
  }
  // const [SliderItems, setsliderItems] = useState([])
  // const sliderItemsList = async ()=>{
  //   return await axios.get(`${server}/product?section=slider`).then((res) => setsliderItems(res.data) )
  // }
  // useEffect(()=>{
  //   alert(isLoading)
  //   sliderItemsList()
  // },[SliderItems])
  return (
    <>
      <Slider {...settings}>
        {sliderItems.length > 0 ? 
        sliderItems.map((value, index) => {
          return (
            <>
              <div className='box d_flex top' key={index}>
                <div className='left'>
                  <h1>{value.name}</h1>
                  <p>{value.desc}</p>
                  <button className='btn-primary'>Visit Collections</button>
                </div>
                <div className='right'>
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

export default SlideCard
