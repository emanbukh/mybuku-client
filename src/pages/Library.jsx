import React, { useEffect, useState } from "react";
import useLocalStorage from "../hook/useLocalStorage";
import { HOST } from "../api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import pluralize from "pluralize";
import Cookies from "js-cookie";

const Library = () => {
  const [user] = useLocalStorage("userData", null);
  const [book, setBook] = useLocalStorage("booktData", null);
  
  const jwt = Cookies.get("token");
  const [books, setBooks] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const navigateAddBook=useNavigate()
  const navigateAccount = useNavigate();
  const navigateLogOut = useNavigate();

  const handleNavigateAccount = (path) => {
    navigateAccount("/my-profile");
  };
  const handleLogoutOut = () => {
    Cookies.remove("token");
    navigateLogOut("/login");
    location.reload();
  };

  const handleNavigationAddBook=(path)=>{navigateAddBook("/newbook")}

  const fetchAllBook = () => {
    //   change loading state to true
    setLoading(true);

    // get jwt from localStorage
    console.log(jwt);
    console.log(book);
    // run get api
    axios
      .get(`${HOST}/api/books`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then(function (response) {
        // handle success
        console.info(response.data.data);
        setBooks(response.data.data);
        setBook(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.error(error);
        if (error.response === 401) {
          navigate("/library");
        }
      })
      .finally(function () {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchAllBook();
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#fefae0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{display:"flex", height:"50px", width:"900px", justifyContent:"space-between", alignContent:"center"}}>
          <p className="font-bold text-2xl mb-5 flex w-[150px] h-[40px]">Library</p><div>
          <button
            style={{
              backgroundColor: "#d1ccd2",
              color: "black",
              width: "150px",
              height:"50px",
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
            style={{
              backgroundColor: "#d1ccd2",
              color: "black",
              width: "150px",
              height:"50px",
              borderRadius: "10px",
              background: "#c4d6b0",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
            onClick={handleLogoutOut}
          >
            Logout
          </button></div>
        </div>
        <div className="mt-5 w-[25rem] h-[3rem] rounded-xl bg-[#ffffff] mb-5 shadow ">
          <input
            className="w-[25rem] h-[3rem] text-center"
            type="text"
            placeholder="Search..."
          />
          <p className="font-[500] mt-2 underline" style={{cursor:"pointer"}} onClick={()=>handleNavigationAddBook("newbook")}>Add new book here</p>
        </div>
        <h1 className="font-bold">
          {books.length} {pluralize("Book", books.length)}
        </h1>
        <div
          style={{
            width: "60rem",maxWidth: "60rem",
            maxHeight: "30rem",
            backgroundColor: "#ffffff",
            borderRadius: "2rem",
            boxShadow: "1px 1px 15px  #e9ecef",
            display: "flex",
            flexWrap:"wrap",
            flexDirection: "row",
            overflow: "auto",
            scrollBehavior: "smooth",
            justifyContent:"center"
          }}
          className="mt-5 grid grid-cols-4 lg:grid-col-6 gap-[1rem] "
        >
          {isLoading ? (
            <p
              style={{ width: "100%", textAlign: "center", marginTop: "3rem" }}
            >
              Loading Your Books...
            </p>
          ) : (
            books.map((book, index) => <BookCard key={index} book={book} />)
          )}
        </div>
      </div>
    </div>
  );
};

const BookCard = ({ book }) => {
  const [jwt] = useLocalStorage("token", "");
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "13rem",
        width: "10rem",
        position: "relative",
        borderStyle: "solid",
        borderWidth: "0.5rem",
        borderColor: "#C4D6B0",
        borderRadius: "0.5rem",
        padding: "1rem",
        margin: "2rem",
      }}
      onClick={() => {
        navigate(`/book/${book.id}`);
      }}
    >
      <div style={{ marginTop: "1rem" }}>
        <p style={{ fontSize: "1.2rem" }} className="font-bold">
          Book title :
        </p>
        <p
          style={{
            display: "inline",
            fontWeight: "500",
            fontSize: "1.1rem",
          }}
        >
          {book?.title || "no data"}
        </p>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <p style={{ fontSize: "1.2rem" }} className="font-bold">
          Price :
        </p>
        <p
          style={{
            display: "inline",
            fontWeight: "500",
            fontSize: "1.1rem",
          }}
        >
          {book?.price || "no data"}
        </p>
      </div>
    </div>
  );
};

export default Library;
