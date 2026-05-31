import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email,setEmail] =
  useState("");

  const [password,setPassword] =
  useState("");

  const login = async () => {

    try {

      const res =
      await api.post(
        "/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.data.token
      );

      localStorage.setItem(
        "role",
        res.data.data.user.role
      );

      if(
        res.data.data.user.role === "admin"
      ){
        navigate("/admin-dashboard");
      }else{
        navigate("/user-dashboard");
      }

    } catch(error){

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    }

  };

  return (

    <div className="min-h-screen flex">

      <div className="hidden md:flex w-1/2 bg-[#2E073F] text-white items-center justify-center">

        <div>

          <h1 className="text-5xl font-bold mb-4">
            City Issue Portal
          </h1>

          <p className="text-xl">
            Report & Track City Issues
          </p>

        </div>

      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center">

        <div className="bg-white shadow-xl rounded-xl p-8 w-[400px]">

          <h2 className="text-3xl font-bold text-center mb-6">

            Login

          </h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded mb-4"
            onChange={(e)=>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded mb-4"
            onChange={(e)=>
              setPassword(e.target.value)
            }
          />

          <button
            onClick={login}
            className="w-full bg-[#7A1CAC] text-white p-3 rounded"
          >
            Login
          </button>

          <p className="text-center mt-4">

            New User ?

            <Link
              className="text-purple-700 ml-2"
              to="/register"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Login;