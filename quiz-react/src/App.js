import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
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
import Chat from "./views/chat.js";
// import ContactUs from "./views/contact_us.js";
import Layout from "./views/layout";
import socket from "./services/socket.service";
import AdminLogin from "./views/admin/auth/login";
import AdminLayout from "./views/admin/layout";
import BackToTopButton from "./components/_back_to_top";
import { trackPageView } from "./utils/tracking";
import Unsubscribe from "./views/app/unsubscribe";
import { setUpToken } from "./helpers/auth_token";
import { getAuthToken, getUserDetails, isAuthenticated } from "./helpers/localstorage";
import UserLogin from "./views/user/auth/login";
import UserRegister from "./views/user/auth/register";
import { deleteSessionId, sessionId } from "./utils/session";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    if(isAuthenticated()) {
      setIsAuth(true);
      setAuth({
        user: isAuthenticated(),
      });
    }
    setLoading(false);
  }, [location]);

  useEffect(() => {
    // Check if the WebSocket connection is already open
    if (socket.readyState === WebSocket.OPEN) {
      console.log("WebSocket connection is already open.");
    } else {
      // If the connection is not open, then connect
      socket.connect();
      console.log("WebSocket connection ");
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if(location.pathname.includes("/admin")) {
      return;
    } else {
      trackPageView({ url: location.pathname, referrer: document.referrer });
    }
  }, [location]);


  console.log(isAuth);

  return (
    <>
      {/* // <Router> */}
      <ToastContainer />
      <Suspense fallback={<Loader />}>
        {!loading && (
          <Routes>
            {/* Non-authenticated Routes */}
            {!isAuth && (
              <>
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/user/register" element={<UserRegister />} />
                <Route
                  path="/creator/login"
                  element={<Login setIsAuth={setIsAuth} />}
                />
                <Route path="/creator/register" element={<Register />} />
                <Route
                  path="/creator/verify/:token"
                  element={<EmailVerification />}
                />
                <Route
                  path="/creator/forget-password"
                  element={<ForgetPassword />}
                />
                <Route
                  path="/creator/reset-password/:token"
                  element={<ResetPassword />}
                />

                <Route
                  exact
                  path="/admin/loginxyz"
                  element={
                    <AdminLogin setIsAuth={setIsAuth} setAuth={setAuth} />
                  }
                />

                <Route exact path="/poll/:pollId" element={<ViewPoll />} />
                <Route exact path="/results/:pollId" element={<PollResult />} />

                <Route path="/404" element={<NotFound />} />
                <Route exact path="*" element={<Layout />} />
              </>
            )}

            {/* Authenticated Routes */}
            {isAuth && (
              <>
                {auth.user.role === "creator" && (
                  <Route path="/creator/*" element={<CreatorLayout />} />
                )}
                {auth.user.role === "admin" && (
                  <Route exact path="/admin/*" element={<AdminLayout />} />
                )}

                <Route exact path="/poll/:pollId" element={<ViewPoll />} />
                <Route exact path="/results/:pollId" element={<PollResult />} />
                <Route path="/404" element={<NotFound />} />
                <Route exact path="*" element={<Layout />} />
              </>
            )}

            <Route exact path="/unsubscribe" element={<Unsubscribe />} />

            {/* Authenticated Routes */}
            {/* {isAuth && auth.user.role === "creator" && (
            <>
              <Route path="/creator/*" element={<CreatorLayout />} />
            </>
          )} */}

            {/* {isAuth && auth.user.role === "admin" && (
            <>
              <Route
                path="/creator/*"
                element={<Navigate to="/404" replace />}
              />
              <Route exact path="/admin/*" element={<AdminLayout />} />
            </>
          )} */}

            {/* Common Routes */}
            {/* <Route exact path="/" element={<Home />} /> */}
            {/* <Route exact path="/create-poll" element={<CreatePoll />} />
          <Route exact path="/404" element={<NotFound />} />
          <Route exact path="/poll/:pollId" element={<ViewPoll />} />
          <Route exact path="/results/:pollId" element={<PollResult />} />

          <Route
            exact
            path="/admin/loginxyz"
            element={<AdminLogin setIsAuth={setIsAuth} setAuth={setAuth} />}
          />

          <Route
            exact
            path="*"
            element={<Layout isAuth={isAuth} auth={auth} />}
          /> */}
          </Routes>
        )}
      </Suspense>

      <BackToTopButton />
      {/* // </Router> */}
    </>
  );
}

export default App;
