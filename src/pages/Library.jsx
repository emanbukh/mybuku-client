import React from "react";

const Library = () => {
  return (
    <div
    style={{
      width: "100vw",
      height: "100vh",
      backgroundColor: "#fefae0",
      display: "flex", flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  ><p className="font-bold text-2xl mb-5">Library</p>
    <div className="w-[25rem] h-[3rem] rounded-xl bg-[#ffffff] mb-5 shadow "><input className="w-[25rem] h-[3rem] text-center" type="text" placeholder="Search..." /></div>
    <div
      style={{
        width: "60rem",
        height: "30rem",
        backgroundColor: "#ffffff",
        borderRadius: "2rem",
        boxShadow: "1px 1px 15px  #e9ecef",
        display: "flex",
        flexDirection: "row",
        overflow: "auto",
        scrollBehavior:"smooth",
        
      }}
      className="grid grid-cols-4 lg:grid-col-6 "
    >
     
    </div>
  </div>)
};

export default Library;
