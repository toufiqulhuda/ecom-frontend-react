import React from "react"
import Categories from "./Categories"
import "./Home.css"
import SliderHome from "./Slider"

const Home = ({isLoading}) => {
  return (
    <>
      <section className='home'>
        <div className='container d_flex'>
          <Categories />
          <SliderHome isLoading={isLoading} />
        </div>
      </section>
    </>
  )
}

export default Home
