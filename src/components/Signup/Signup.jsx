import { React, useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../styles/styles";
import { useNavigate, Link } from "react-router-dom";
// import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { ToastContainer,toast } from "react-toastify";

const Singup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [Btn, setBtn] = useState("btn-primary");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true)
    setBtn("btn-secondary")
    // const config = { headers: { "Content-Type": "multipart/form-data" } };

    const newForm = new FormData(e.target);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);
    try {
    const response = await axios.post(`${server}/auth/signup`,
          {
            "username": newForm.get("name"),
            "email": newForm.get("email"), 
            "password": newForm.get("password")
          });
          if(response.status === 200){
            // window.localStorage.setItem("token",response.data.token)
            // window.localStorage.setItem("userid",response.data.user._id)
            // window.localStorage.setItem("isAuthenticated",true)
            setEmail("")
            setName("")
            setPassword("")
            toast.success("Signup Success!");
            setTimeout(() => { navigate("/login") }, 2000);
          }else{
            toast.error(response.data.message);
            setBtn("btn-primary")
            setDisabled(false)
          }
        } catch (error) {
          toast.error(error.response.data.message);
          setBtn("btn-primary")
          setDisabled(false)
        }

  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a new user
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="form-label"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="form-label"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
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
              <label
                htmlFor="password"
                className="form-label"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type= "password"
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
                {/* {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )} */}
              </div>
            </div>

            <div>
              <label
                htmlFor="avatar"
                className="form-label"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {/* {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )} */}
                </span>
                
                  
              </div>
            </div>

            <div>
              <button
                type="submit"
                style={{cursor: "pointer"}}
                disabled={isDisabled}
                className={Btn}
              >
                Sign Up Now
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Already have an account?</h4>
              <Link to="/login" className="text-blue-600 pl-2">
                Sign In
              </Link>
              <ToastContainer/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Singup;
