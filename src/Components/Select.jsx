import React from "react";

import AsyncSelect from "react-select/async";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";
import {difficultyOptions,categoryOptions} from "../pages/data"
//import { colourOptions } from '../data';

const animatedComponents = makeAnimated();

const getOptions = (value) => {
  return new Promise((resolve, reject) => {
    if (value.length < 3) {
      return resolve([]);
    }

    axios
      .get(`https://ultimate-topic-list.herokuapp.com/topics/names?search=${value}`)
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

export default function AnimatedMulti({ setFilters }) {
  const handleChange = (e) => {
    console.log(e);
    setFilters((prev) => {
      return {
        ...prev,
        topics: e.map((element) => element.value),
      };
    });
  };
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
    </div>
  );
}
