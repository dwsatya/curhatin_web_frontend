/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDataPrivate, logoutAPI } from "../utils/api";
import { jwtStorage } from "../utils/jwt_storage";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [userProfile, setUserProfile] = useState(null);
  const [isLoadingScreen, setIsLoadingScreen] = useState(true);
  const navigate = useNavigate();

  const getDataProfile = async () => {
    const token = await jwtStorage.retrieveToken(); 
    console.log("Token from storage:", token);
    if (!token) {
      setIsLoggedIn(false);
      setIsLoadingScreen(false);
      return;
    }

    getDataPrivate("/api/v1/protected/data")
      .then((resp) => {
        setIsLoadingScreen(false);
        if (resp?.roles) {
          setUserProfile(resp);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        setIsLoadingScreen(false);
        setIsLoggedIn(false);
        console.log(err);
      });
  };


  useEffect(() => {
    getDataProfile();
  }, []);

  const login = async (access_token) => {
    await jwtStorage.storeToken(access_token); 
    getDataProfile(); 
    navigate("/dashboard", { replace: true });
  };

const logout = async () => {
  try {
    await logoutAPI();
  } catch (err) {
    console.error("Logout gagal:", err);
  } finally {
    await jwtStorage.removeItem();
    setUserProfile(null);
    setIsLoggedIn(false);
    navigate("/login", { replace: true });
  }
};




  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        userProfile,
        isLoadingScreen,
        setIsLoadingScreen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
