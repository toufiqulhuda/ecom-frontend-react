import React from 'react'
import AddProductForm from "../components/addProduct/AddProductForm"

const AddProduct = ({token}) => {
  return (
    <div className='flash'>
      <div className='container'>
        <div className="box" style={{width: "50%", margin: "0 auto"}}>
          <div className="product mtop">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Entry Product
            </h2>
            <AddProductForm token={token}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProduct