import Cookies from "js-cookie";

// write function to save cookie with expiry date
export const setCookie = (name, value, days) => {
  Cookies.set(name, value, { expires: days, sameSite: "strict" });
  return true;
};

// write function to get cookie
export const getCookie = (name) => {
  return Cookies.get(name);
};
