import { createContext, useState } from "react";
import { setAuthToken } from "./setAuthToken";
// import axios from "axios";
// import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userToken, setUserToken] = useState(undefined);
  const [userId, setUserId] = useState(undefined);

  const loginUser = (token, user) => {
    setUserToken(token);
    setUserId(user);
    setAuthToken(token, user);
  };

  const logoutUser = (setIsLoading) => {
    setUserToken(undefined);
    setUserId(undefined);
    setAuthToken();
  };

  return (
    <AuthContext.Provider value={{ userToken, userId, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
