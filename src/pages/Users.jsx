import React, {useState, useEffect} from "react";
import useLocalStorage from "../hook/useLocalStorage";
import { HOST } from "../api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import pluralize from "pluralize";
import Cookies from "js-cookie";

const Users = () => {  const [user] = useLocalStorage("userData", null);
const jwt = Cookies.get("token");
const [users, setUsers] = useState([]);
const [isLoading, setLoading] = useState(true);
const navigate = useNavigate();
const fetchAllUser = () => {
  //   change loading state to true
  setLoading(true);

  // get jwt from localStorage
  console.log(jwt);

  // run get api
  axios
    .get(`${HOST}/api/users`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    .then(function (response) {
      // handle success
      console.info(response.data.data);
      setUsers(response.data.data);
    })
    .catch(function (error) {
      // handle error
      console.error(error);
      if (error.response.status === 401) {
        navigate("login");
      }
    })
    .finally(function () {
      setLoading(false);
    });
};
useEffect(() => {
  fetchAllUser();
}, []);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#fefae0",
        display: "flex", flexDirection:"column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p style={{display: "flex", fontWeight: "bold"}}>Bookworms People </p>
      <div
        style={{
          width: "30rem",
          height: "35rem",
          backgroundColor: "#ffffff",
          borderRadius: "2rem",
          boxShadow: "1px 1px 15px  #e9ecef", display: "flex", flexDirection: "column",alignItems: "center"
        }}
      >
       <h1 className="mt-2">
          {users.length} registered {pluralize("user", users.length)}
        </h1>
        <div style={{ width: "100%", maxWidth: "400px" }}>
          {isLoading ? (
            <p
              style={{ width: "100%", textAlign: "center", marginTop: "3rem" }}
            >
              Loading users data...
            </p>
          ) : (
            users.map((user, index) => <UserCard key={index} user={user} />)
          )}
        </div>
      </div>
    </div>
  );
};

const UserCard = ({ user }) => {
  const [jwt] = useLocalStorage("token", "");

  return ( <div><div>
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
    <p>Date registered</p>
    <p style={{ display: "inline", fontWeight: "bold" }}>
      {user?.created_at}
    </p>
  </div>
</div>)};

export default Users;
