import React, { useEffect } from 'react'
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from "../components/Login/Login.jsx";

const LoginPage = ({CartItem}) => {

  const navigate = useNavigate();
  const  isAuthenticated  = window.localStorage.getItem("isAuthenticated");
  // const { isAuthenticated } = true;

  useEffect(() => {
    if(isAuthenticated === true){
      navigate("/");
    }
  })
  
  return (
    <>
    <div className='flash'>
      <div className='container'>
      <div className="box" style={{width: "50%", margin: "0 auto"}}>
          <div className="product mtop">
          <Login />  
          </div>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default LoginPage;