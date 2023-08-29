// utils/session.js
import Cookies from "js-cookie";

const SESSION_COOKIE_NAME = "sessionId";

// Function to get the sessionId from the cookie or generate a new one if not present
export function getSessionId() {
  let sessionId = Cookies.get(SESSION_COOKIE_NAME);
  if (!sessionId) {
    // Generate a new sessionId (you can use any method to generate a unique id)
    sessionId = generateNewSessionId();

    // Set the sessionId as a cookie that expires after 1 day
    Cookies.set(SESSION_COOKIE_NAME, sessionId, { expires: 1, sameSite: "strict" });
  }

  return sessionId;
}

// export a constant variable
export const sessionId = getSessionId();

// Function to generate a random sessionId (example, you can use a different method)
function generateNewSessionId() {
  const array = new Uint32Array(8);
  window.crypto.getRandomValues(array);
  return Array.from(array, (num) => num.toString(36)).join('');
}


export const deleteSessionId = () => {
  Cookies.remove(SESSION_COOKIE_NAME);
}