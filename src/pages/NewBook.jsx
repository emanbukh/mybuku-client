import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { HOST } from "../api";
import useLocalStorage from "../hook/useLocalStorage";
import Cookies from "js-cookie";

const NewBook = () => {
  const jwt = Cookies.get("token");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage("userData", null);
  const handleSucesssNavigation = () => {
    navigate();
  };
  const navigateLibrary = useNavigate();
  const navigateAccount = useNavigate();
  const navigateLogOut = useNavigate();
  const handleNavigateLibrary = (path) => {
    navigateLibrary("/library");
  };
  const handleNavigateAccount = (path) => {
    navigateAccount("/my-profile");
  };
  const handleLogoutOut = () => {
    Cookies.remove("token");
    navigateLogOut("/login");
    location.reload();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const title = event.target[0].value;
    const price = event.target[1].value;
    const description = event.target[2].value;

    try {
      setLoading(true);

      const response = await axios.post(
        `${HOST}/api/books/add`,
        {
          title,
          price,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.info(response.data);
      handleSucesssNavigation();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div className="w-[100vw] h-[50px] flex bg-[#fefae0] ">
        <div className="w-[50%] flex flex-row ">
          <button className="mt-1 ml-5"
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
        </div>
        <div className="w-[50%] flex flex-row">
          <button className="mt-1 ml-[380px]"
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
            onClick={() => handleNavigateAccount("my-profile")}
          >
            My Account
          </button>{" "}
          <button className="mt-1 ml-4"
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
            height: "25rem",
            backgroundColor: "#ffffff",
            borderRadius: "2rem",
            boxShadow: "1px 1px 15px  #e9ecef",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 className="mt-5 font-bold">Add New Book</h1>
          <form
            style={{ width: "100%", maxWidth: "400px" }}
            onSubmit={handleSubmit}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                marginTop: "1.5rem",
              }}
            >
              <label className="font-bold" htmlFor="Title">
                Title:
              </label>
              <input
                id="title"
                type="text"
                className="bg-[#ffffff] rounded-xl h-[40px] border-[1px] border-slate-300"
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
              <label className="font-bold" htmlFor="Price">
                Price:
              </label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                className="bg-[#ffffff] rounded-xl h-[40px] border-[1px] border-slate-300"
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
              <label className="font-bold" htmlFor="Description">
                Description:
              </label>
              <textarea
                id="description"
                type="text"
                className="bg-[#ffffff] rounded-xl h-[40px] border-[1px] border-slate-300"
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <button
                type="submit"
                style={{
                  backgroundColor: "#cb997e",
                  color: "black",
                  fontSize: "1rem",
                  fontWeight: "500",
                  marginTop: "1rem",
                  width: "90px",
                  height: "10%",
                  borderRadius: "0.75rem",
                }}
                disabled={isLoading}
              >
                {isLoading ? "Sending request..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBook;
