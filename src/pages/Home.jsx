import React from "react";
import { Link, useNavigate } from "react-router-dom";
import imageHome from "../assets/homepage.jpg"
const Home = () => {
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
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
          width: "45rem",
          height: "30rem",
          backgroundColor: "#ffffff",
          borderRadius: "2rem",
          boxShadow: "1px 1px 15px  #e9ecef",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div className="flex w-[50%] h-[100%] border-r-4"><img className="bg-cover" src={imageHome} alt="people-reading-books"  /></div>
        <div className="flex flex-col items-center w-[50%] h-[100%] border-l-4">
          <p className="flex mt-[15px] text-lg font-bold  ">
            Welcome to MyBuku
          </p>
          <p className="pt-5 px-5">
            this website help poeple to publish their book reviews online, it can be
            access wherever and whenever they want{" "}
          </p>{" "}
          <p className="mt-[5rem]">Already have your own account? <span className="font-bold">Sign in ASAP!</span></p>
          <button
            style={{
              backgroundColor: "#cb997e",
              color: "black",
              fontSize: "1rem",
              fontWeight: "500",
              marginTop: "1rem",
              width: "60%",
              height: "10%",
              borderRadius: "0.75rem",
            }}
            onClick={() => handleNavigate("login")}
          >
            Login
          </button>
          <p className="mt-5">Don't have account yet? Register here</p>
          <button
            style={{
              backgroundColor: "#cb997e",
              color: "black",
              fontSize: "1rem",
              fontWeight: "500",
              marginTop: "1rem",
              width: "60%",
              height: "10%",
              borderRadius: "0.75rem",
            }}
            onClick={() => handleNavigate("register")}
          >
            New user?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
