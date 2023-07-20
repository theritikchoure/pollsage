import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import Home from "./views/home.js";
import EmailVerification from "./views/creator/auth/email_verification.js";
import Login from "./views/creator/auth/login";
import Register from "./views/creator/auth/register";
import ForgetPassword from "./views/creator/auth/forget_password";
import ResetPassword from "./views/creator/auth/reset_password";
import CreatorLayout from "./views/creator/layout.js";
import { Suspense, useEffect, useState } from "react";
import { isEmpty } from "./helpers/common";
import NotFound from "./views/404";
import CreatePoll from "./views/poll/create_poll";
import ViewPoll from "./views/poll/view_poll";
import PollResult from "./views/poll/poll_result.js";
import Loader from "./components/_loader";
import Chat from "./views/chat.js"

function App() {

  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const auth = {
      user: localStorage.getItem("user"),
      token: localStorage.getItem("token"),
    };

    if (!isEmpty(auth.user) && !isEmpty(auth.token)) {
      setIsAuth(true);
    }
  }, [location]);

  return (
    <>
    {/* // <Router> */}
      <ToastContainer />
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Non-authenticated Routes */}
          {!isAuth && (
            <>
              <Route path="/creator/login" element={<Login setIsAuth={setIsAuth} />} />
              <Route path="/creator/register" element={<Register />} />
              <Route path="/creator/verify/:token" element={<EmailVerification />} />
              <Route path="/creator/forget-password" element={<ForgetPassword />} />
              <Route path="/creator/reset-password/:token" element={<ResetPassword />} />
            </>
          )}

          {/* Authenticated Routes */}
          {isAuth && (
            <>
            {/* <Route exact path="/creator/login" element={<Navigate to={'/creator/dashboard'} />} /> */}
            <Route path="/creator/*" element={<CreatorLayout />} />
            </>
          )}

          {/* Common Routes */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/create-poll" element={<CreatePoll />} />
          <Route exact path="/404" element={<NotFound />} />
          <Route exact path="/poll/:pollId" element={<ViewPoll />} />
          <Route exact path="/results/:pollId" element={<PollResult />} />

          <Route exact path="/chat/:pollId" element={<Chat />} />
        </Routes>
      </Suspense>
    {/* // </Router> */}
    </>
  );
}

export default App;
