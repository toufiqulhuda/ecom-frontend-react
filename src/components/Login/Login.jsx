import { React, useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../styles/styles";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { ToastContainer,toast } from "react-toastify";

const Login = () => {
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [Btn, setBtn] = useState("btn-primary");
  // const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true)
        setBtn("btn-secondary")
        try {
          
          const response = await axios.post(`${server}/auth/signin`,
          {
            "email": email, 
            "password": password
          });
          // console.log(response);
          if(response.status === 200){
            
            window.localStorage.setItem("token",response.data.token)
            window.localStorage.setItem("userid",JSON.stringify(response.data.user._id))
            window.localStorage.setItem("isAuthenticated",true)
            setEmail("")
            setPassword("")
            // setDisabled("")
            // setBtn("")
            
            toast.success("Login Success!",{position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"});
            setTimeout(() =>window.location.href="/", 2000);
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
    
    
  };

  return (
    
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
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
                  // type={visible ? "text" : "password"}
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
            <div className="d_flex">
              <div className={`${styles.noramlFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className=""
                />
                <label
                  htmlFor="remember-me"
                  className="form-label"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href=".forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                style={{cursor: "pointer"}}
                disabled={isDisabled}
                className={Btn}
              >
                Login
              </button>
            </div>
            <div className="d-flex">
              <h4>Not have any account?</h4>
              <Link to="/register" className="text-blue-600 pl-2 ">
                Sign Up
              </Link>
              <ToastContainer/>
            </div>
          </form>
        </div>
      </div>
    </div>
    
  );
};

export default Login;
