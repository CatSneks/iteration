import React, { useState } from 'react';

function VibeDropDown({ options, updateVibe, className }) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    updateVibe(value);
  };

  return (
    <select
      name='vibes'
      id='vibes'
      value={selectedValue}
      onChange={handleChange}
      defaultValue=''
      className={`w-full p-4 border border-gray-200 rounded-xl text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
        className || ''
      }`}
    >
      <option value='' disabled>
        Choose a mood...
      </option>
      {Object.keys(options).map((key) => (
        <option key={key} value={key}>
          {key}
        </option>
      ))}
    </select>
  );
}

export default VibeDropDown;
