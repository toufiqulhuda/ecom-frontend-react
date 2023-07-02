import React from 'react'
import ContactForm from '../components/contact/ContactForm'

const Contact = ({token}) => {
    return (
        <div className='flash'>
          <div className='container'>
            <div className="box" style={{width: "50%", margin: "0 auto"}}>
              <div className="product mtop">
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Contact with us
                </h2>
                <ContactForm token={token} />
              </div>
            </div>
          </div>
        </div>
      )
}

export default Contact