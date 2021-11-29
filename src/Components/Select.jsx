import React, {useState, useEffect} from "react";

import AsyncSelect from "react-select/async";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "../http/api.js";
import { difficultyOptions, categoryOptions, showOptions } from "../pages/data";
//import { colourOptions } from '../data';

const animatedComponents = makeAnimated();

const getOptions = (value) => {
  return new Promise((resolve, reject) => {
    if (value.length < 3 && value[0] != "D") {
      return resolve([]);
    }

    axios
      .get(`/topics/names?search=${value}`)
      .then((response) => {
        let data = response.data.map((element) => {
          return { value: element.title, label: element.title };
        });
        resolve(data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export default function AnimatedMulti({ setFilters, token }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (e) => {
    console.log(e);
    setFilters((prev) => {
      return {
        ...prev,
        topics: e.map((element) => element.value),
      };
    });
  };

  useEffect(() => {
    if (token) setLoggedIn(true);
    else setLoggedIn(false);
  }, [token]);

  const handleDifficultyChange = (e) => {
    console.log(e);
    setFilters((prev) => {
      return {
        ...prev,
        difficulty: e.map((element) => element.value),
      };
    });
  };
  const handleCategoryChange = (e) => {
    console.log(e);
    setFilters((prev) => {
      return {
        ...prev,
        categories: e.map((element) => element.value),
      };
    });
  };
  const handleShowChange = (e) => {
    console.log(e);

    let value = e.value;
    setFilters((prev) => {
      return {
        ...prev,
        solved: value,
      };
    });
  };
  return (
    <div className="horizontal-select">
      <AsyncSelect
        className="select async"
        placeholder="Topics"
        cacheOptions
        closeMenuOnSelect={true}
        components={animatedComponents}
        defaultValue={[]}
        isMulti
        defaultOptions={[]}
        loadOptions={getOptions}
        onChange={handleChange}
      />

      <Select
        className="select"
        placeholder="Difficulty"
        closeMenuOnSelect={true}
        components={animatedComponents}
        defaultValue={[]}
        isMulti
        defaultOptions={[]}
        options={difficultyOptions}
        onChange={handleDifficultyChange}
      />
      <Select
        className="select"
        placeholder="Category"
        closeMenuOnSelect={true}
        components={animatedComponents}
        defaultValue={[]}
        isMulti
        defaultOptions={[]}
        options={categoryOptions}
        onChange={handleCategoryChange}
      />
      {loggedIn ? (
        <Select
          className="select"
          placeholder="All"
          closeMenuOnSelect={true}
          components={animatedComponents}
          defaultValue={[]}
          defaultOptions={[]}
          options={showOptions}
          onChange={handleShowChange}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
