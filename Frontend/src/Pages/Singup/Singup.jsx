import React, { useState } from "react";
import Navbar from "../../Components/NavBar/Navbar";
import PasswordInput from "../../Components/Input/PasswordInput";
import { validateEmail } from "../../Utils/helper";
import { Link, useNavigate } from "react-router-dom";
import axisoInstance from "../../Utils/axiosInstance";

const Singup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please Entr Name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Enter Valid Email");
      return;
    }

    if (!password) {
      setError("Enter Password");
      return;
    }
    setError("");

    // Singup Api Here

    try {
      const response = await axisoInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      //Handle SuccFully Response
      if (response.data && response.data.error) {
        setError(response.data.message)
        return
      }
      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken)
        navigate('/dashboard')
      }
    } catch (error) {
      //Handle register error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An Expected Error Occured");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignup}>
            <h4 className="text-2xl mb-7">Singup</h4>
            <input
              type="text"
              placeholder="name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Create Account
            </button>
            <p className="text-sm text-center mt-4">
              Already Have a Account?
              <Link to="/login" className="font-medium text-primary underline">
                Login Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Singup;
