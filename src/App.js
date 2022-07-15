import React from "react";
import { useState } from "react";

const api = {
  key: "c6c8b6622394274489965c167a106e97",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.baseUrl}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  };
  const dateBuilder = (n) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[n.getDay()];
    let date = n.getDate();
    let month = months[n.getMonth()];
    let year = n.getFullYear();

    return ` ${day} ${date} ${month} ${year}`;
  };
  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ? 'App': 'App-cold') :'App'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != 'undefined') ? (
        <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
          <div className="weather-box">
            <div className="temp">{Math.round(weather.main.temp)}℃</div>
            <div className="weather">{weather.weather[0].main}
            </div>
          </div>
        </div>

        ):('')}
      </main>
    </div>
  );
}

export default App;
