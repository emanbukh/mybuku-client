import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useLocalStorage from "../hook/useLocalStorage";
import { HOST } from "../api";

const Register = () => {
  const [jwt, setJwt] = useLocalStorage("token", "");
  const [isLoading, setLoading] = useState(false);
  const handleSuccessNavigation = () => {
    navigate("/my-profile");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const username = event.target[1].value;
    const password = event.target[2].value;
    const passwordConfirmation = event.target[3].value;
    const formObject = { email, username, password, passwordConfirmation };
    setLoading(true);

    axios
      .post(`${HOST}/api/register`, formObject)
      .then(function (response) {
        console.info(response.data);
        // navigate to my account page when success
        setJwt(response.data.jwt);
        handleSuccessNavigation();
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
          height: "40rem",
          backgroundColor: "#ffffff",
          borderRadius: "2rem",
          boxShadow: "1px 1px 15px  #e9ecef",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p className="mt-[10px] mb-[10px]">
          <h1 className="text-xl font-bold">You Are Welcome Here</h1>
        </p>
        <p className="w-[250px] text-center  ">
          <h3>Fill up quick!</h3>
        </p>
        <form
          style={{ width: "100%", maxWidth: "400px" }}
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
            <label htmlFor="email">Email</label>
            <input
              className="bg-[#ffffff] rounded-xl h-[40px] border-[1px] border-slate-300"
              id="email"
              type="text"
              placeholder="   email"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginTop: "1rem",
            }}
          >
            <label htmlFor="username">Username</label>
            <input
              className="bg-[#ffffff] rounded-xl h-[40px] border-[1px] border-slate-300"
              id="username"
              type="text"
              placeholder="   username"
            />
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
            <input
              className="bg-[#ffffff] rounded-xl h-[40px] border-[1px] border-slate-300"
              id="password"
              type="password"
              placeholder="   password"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginTop: "1rem",
            }}
          >
            <label htmlFor="passwordConfirmation">Repeat password</label>
            <input
              className="bg-[#ffffff] rounded-xl h-[40px] border-[1px] border-slate-300"
              id="passwordConfirmation"
              type="password"
              placeholder="   password"
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "#cb997e",
              color: "black",
              fontSize: "1rem",
              fontWeight: "500",
              marginTop: "3rem",
              width: "100%",
              height: "10%",
              borderRadius: "0.75rem",
            }}
          >
            {isLoading ? "Sending request..." : "Register"}
          </button>
          <Link
            to="/login"
            style={{
              marginTop: "1rem",
              display: "block",
              width: "100%",
              textAlign: "center",
            }}
          >
            Return as existing user
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
