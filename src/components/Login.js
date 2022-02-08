import React from "react";
import logo from "../assets/logo.png"; 

const Login = () => {
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img
        style={{ width: "50%", height: "50%", marginTop: "5%" }}
        src={logo}
        alt="Logo"
      />
      <h3 style={{ marginTop: "5%" }}>Debes iniciar sesión para continuar</h3>
    </div>
  );
};

export default Login;
