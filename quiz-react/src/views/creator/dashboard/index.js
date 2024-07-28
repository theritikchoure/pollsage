import React from "react";
import PageDetails from "../../../components/_page_details";
import StatisticsCards from "../../../components/creator/statistics_cards";
import RecentActivity from "../../../components/creator/recent_activities";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css"; // (optional) If you are using marker clusters

const geographicData = {
  totalResponses: 10,
  countries: {
    IN: 9,
    NL: 1,
  },
  geoLocations: [
    {
      status: "success",
      country: "India",
      countryCode: "IN",
      region: "MP",
      regionName: "Madhya Pradesh",
      city: "Bhopal",
      zip: "464993",
      lat: 23.2487,
      lon: 77.4066,
      timezone: "Asia/Kolkata",
      isp: "BSNL Internet",
      org: "",
      as: "AS9829 National Internet Backbone",
      query: "59.95.131.22",
    },
    {
      status: "success",
      country: "India",
      countryCode: "IN",
      region: "MP",
      regionName: "Madhya Pradesh",
      city: "Bhopal",
      zip: "464993",
      lat: 23.2487,
      lon: 77.4066,
      timezone: "Asia/Kolkata",
      isp: "BSNL Internet",
      org: "",
      as: "AS9829 National Internet Backbone",
      query: "59.95.131.22",
    },
    {
      status: "success",
      country: "India",
      countryCode: "IN",
      region: "MP",
      regionName: "Madhya Pradesh",
      city: "Bhopal",
      zip: "464993",
      lat: 23.2487,
      lon: 77.4066,
      timezone: "Asia/Kolkata",
      isp: "BSNL Internet",
      org: "",
      as: "AS9829 National Internet Backbone",
      query: "59.95.131.22",
    },
    {
      status: "success",
      country: "India",
      countryCode: "IN",
      region: "MP",
      regionName: "Madhya Pradesh",
      city: "Bhopal",
      zip: "464993",
      lat: 23.2487,
      lon: 77.4066,
      timezone: "Asia/Kolkata",
      isp: "BSNL Internet",
      org: "",
      as: "AS9829 National Internet Backbone",
      query: "59.95.131.22",
    },
    {
      status: "success",
      country: "India",
      countryCode: "IN",
      region: "MP",
      regionName: "Madhya Pradesh",
      city: "Bhopal",
      zip: "464993",
      lat: 23.2487,
      lon: 77.4066,
      timezone: "Asia/Kolkata",
      isp: "BSNL Internet",
      org: "",
      as: "AS9829 National Internet Backbone",
      query: "59.95.131.22",
    },
    {
      status: "success",
      country: "Netherlands",
      countryCode: "NL",
      region: "NH",
      regionName: "North Holland",
      city: "Amsterdam",
      zip: "1012",
      lat: 52.3759,
      lon: 4.8975,
      timezone: "Europe/Amsterdam",
      isp: "Online S.A.S.",
      org: "Scaleway",
      as: "AS12876 SCALEWAY S.A.S.",
      query: "2001:bc8:5080:7a0b::1",
    },
    {
      status: "success",
      country: "India",
      countryCode: "IN",
      region: "MP",
      regionName: "Madhya Pradesh",
      city: "Bhopal",
      zip: "462030",
      lat: 23.2487,
      lon: 77.4066,
      timezone: "Asia/Kolkata",
      isp: "BSNL Internet",
      org: "",
      as: "AS9829 National Internet Backbone",
      query: "117.217.43.252",
    },
    {
      status: "success",
      country: "India",
      countryCode: "IN",
      region: "MP",
      regionName: "Madhya Pradesh",
      city: "Bhopal",
      zip: "462030",
      lat: 23.2487,
      lon: 77.4066,
      timezone: "Asia/Kolkata",
      isp: "BSNL Internet",
      org: "",
      as: "AS9829 National Internet Backbone",
      query: "117.217.43.252",
    },
    {
      status: "success",
      country: "India",
      countryCode: "IN",
      region: "MP",
      regionName: "Madhya Pradesh",
      city: "Harda",
      zip: "461331",
      lat: 22.3449,
      lon: 77.093,
      timezone: "Asia/Kolkata",
      isp: "Bharti Airtel Limited",
      org: "Bharti Airtel Limited",
      as: "AS45609 Bharti Airtel Ltd. AS for GPRS Service",
      query: "2401:4900:56a9:7102:4481:611d:64c1:6d0e",
    },
    {
      status: "success",
      country: "India",
      countryCode: "IN",
      region: "MP",
      regionName: "Madhya Pradesh",
      city: "Bhopal",
      zip: "464993",
      lat: 23.2487,
      lon: 77.4066,
      timezone: "Asia/Kolkata",
      isp: "BSNL Internet",
      org: "",
      as: "AS9829 National Internet Backbone",
      query: "117.217.33.188",
    },
  ],
};

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '');

  return (
    <>
      <PageDetails title={"Creator Dashboard - PollSage"} />

      {/* <!-- Page Header--> */}
      <div className="mt-6 mx-4 p-6 rounded-sm bg-green-400 mb-6">
        {/* <!-- Content --> */}
        <div className="">
          <h1 className="text-slate-100 font-bold text-2xl">
            Good afternoon, {user?.name || ''}. 👋
          </h1>
          <p className="text-indigo-100">
            Here is what’s happening with your projects today:
          </p>
        </div>
      </div>

      {/* <!-- Statistics Cards --> */}
      <StatisticsCards />
                  
      {/* <!-- ./External resources --> */}
    </>
  );
};

export default Dashboard;
