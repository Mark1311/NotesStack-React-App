import React, { useState } from "react";
import Navbar from "../../Components/NavBar/Navbar";
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from "../../Components/Input/PasswordInput";
import { validateEmail } from "../../Utils/helper";
import axisoInstance from "../../Utils/axiosInstance";

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleLogin = async (e)=>{
    e.preventDefault();


    if(!validateEmail(email)){
      setError("Please Enter a Valid Email");
      return;
    }

    if(!password){
      setError("Plese the password enter");
      return;
    }
    setError("")

    //Login API Call

    try{
      const response = await axisoInstance.post('/login',{
        email:email,
        password:password,
      });
      //Handle SuccFully Response
      if(response.data && response.data.accessToken){
        localStorage.setItem("token",response.data.accessToken)
        navigate('/dashboard')
      }
    }catch(error){
      //Handle login error
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }else{
        setError("An Expected Error Occured")
      }
    }






  }

  

  return (
    <>
      <Navbar showSearchBar={false}/>

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>
            <input type="text" placeholder="Email" className="input-box" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <PasswordInput value={password} onChange={(e) =>setPassword(e.target.value)}/>

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

              
            <button type="submit" className="btn-primary">
              Login
            </button>
            <p className="text-sm text-center mt-4">
              Not Registered yet.
              <Link to="/singup" className="font-medium text-primary underline">
                Create An Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
