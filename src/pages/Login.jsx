import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useLocalStorage from "../hook/useLocalStorage";
import { HOST } from "../api";

const Login = () => {  const [isLoading, setLoading] = useState(false);
  const [jwt, setJwt] = useLocalStorage("token", "");
  const navigate = useNavigate();
  const handleSucesssNavigation = () => {
    navigate("/my-profile");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const identifier = event.target[0].value;
    const password = event.target[1].value;

    // send formObject to api
    setLoading(true);
    // async function then = Promise:resolved, catch = Promise:reject, finally = Promise:fetched
    axios
      .post(`${HOST}/api/login`, {
        identifier,
        password,
      })
      .then(function (response) {
        console.info(response.data);
        // navigate to my account page when success
        setJwt(response.data.jwt);
        handleSucesssNavigation();
      })
      .catch(function (error) {
        console.error(error.response.data);
      })
      .finally(function () {
        setLoading(false);
      });
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#fefae0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "30rem",
          height: "30rem",
          backgroundColor: "#ffffff",
          borderRadius: "2rem",
          boxShadow: "1px 1px 15px  #e9ecef", display: "flex", flexDirection: "column",alignItems: "center"
        }}
      >
        <p className="mt-[10px] mb-[10px]">
          <h1 className="text-xl font-bold">Bookworm Login</h1>
        </p>
        <p className="w-[250px] text-center  ">
          <h3>Hey, enter your details to get sign to your account</h3>
        </p>
        <form
          className="w-[320px] h-[360px]"
          onSubmit={handleSubmit}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginTop: "3rem",
            }}
          >
            <label htmlFor="identifier">Username / Email</label>
            <input className="bg-[#ffffff] rounded-xl h-[40px] border-[1px] border-slate-300" id="identifier" type="text" placeholder="   username/email"/>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginTop: "1rem",
            }}
          >
            <label htmlFor="password">Password</label>
            <input  className="bg-[#ffffff] rounded-xl h-[40px] border-[1px] border-slate-300" id="password" type="password" placeholder="   password" />
          </div>
          <button 
            type="submit"
            style={{
              backgroundColor: "#cb997e",
              color: "black", fontSize : "1rem", fontWeight: "500",
              marginTop: "1rem",
              width: "100%", height: "10%",
              borderRadius: "0.75rem",
            }}
            disabled={isLoading}
          >
            {isLoading ? "Sending request..." : "Sign in"}
          </button>
          <div className="flex"><p className="mt-4 text-base w-[350px] text-gray-500">Don't have an account?</p>
          <Link
            to="/register"
            style={{
              marginTop: "1rem",
              width: "100%",
              textAlign: "center",
            }}
          >
            Register as new user
          </Link></div>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
