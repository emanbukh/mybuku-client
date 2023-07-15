import React, { useState } from "react";
import { useEffect } from "react";
import useLocalStorage from "../hook/useLocalStorage";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HOST } from "../api";
import Cookies from "js-cookie";

const Book = () => {
  const [isLoading, setLoading] = useState(false);
  const jwt = Cookies.get("token");
  const [user] = useLocalStorage("userData", null);
  const [book, setBook] = useLocalStorage("bookData", null);
  const [books, setBooks] = useState([]);

  const param = useParams();
  const filteredArray = books.filter((item) => String(item.id) === param.id);
  const [filteredBook] = filteredArray;

  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate("/library");
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

  const handleDeleteBook = () => {
    const id = filteredBook?.id;

    axios
      .delete(`${HOST}/api/books/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then(function (response) {
        console.info(response.data);

        handleNavigate();
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(function () {
        setLoading(false);
      });
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div className="w-[100vw] h-[50px] flex bg-[#fefae0] ">
        <div className="w-[50%] flex flex-row ">
          <button
            className="mt-1 ml-5"
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
          <button
            className="mt-1 ml-[390px]"
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
          display: "flex",
          flexDirection: "column",
          height: "89%",
          alignItems: "center",
          padding: "3rem",
          background: "#fefae0",
        }}
      >
        <h1
          style={{
            fontSize: "2.2rem",
            fontWeight: "bolder",
            marginRight: "50px",
          }}
        >
          Books
        </h1>
        <div style={{ width: "100%", maxWidth: "550px" }}>
          <div
            style={{
              width: "30rem",
              height: "25rem",
              backgroundColor: "#ffffff",
              borderRadius: "2rem",
              boxShadow: "1px 1px 15px  #e9ecef",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="ml-[70px] mt-[50px]">
              <div style={{ marginTop: "1rem" }}>
                <p style={{ fontSize: "1.2rem" }}>Title :</p>
                <p
                  style={{
                    display: "inline",
                    fontWeight: "bold",
                    fontSize: "1.3rem",
                    color: "#ff4800",
                  }}
                >
                  {filteredBook?.title || "no data"}
                </p>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <p style={{ fontSize: "1.2rem" }}>Price :</p>
                <p
                  style={{
                    display: "inline",
                    fontWeight: "bold",
                    fontSize: "1.3rem",
                    color: "#ff4800",
                  }}
                >
                  {filteredBook?.price || "no data"}
                </p>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <p style={{ fontSize: "1.2rem" }}>Description :</p>
                <p
                  style={{
                    display: "inline",
                    fontWeight: "bold",
                    fontSize: "1.3rem",
                    color: "#ff4800",
                  }}
                >
                  {filteredBook?.description || "no data"}
                </p>
              </div>
              <button
                style={{
                  backgroundColor: "#cb997e",
                  color: "black",
                  fontSize: "1rem",
                  fontWeight: "500",
                  width: "190px",height:"30px",

                  borderColor: "#ff4800",
                  borderRadius: "0.75rem",
                  marginTop: "50px",
                  marginLeft: "90px",
                }}
                onClick={() => handleDeleteBook()}
              >
                Delete Project?
              </button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "30px",
              fontSize: "1.1rem",
              marginTop: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Book;
