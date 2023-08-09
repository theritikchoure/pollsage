const axios = require("axios");

const disposableEmail = async (email) => {
  try {
    let res = await axios.get(`https://disposable.debounce.io/?email=${email}`);
    return JSON.parse(res.data.disposable);
  } catch (error) {
    return true;
  }
};

module.exports = disposableEmail;
