import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchBox(props) {
  const [searchText, setSearchText] = useState('');

  const handleChange = (event) => {
    setSearchText(event.target.value);
    // Perform any additional actions on change, such as filtering data
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type='text'
        placeholder={props.placeholder}
        value={searchText}
        onChange={handleChange}
        style={{
          padding: '5px',
          borderRadius: '3px 0 0 3px',
          border: '1px solid #ccc',
          borderBottom: '1px solid #ccc',
          width: '200px',
        }}
      />
      <button
        style={{
          padding: '10px 10px',
          borderRadius: '0 3px 3px 0',
          border: 'none',
          backgroundColor: '#0074D9',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        <FaSearch />
      </button>
    </div>
  );
}

export default SearchBox;
