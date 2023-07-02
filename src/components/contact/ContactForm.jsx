import React , {useState } from 'react'
import axios from "axios";
import { server } from "../../server";
import { ToastContainer,toast } from "react-toastify";

const ContactForm = ({token}) => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [desc, setDesc] = useState("");
  let [isDisabled, setDisabled] = useState(false);
let [Btn, setBtn] = useState("btn-primary");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true)
    setBtn("btn-secondary")
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      const response = await axios.post(`${server}/contact`,
          {
            "name": name, 
            "email": email, 
            "desc":desc
          },{headers: headers})
          if(response.status === 201){
            setName("")
            setDesc("")
            setEmail("")
            toast.success("Your message successfully Send",{position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"});
            setTimeout(() => { window.location.href = '/contact' }, 2000);
            
          }else{
            toast.error(response.data.message,{position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"});
            setBtn("btn-primary")
            setDisabled(false)
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
          setBtn("btn-primary")
          setDisabled(false)
    }
  }
  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        <div>
          <label htmlFor="desc" className="form-label">
            Description
          </label>
          <div className="mt-1 relative">
          <textarea 
          name="desc" 
          rows={4} cols={40}  
          defaultValue="Your message!" 
          onChange={(e) => setDesc(e.target.value)}
          required
          value={desc}
          className="form-control"/>
            
          </div>
        </div>
        <div>
          <button
            type="submit"
            style={{ cursor: "pointer", "margin-top": "5px" }}
            disabled={isDisabled}
            className={Btn}
          >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}

export default ContactForm