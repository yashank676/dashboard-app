import React, { useState } from 'react';
import "./yearcalendar.css"


const YearCalendar = ({ onSelectYears }) => {
  const years = [];
  const currentYear = new Date().getFullYear();

  for (let year = currentYear; year >= currentYear - 20; year--) {
    years.push(year);
  }

  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');

  const handleStartYearChange = (e) => {
    const selectedValue = e.target.value;
    setStartYear(selectedValue);
  };

  const handleEndYearChange = (e) => {
    const selectedValue = e.target.value;
    setEndYear(selectedValue);
  };

  const handleApplyClick = () => {
    if (startYear && endYear && parseInt(startYear) <= parseInt(endYear)) {
      onSelectYears(parseInt(startYear),parseInt(endYear));
    } else {
      alert('Please select valid years.');
    }
  };

  return (
    <div className="year-calendar">
      <div className="year-dropdown">
        <label htmlFor="start-year">Start Year:</label>
        <select
          id="start-year"
          value={startYear}
          onChange={handleStartYearChange}
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="year-dropdown">
        <label htmlFor="end-year">End Year:</label>
        <select id="end-year" value={endYear} onChange={handleEndYearChange}>
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleApplyClick}>Apply</button>
    </div>
  );
};

export default YearCalendar;
