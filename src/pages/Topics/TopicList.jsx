import React, { useState, useEffect } from "react";
import axios from "../../http/api.js";
import MultiSelect from '../../Components/Select';
import {topics_list,difficulty,categories} from '../data.js';
import Accordian from '../../Components/Accordian';
import './style.css'


function TopicList() {

  const [showCategory, setShowCategory] = useState("")
  const [state, setState] = useState([
    {
      title:"Basics",
      topics:[] 
     },
    {
     title:"Math",
     topics:[] 
    },
    {
      title:"Number Theory",
      topics:[] 
     },
     {
      title:"Graph Theory",
      topics:[] 
     },
     {
      title:"Data Structures",
      topics:[] 
     },
     {
      title:"Strings",
      topics:[] 
     },
     {
      title:"DP",
      topics:[] 
     },
     {
      title:"Geometry",
      topics:[] 
     },
     {
      title:"Game Theory",
      topics:[] 
     },
     {
      title:"Miscellenous",
      topics:[] 
     },
     {
      title:"Important Links",
      topics:[] 
     }
  ]);
  
  const [filters,setFilters] = useState({
    difficulty:[],
    topics:[],
    categories:[]
  })

  function handleChange(e) {

  }

  function make_query_string() {
    let query_string = "";
    if (filters.topics.length != 0) {
      if (query_string == "") {
        query_string += "?";
      } else {
        query_string += "&";
      }
      query_string += "title__in=";
      query_string += filters.topics.join();
    }
    if (filters.categories.length != 0) {
      if (query_string == "") {
        query_string += "?";
      } else {
        query_string += "&";
      }
      query_string += "category__title__in=";
      query_string += filters.categories.join();
    }
    if(filters.difficulty.length!=0){
      if (query_string == "") {
        query_string += "?";
      } else {
        query_string += "&";
      }
      query_string += "difficulty__in=";
      query_string += filters.difficulty.join();
    }
    return query_string
  }

  useEffect(() => {
      console.log(filters)
    const fetch_jobs = async () => {
      let query_string = make_query_string();
      console.log(query_string)
      let res = await axios.get(`/topics/list/${query_string}`);
      console.log(res.data);
      setState(res.data);
    };
    fetch_jobs();
  }, [filters]);

  return (
    <>
      <div className="selectWrapper"> 
          <MultiSelect setFilters={setFilters}/>
      </div>
      <div className="list-container">
     {

       categories.map((category,idx)=>{
         if(state[idx].topics.length==0 || (showCategory!="" && showCategory!=category)){
           return (
             <>
             </>
           )
         } 
         return (
           <>
           <Accordian setShowCategory = {setShowCategory} key={idx} category={category} topics={state[idx].topics}/>
           </>
         )
       })
     }
     </div>
    </>
  );
}

export default TopicList;