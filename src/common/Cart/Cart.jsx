
import React from "react"
import "./style.css"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { server } from "../../server";
// import { useInsertionEffect } from "react"
// import { ToastContainer,toast } from "react-toastify";
// const isCart = true;
const Cart = ({ CartItem, addToCart, decreaseQty, isAuthenticated }) => {
// const [checkOutBtn, setCheckOutBtn] = useState(false)
  const navigate = useNavigate();
  const totalPrice = CartItem.reduce((price, item) => price + item.qty * item.price, 0)

  const PostOrder = async (userId,token,items,bill)=>{
    try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    const response = await axios.post(`${server}/order/648cb873d37c96fb4eba284a`,
    {
      items,
      bill
    },{headers: headers}
    )
    if(response.status === 201){
      toast.success(`#${response.data._id} Order place successfully`,{position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"});
    }
  } catch (error) {
    toast.error(error.response.data.message,{position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"});
  }
  }
  // useEffect(()=>{
    
  //   handleClick()
  //   setCheckOutBtn(false)
  // })
  const handleClick = ()=>{
    const localStore = JSON.parse(localStorage.getItem("CartItem"))
    const userId = window.localStorage.getItem("userId")
    const  token  = window.localStorage.getItem("token");
    
    if(isAuthenticated === "true"){
      if( Object.keys(localStore).length === 0){
        toast.error("No Items are add in Cart",{position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"});
      }else{
        let localData = localStore.map(({_id,name,qty,price}) => ({
          productId: _id,
          name,
          quantity:qty,
          price:parseInt(price)}))
        PostOrder(userId,token,localData,totalPrice)
        // return
        localStorage.setItem("CartItem", JSON.stringify([]));
        // localStorage.removeItem('CartItem');
        // toast.success("Order place successfully",{position: "bottom-right",
        // autoClose: 1000,
        // hideProgressBar: false,
        // closeOnClick: true,
        // pauseOnHover: true,
        // draggable: true,
        // progress: undefined,
        // theme: "light"});
        setTimeout(() => {
          window.location.reload()
        }, 2000);
        // isCart = false;
      }
    }else{
      toast.error("Sorry! you have to login first",{position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"});
      setInterval(() => {
        navigate("/login");
      }, 2000);
    }
  }
  // const checkoutDesable ={"display": "none"}

  // prodcut qty total
  return (
    <>
      <section className='cart-items'>
        <div className='container d_flex'>
          

          <div className='cart-details'>
            {CartItem.length === 0 && <h1 className='no-items product'>No Items are add in Cart</h1>}
            {CartItem.map((item) => {
              const productQty = item.price * item.qty
              return (
                <div className='cart-list product d_flex' key={item._id}>
                  <div className='img'>
                    <img src={item.cover} alt='' />
                  </div>
                  <div className='cart-details'>
                    <h3>{item.name}</h3>
                    <h4>
                      ${item.price}.00 x {item.qty}
                      <span>${productQty}.00</span>
                    </h4>
                  </div>
                  <div className='cart-items-function'>
                    <div className='removeCart'>
                      <button className='removeCart'>
                        <i className='fa-solid fa-xmark'></i>
                      </button>
                    </div>
                    
                    <div className='cartControl d_flex'>
                      <button className='incCart' onClick={() => {addToCart(item); }}>
                        <i className='fa-solid fa-plus'></i>
                      </button>
                      {item.qty}
                                           
                      <button className='desCart' onClick={() => {decreaseQty(item); }}>
                        <i className='fa-solid fa-minus'></i>
                      </button>
                    </div>
                 </div>

                  <div className='cart-item-price'></div>
                </div>
              )
            })}
          </div>

          <div className='cart-total product'>
            <h2>Order Summary</h2>
            <div className=' d_flex'>
              <h4>Total Price :</h4>
              <h3>${totalPrice}.00</h3>
            </div>
            <h2></h2>
            <button className="btn-primary" style={{"width":"100%"}} onClick={()=>{handleClick()} }>Checkout</button>
          </div>
          
        </div>
      </section>
    </>
  )
}

export default Cart
