import React from "react"
import Categories from "./Categories"
import "./Home.css"
import SliderHome from "./Slider"

const Home = ({sliderItems}) => {
  return (
    <>
      <section className='home'>
        <div className='container d_flex'>
          <Categories />
          <SliderHome  sliderItems={sliderItems} />
        </div>
      </section>
    </>
  )
}

export default Home
