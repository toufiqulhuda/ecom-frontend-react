import React from "react"
import SlideCard from "./SlideCard"


const SliderHome = ({sliderItems}) => {
  return (
    <>
      <section className='homeSlide contentWidth'>
        <div className='container'>
          <SlideCard sliderItems={sliderItems}/>
        </div>
      </section>
    </>
  )
}

export default SliderHome
