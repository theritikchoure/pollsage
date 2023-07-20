import React, { useEffect } from "react";
import { getCookie } from "../helpers/cookie";

const PageDetails = (props) => {
  useEffect(() => {
    // alert('Please add your page details here.')
    document.title = props.title;

    // get meta description tag and change it to the meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    metaDescription.setAttribute("content", props.description);

    if(!getCookie('user_info')) {
      loadUserInfo();
    }
  }, []);

  const loadUserInfo = async () => {
    try {
      // load the poll
      let res = await fetch("https://ipv4.jsonip.com/");
      res = await res.json();
      let geoLocation = await fetch(`http://ip-api.com/json/${res.ip}`);
      geoLocation = await geoLocation.json();

      const userAgent = window.navigator.userAgent;

      let browser = "";
      let deviceType = "";
      // Check for browser type
      if (userAgent.includes("Chrome")) {
        browser = "Chrome";
      } else if (userAgent.includes("Firefox")) {
        browser = "Firefox";
      } else if (userAgent.includes("Safari")) {
        browser = "Safari";
      } else if (userAgent.includes("Opera")) {
        browser = "Opera";
      } else if (userAgent.includes("Edge")) {
        browser = "Edge";
      } else {
        browser = "Other";
      }

      // Check for device type
      if (userAgent.includes("Mobile")) {
        deviceType = "Mobile";
      } else {
        deviceType = "Desktop";
      }

      let user_info = {
        ip: res.ip,
        country: res.country,
        geo_location: {
          city: geoLocation.city,
          region: geoLocation.region,
          regionName: geoLocation.regionName,
          country: geoLocation.country,
          countryCode: geoLocation.countryCode,
          lat: geoLocation.lat,
          lon: geoLocation.lon,
          timezone: geoLocation.timezone,
        },
        browser: browser,
        device_type: deviceType,
      };

      // set browser cookie for one day 
      let date = new Date();
      date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
      document.cookie = `user_info=${JSON.stringify(user_info)}; expires=${date.toUTCString()}; path=/`;

      // get browser cookie
      // let cookie = document.cookie.split(';').find(row => row.startsWith('user_info'));
      // cookie = cookie.split('=')[1];
      // cookie = JSON.parse(cookie);
      // console.log(cookie);
      console.log(getCookie("user_infoh"));
    } catch (error) {
    } finally {
    }
  };
  return <></>;
};

export default PageDetails;
