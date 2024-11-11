import React, { useState } from 'react';

function VibeDropDown({ options, updateVibe }) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
  };
  return (
    // <option value='' disabled>
    //   choose one
    // </option>
    <select name='vibes' id='vibes'>
      <option value='first vibe'></option>
      <select
        name='vibe'
        id='vibe'
        value={selectedValue}
        onChange={handleChange}
      ></select>
      {/*add the input box for the habit to be created**/}
      {Object.keys(options).map((key) => (
        <option key={key} value={key}>
          {key}
        </option>
      ))}
    </select>
  );
}

export default VibeDropDown;
