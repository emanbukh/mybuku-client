import React, { useState } from "react";
import { useEffect } from "react";
import useLocalStorage from "../hook/useLocalStorage";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { HOST } from "../api";
import Cookies from "js-cookie";

const Myprofile = () => {
  // const [jwt, setJwt] = useLocalStorage("token", "");
  const jwt = Cookies.get("token");
  const [user, setUser] = useLocalStorage("userData", null);
  const navigate = useNavigate();
  const handleNavigateToLogin = () => {
    navigate("/login");
  };
  const navigateEdit = useNavigate();
  const navigateLogOut = useNavigate();
  const navigateLibrary= useNavigate();
  const handleNavigateLibrary = (path)=>{navigateLibrary("/library");}
  const handleNavigateEdit = (path) => {
    navigateEdit("/edituser");
  };
  
  const handleLogoutOut = () => {
    Cookies.remove("token");
    navigateLogOut("/login");
   
  };
  const fetchUserAccount = () => {
    console.log(jwt);
    Cookies.get("token");

    axios
      .get(`${HOST}/private`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then(function (response) {
        console.info(response.data);
        setUser(response.data.user);
      })
      .catch(function (error) {
        console.error(error);
        handleNavigateToLogin();
      })
      .finally(function () {});
  };

  useEffect(() => {
    fetchUserAccount();
  }, [jwt]);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div className="w-[100vw] h-[50px] flex bg-[#fefae0] ">
        <div className="w-[50%] flex flex-row "></div>
        <div className="w-[50%] flex flex-row">
          <button
            className="mt-1 ml-[380px]"
            style={{
              backgroundColor: "#d1ccd2",
              color: "black",
              width: "100px",
              height: "40px",
              background: "#c4d6b0",
              borderRadius: "10px",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
            onClick={() => handleNavigateLibrary("library")}
          >
            Library
          </button>{" "}
          <button
            className="mt-1 ml-4"
            style={{
              backgroundColor: "#d1ccd2",
              color: "black",
              width: "110px",
              height: "40px",
              borderRadius: "10px",
              background: "#c4d6b0",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
            onClick={handleLogoutOut}
          >
            Logout
          </button>
        </div>
      </div>
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
            boxShadow: "1px 1px 15px  #e9ecef",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1 className="mt-5 text-right font-bold">
              Heyy, this is your profile here!
            </h1>
            <div
              style={{
                marginTop: "50px",
                width: "100%",
                maxWidth: "400px",
                height: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderStyle: "solid",
                  border: "10px",
                }}
              >
                <h3 className="font-[500]">User information</h3>
                <Link
                  className="font-[500] border-[2px] rounded-md w-[150px] h-[35px] text-center leading-[30px]"
                  to="/users"
                >
                  See all users
                </Link>
              </div>
              <div
                style={{
                  borderStyle: "solid",
                  borderColor: "gray",
                  borderRadius: "0.5rem",
                  padding: "1rem",
                  marginTop: "1rem",
                }}
              >
                <div>
                  <p>Username</p>
                  <p style={{ display: "inline", fontWeight: "bold" }}>
                    {user?.username || "no data"}
                  </p>
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <p>Email</p>
                  <p style={{ display: "inline", fontWeight: "bold" }}>
                    {user?.email || "no data"}
                  </p>
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <p>Admin status</p>
                  <p style={{ display: "inline", fontWeight: "bold" }}>
                    {user?.isAdmin ? "True" : "False"}
                  </p>
                </div>
              </div>
              <div className="w-[50%] flex flex-row ml-[100px]">
                <button
                  className="mt-1 "
                  style={{
                    backgroundColor: "#d1ccd2",
                    color: "black",
                    width: "100px",
                    height: "40px",
                    background: "#c4d6b0",
                    borderRadius: "10px",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                  onClick={() => handleNavigateEdit("edit")}
                >
                  Edit
                </button>{" "}
                <button
                  className="mt-1 ml-4"
                  style={{
                    backgroundColor: "#d1ccd2",
                    color: "black",
                    width: "110px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "#c4d6b0",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                  onClick={handleLogoutOut("login")}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myprofile;
