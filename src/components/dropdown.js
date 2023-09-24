import "./dropdown.css"
import React, { useState } from 'react';

const Dropdown = ({ onSelect }) => {
  const options = ['intensity', 'relevance', 'likelihood'];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    onSelect(selectedValue);
  };
    return (
        <div className="dropdown">
        <label htmlFor="dropdown-select">Select an option:</label>
        <select
          id="dropdown-select"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div> 
      );
  
};

export default Dropdown;
