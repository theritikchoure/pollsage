// write function to save cookie with expiry date
export const setCookie = (name, value, days) => {
  let date = new Date();
  let expires = "";
  if (days) {
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

// write function to get cookie
export const getCookie = (name) => {
  let nameEQ = name + "=";
  let ca = document.cookie.split(";");
  for (let index = 0; index < ca.length; index++) {
    let c = ca[index];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return JSON.parse(c.substring(nameEQ.length, c.length));
  }
  return null;
};
