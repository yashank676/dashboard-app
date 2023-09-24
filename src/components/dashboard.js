import React, { useEffect, useState } from 'react';
import Dropdown from './dropdown';
import ChartComponent from './chartComponent';
import Loading from './loading';
import YearCalendar from './yearcalendar';

const Dashboard = () => {
  
  const [selectedOption, setSelectedOption] = useState('intensity');
  const [data,setData] = useState();
  const [years,setYears] = useState([1000,2023]);
  const[wholeData,setWholeData] = useState();
  const handleOptionSelect = (selectedValue) => {
    setSelectedOption(selectedValue);
  };
  
  useEffect(()=>{
    const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const responseData = await response.json();
          setData(responseData)
          setWholeData(responseData)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
  },[]);

  useEffect(()=>{
    if(wholeData){
      const filteredData = wholeData.filter((item) => {
        if(item.start_year=='' && item.end_year=='')return 1;
        else if(item.start_year=='')return item.end_year <= years[1];
        else if(item.end_year=='')return item.start_year >= years[0];
        return item.start_year >= years[0] && item.end_year <= years[1];
      });
      setData(filteredData);
    }
    
  },[years[0],years[1]])

  const topicCounts = [];
  const newData = [];
  if(data){
    data.forEach((document)=>{
      const topic = document.topic;
      const country = document.country;
      if(!topicCounts[topic]){
        topicCounts[topic] = {
          "topic": topic,
          "number of countries": 1
        };
      }
      else topicCounts[topic]["number of countries"]++;
      topicCounts["number of countries"] = topicCounts[topic];
    });
    Object.keys(topicCounts).forEach((key) => {
      const value = topicCounts[key];
      newData.push(value);
    });
  }
  const filteryears = (startyear,endyear) => {
    setYears([startyear,endyear])
  }
  return (
    <div>
      <h1>Data Visualization Dashboard</h1>
      
      <YearCalendar onSelectYears={filteryears}/>
      <h2>Number of countries having same topics to be addressed</h2>
      {!data ? 
        <Loading/>
        :
        <ChartComponent data={newData} selectedOption={"number of countries"}/>
      }
      <Dropdown
        onSelect={handleOptionSelect}
      />
      <h2>Bar Graph of {selectedOption} of topic for each country</h2>
      {!data ? 
        <Loading/>
        :
        <ChartComponent data={data} selectedOption={selectedOption}/>
      }
      
    </div>
  );
};

export default Dashboard;
