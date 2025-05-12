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

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please Enter a Valid Email");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    try {
      const response = await axisoInstance.post('/login', {
        email: email,
        password: password,
      });
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken)
        navigate('/dashboard')
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("An Expected Error Occurred")
      }
    }
  }

  return (
    <>
      <Navbar showSearchBar={false} />

      <div className="flex items-center justify-center mt-20 px-4">
        <div className="w-full max-w-md border rounded bg-white px-6 py-10 sm:px-8">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7 text-center">Login</h4>

            <input
              type="text"
              placeholder="Email"
              className="input-box w-full mb-4 border-b border-black focus:outline-none focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-2">{error}</p>}

            <button type="submit" className="btn-primary w-full">
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Not Registered yet.
              <Link to="/singup" className="font-medium text-primary underline ml-1">
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
