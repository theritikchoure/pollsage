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
import {
  isAuthenticated,
} from "./helpers/localstorage";
import { deleteSessionId, sessionId } from "./utils/session";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    if (isAuthenticated()) {
      setIsAuth(true);
      setAuth({
        user: isAuthenticated(),
      });
    }
    setLoading(false);
  }, [location]);

  useEffect(() => {
    if (isAuth) {
      setIsAuth(true);
      setAuth({
        user: isAuthenticated(),
      });
    }
    setLoading(false);
  }, [isAuth]);

  useEffect(() => {
    if (socket.readyState === WebSocket.OPEN) {
      console.log("WebSocket connection is already open.");
    } else {
      socket.connect();
      console.log("WebSocket connection ");
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!location.pathname.includes("/admin")) {
      trackPageView({ url: location.pathname, referrer: document.referrer });
    }
  }, [location]);

  return (
    <>
      <ToastContainer />
      <Suspense fallback={<Loader />}>
        {!loading && (
          <Routes>
            {/* Non-authenticated Routes */}
            {!isAuth && (
              <>
                <Route
                  path="/login"
                  element={<Login setIsAuth={setIsAuth} />}
                />
                <Route path="/register" element={<Register />} />
                <Route path="/verify/:token" element={<EmailVerification />} />
                <Route path="/forgot-password" element={<ForgetPassword />} />
                <Route
                  path="/reset-password/:token"
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
            {isAuth && auth && auth.user && (
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
          </Routes>
        )}
      </Suspense>

      <BackToTopButton />
    </>
  );
}

export default App;
