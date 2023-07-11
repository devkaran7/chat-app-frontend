import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SetAvatar from "./pages/SetAvatar";
import AuthContext from "./utils/AuthContext";

const App = () => {
  const { userId, loginUser } = useContext(AuthContext);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      loginUser(token, user);
    }
  }, [loginUser]);

  let conditionalRoutes;
  if (userId) {
    conditionalRoutes = (
      <>
        <Route path="/setavatar" element={<SetAvatar />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<Navigate to="/chat" replace={true} />} />
      </>
    );
  } else {
    conditionalRoutes = (
      <>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace={true} />} />
      </>
    );
  }

  return (
    <Router>
      <Routes>P{conditionalRoutes}</Routes>
    </Router>
  );
};

export default App;
