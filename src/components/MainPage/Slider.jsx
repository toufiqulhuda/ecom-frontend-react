import React from "react"
import SlideCard from "./SlideCard"


const SliderHome = ({isLoading}) => {
  return (
    <>
      <section className='homeSlide contentWidth'>
        <div className='container'>
          <SlideCard isLoading={isLoading}/>
        </div>
      </section>
    </>
  )
}

export default SliderHome
