import { getCookie, setCookie } from "../helpers/cookie";


export const getUserIp = async () => {
  try {

    let geo = getCookie("user_geo_location");
    if(geo) {
        return JSON.parse(geo);
    }
    
    // load the user ip
    let res = await fetch("https://ipv4.jsonip.com/");
    res = await res.json();
    let geoLocation = await fetch(`http://ip-api.com/json/${res.ip}`);
    geoLocation = await geoLocation.json();

    let details = {
      ip: res.ip,
      country: res.country,
      geo_location: geoLocation,
    };

    // set cookie for 1 day
    setCookie("user_geo_location", JSON.stringify(details), 1);

    return {
      ip: res.ip,
      country: res.country,
      geo_location: geoLocation,
    };
  } catch (error) {
    console.log(error);
  }
};
