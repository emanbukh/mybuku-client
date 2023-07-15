import React, { useState } from "react";
import useLocalStorage from "../hook/useLocalStorage";
import axios from "axios";
import { HOST } from "../api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";



const EditUser = () => {
  const [isLoading, setLoading] = useState(false);
  const jwt = Cookies.get("token");
  const [user, setUser] = useLocalStorage("userData", null);
  const navigate = useNavigate();
  const handleSucesssNavigation = () => {
    navigate("/my-profile");
  };
 

  const [username, setUserName] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);

  const handleChangeUsername = (event) => {
    setUserName(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target[0].value;
    const email = event.target[1].value;
    const formObject = { username, email };

    axios
        .put(
          `${HOST}/api/users/${user?.username}`,
          {
            email, username
          },
          {
            headers: { Authorization: `Bearer ${jwt}` },
          }
        )
        .then(function (response) {
          console.info(response.data);
          // navigate to my account page when success
          handleSucesssNavigation();
          
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
      
      <div
        style={{
          display: "flex",
          flexDirection: "column",
         height: "100vh",
          alignItems: "center",
          justifyContent: "center",
         background:"#fefae0"
        }}
      >
        
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              justifyContent: "center",
              
            }}
          >
            <h3 style={{ fontSize: "1.5rem", fontWeight:"bold",textAlign:"center",marginBottom:"10px" }}>Edit My Account</h3>
          </div>
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
                justifyContent:"center"
              }}
          >
            
            <form
              style={{ width: "100%", maxWidth: "400px" ,height:"300px"}}
              onSubmit={handleSubmit}
            >
              <div style={{ marginTop: "1rem" }}>
              <p style={{ fontSize: "1.4rem", fontWeight:"bold",marginBottom:"10px" }}>Username :</p>
                <p
                  style={{
                    display: "inline",
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    
                  }}
                >
                  <input
                    id="name"
                    type="text"
                    value={username}
                    onChange={handleChangeUsername}
                    className="bg-[#ffffff] rounded-xl h-[40px] border-[1px] border-slate-300"
                  />
                </p>

                <p style={{ fontSize: "1.4rem", fontWeight:"bold",marginBottom:"10px",marginTop:"10px"}}>Email :</p>
                <p
                  style={{
                    display: "inline",
                    fontWeight: "500",
                    fontSize: "1.3rem",
                   
                  }}
                >
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={handleChangeEmail}
                    className="bg-[#ffffff] rounded-xl h-[40px] border-[1px] border-slate-300"
                  />
                </p>
              </div>
              <div style={{ display: "flex", gap: "7px", fontSize: "15px", marginTop: "20px",marginLeft:"140px" }}>
                <button
                  type="submit"
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
                  disabled={isLoading}
                >
                  {isLoading ? "Send request..." : "Edit"}
                </button>
             
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;