import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const parseJwt = (token: any) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props: any) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("DIRECTORY_USER")
      ? JSON.parse(localStorage.getItem("DIRECTORY_USER") as any)
      : null;

    if (userData) {
      const decodedJwt = parseJwt(userData.token);

      if (decodedJwt.exp * 1000 < Date.now()) {
        localStorage.removeItem("DIRECTORY_USER");
        navigate("/login");
      }
    }
  }, [location, navigate]);

  return <></>;
};

export default AuthVerify;
