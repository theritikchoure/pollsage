import React, { useEffect, useState } from "react";
import moment from "moment";

const CountdownTimer = ({ pollStart }) => {
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calculateCountdown = () => {
    const now = moment();
    const start = moment(pollStart);
    const diff = start.diff(now);

    if (diff <= 0) {
      // Poll has already started or pollStart is invalid
      return null;
    }

    const duration = moment.duration(diff);
    return {
      days: duration.days(),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    };
  };

  if (!countdown) {
    // Poll has already started or pollStart is invalid
    return null;
  }

  return (
    <div className="text-2xl font-bold">
      {countdown.days > 0 && <span>{countdown.days}d </span>}
      {countdown.hours < 10 ? "0" : ""}
      {countdown.hours}:{countdown.minutes < 10 ? "0" : ""}
      {countdown.minutes}:{countdown.seconds < 10 ? "0" : ""}
      {countdown.seconds}
    </div>
  );
};

export default CountdownTimer;
