import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const Country = (country) => {
    const countryData = country.country[0];
    const api_key = process.env.REACT_APP_API_KEY;
    const [weather, setWeather] = useState({});

    useEffect(() => {
        Axios.get(
            `http://api.weatherstack.com/current?access_key=${api_key}&query=${countryData.capital}`
        )
            .then((response) => {
                const { current } = response.data;
                console.log(current);
                setWeather(current);
            })
            .catch((e) => {});
    }, [api_key, countryData.capital]);

    return (
        <div>
            <h1>{countryData.name}</h1>
            <div>
                <strong>Capital:</strong> {countryData.capital}
            </div>
            <div>
                <strong>Population:</strong> {countryData.population}
            </div>
            <h2>Languages</h2>
            <ul>
                {countryData.languages.map((languaje) => (
                    <li key={languaje.iso639_1}>{languaje.name}</li>
                ))}
            </ul>
            <img
                alt={countryData.name}
                style={{ width: '180px' }}
                src={countryData.flag}
            />
            <h2>Weather in {countryData.capital}</h2>
            <div>
                <strong>Temperature: {weather.temperature} Celsius</strong>
            </div>
            <img
                alt="icon weather"
                style={{ width: '180px' }}
                src={weather.weather_icons}
            />
            <div>
                <strong>wind:</strong> {weather.wind_speed} mph
            </div>
            <div>
                <strong>direction: </strong>
                {weather.wind_dir}
            </div>
        </div>
    );
};

export const App = () => {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState([]);

    useEffect(() => {
        Axios.get(`https://restcountries.eu/rest/v2/name/${search}`)
            .then((response) => {
                setCountries(response.data);
            })
            .catch((e) => {
                setCountries([]);
            });
    }, [search]);

    const handleInputChange = (event) => {
        setSearch(event.target.value);
    };

    const handleShow = (name) => {
        setSearch(name);
    };

    return (
        <div>
            <form>
                <label htmlFor="fname">Find countries:</label>
                <input
                    type="text"
                    name="fname"
                    value={search}
                    onChange={handleInputChange}
                />
            </form>
            <hr />
            <div>
                {countries.length > 0 && countries.length < 2 ? (
                    <Country country={countries} />
                ) : countries.length > 10 ? (
                    <div>Too many matches, specify another filter</div>
                ) : (
                    countries.map((country, i) => {
                        return (
                            <div
                                style={{ marginBottom: '10px' }}
                                key={country.alpha2Code}
                            >
                                {country.name}
                                <button
                                    style={{ marginLeft: '10px' }}
                                    onClick={() => {
                                        handleShow(country.name);
                                    }}
                                >
                                    show
                                </button>
                            </div>
                        );
                    })
                )}
                {}
            </div>
        </div>
    );
};
