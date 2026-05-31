import { useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

function Register() {

  const [form,setForm] =
  useState({
    name:"",
    email:"",
    password:"",
    phone:"",
    role:"public"
  });

  const register = async()=>{

    try{

      await api.post(
        "/api/auth/register",
        form
      );

      alert(
        "Registration Successful"
      );

    }catch(error){

      alert(
        error.response?.data?.message
      );

    }

  };

  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="bg-white p-8 rounded-xl shadow-xl w-[450px]">

        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <input
          className="w-full border p-3 rounded mb-3"
          placeholder="Name"
          onChange={(e)=>
            setForm({
              ...form,
              name:e.target.value
            })
          }
        />

        <input
          className="w-full border p-3 rounded mb-3"
          placeholder="Email"
          onChange={(e)=>
            setForm({
              ...form,
              email:e.target.value
            })
          }
        />

        <input
          className="w-full border p-3 rounded mb-3"
          placeholder="Password"
          type="password"
          onChange={(e)=>
            setForm({
              ...form,
              password:e.target.value
            })
          }
        />

        <input
          className="w-full border p-3 rounded mb-3"
          placeholder="Phone"
          onChange={(e)=>
            setForm({
              ...form,
              phone:e.target.value
            })
          }
        />

        <button
          onClick={register}
          className="w-full bg-[#7A1CAC] text-white p-3 rounded"
        >
          Register
        </button>

        <p className="text-center mt-4">

          Already have account?

          <Link
            to="/"
            className="ml-2 text-purple-700"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Register;