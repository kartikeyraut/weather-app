import axios from "axios";
import React, { Fragment, useEffect, useState, useRef } from "react";
import APIKey from "./API/API";

function WeatherApp() {
  const [search, setsearch] = useState("Chhindwara");
  const [error, seterror] = useState(false);
  const [data, setdata] = useState(null);
  const [input, setinput] = useState("");
  const fetchData = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${
      input !== "" ? input : search
    }&APPID=${APIKey}`;
    axios
      .get(url)
      .then((response) => {
        seterror(false);
        setdata({
          temp: (response.data.main.temp - 273.15).toFixed(2),
          feelsLike: (response.data.main.feels_like - 273.15).toFixed(2),
          weather: response.data.weather[0]["main"],
          city: response.data.name,
        });
      })
      .catch((error) => {
        console.log(error)
        setdata(null);
        seterror(true);
      });
  };

  useEffect(() => {
    // fetchData();
      const delayDebounceFn = setTimeout(() => {
        // Send Axios request here
        fetchData();
      }, 500);
      
      return () => clearTimeout(delayDebounceFn);
  }, [input]);

  return (
    <div
      className="min-h-screen  py-6 pb-7 flex flex-col justify-center sm:py-12"
      style={{
        // background:'black',
        backgroundImage:
          "url('https://images.unsplash.com/photo-1634284481556-490fc8bb29a7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1172&q=80')",
        backgroundSize: "cover",
      }}
    >
      <div
        className="flex justify-center flex-col relative px-4 max-w-xl mx-auto py-10 rounded-3xl p-20 shadow-2xl
       "
      >
        <input
          className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none focus:bg-white  focus:text-black w-full text-white placeholder-white border border-gray-200 rounded-md py-2 pl-10 bg-transparent "
          type="text"
          placeholder="Start Typing City..."
          value={input}
          onChange={(event) => {
            setinput(event.target.value);
          }}
        />
        <svg
          className="animate-bounce w-12 h-12 text-white mx-auto mt-8"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>

        {error ? (
          <div className="mx-auto pt-4 text-white text-4xl">Oops! No Data.</div>
        ) : data ? (
          <Fragment>
            <div className="mx-auto pt-1 text-white font-semibold text-xl">
              {data.city}
            </div>

            <div className="mx-auto pt-4 text-white text-3xl">
              {data.temp} &deg;C
            </div>
            <div className="mx-auto text-white text-sm">
              Feels Like : {data.feelsLike} &deg;C
            </div>
            <div className="mx-auto pt-2 text-white text-2xl">
              {data.weather}
            </div>
          </Fragment>
        ) : null}
      </div>
    </div>
  );
}

export default WeatherApp;
