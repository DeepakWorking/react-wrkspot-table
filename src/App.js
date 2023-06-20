import Header from "./Header";
import React, { useMemo, useState } from "react";
import Mock from "./mockCountries.json";
import ActionBar from "./ActionBar";
import Countriestable from "./CountryDatatable";
import "./App.css";
const EXPIRATION_LIMIT = 5000;

const fetchCountries = async () => {
  const fetchPromise = fetch("https://api.sampleapis.com/countries/countries")
    .then((response) => response.json())
    .catch((error) => {
      throw new Error("Network error");
    });

  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Timeout error"));
    }, EXPIRATION_LIMIT);
  });

  return Promise.race([fetchPromise, timeoutPromise]);
};
const filterCountryData = (data, countryName, countryPopulation) => {
  if (!countryName && !countryPopulation) return data;
  return data.filter(({ name, population }) => {
    if (countryName !== "") {
      return name.includes(countryName) && population > countryPopulation;
    } else if (population > 0) {
      return population > countryPopulation;
    }
    return true;
  });
};
export default function App() {
  const [countryData, setCountryData] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [population, setPopulation] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const handleShowCountriesClick = () => {
    setLoading(true);
    fetchCountries()
      .then((data) => {
        setLoading(false);
        setCountryData(data);
      })
      .catch(() => {
        setLoading(false);
        setCountryData(Mock);
      });
  };
  const handleInputChange = (e) => {
    setCountryName(e.target.value);
  };
  const handlePopulationChange = (e) => {
    setPopulation(e.target.value);
  };
  const handleClearClick = (e) => {
    e.preventDefault();
    setCountryName("");
    setPopulation(0);
  };
  const filterData = useMemo(
    () => filterCountryData(countryData, countryName, population),
    [countryData, countryName, population]
  );
  return (
    <div className="App">
      <section className="headerSection">
        <Header />
      </section>
      <section className="action-section">
        <ActionBar
          handleShowCountriesClick={handleShowCountriesClick}
          handleInputChange={handleInputChange}
          handlePopulationChage={handlePopulationChange}
          handleClearClick={handleClearClick}
          population={population}
          countryName={countryName}
        />
      </section>
      <Countriestable data={filterData} />
      {isLoading && (
        <div className="loader" style={{ textAlign: "center" }}>
          loading....
        </div>
      )}
    </div>
  );
}
