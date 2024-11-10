import React, { useState } from 'react';

function VibeDropDown({ options, updateVibe }) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    updateVibe(value);
    setSelectedValue(value);
  };

  return (
    <div>
      <label>Choose Vibe</label>
      <select value={selectedValue} onChange={handleChange}>
        <option value='' disabled>
          Select an option
        </option>
        {Object.keys(options).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
}

export default VibeDropDown;
