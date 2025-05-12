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

  const navigate = useNavigate();

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

      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
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
      <Navbar showSearchBar={false} />

      <div className="flex items-center justify-center mt-20 px-4">
        <div className="w-full max-w-md border rounded bg-white px-6 py-10 sm:px-8">
          <form onSubmit={handleSignup}>
            <h4 className="text-2xl mb-7 text-center">Signup</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box w-full mb-4 border-b border-black focus:outline-none focus:border-transparent"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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
              Create Account
            </button>

            <p className="text-sm text-center mt-4">
              Already Have an Account?
              <Link to="/login" className="font-medium text-primary underline ml-1">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Singup;
