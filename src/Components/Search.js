import React, { useState } from 'react';
import '../CSS/Search.css';
function Search(props) {
  const searchHandler = (e) => {
    props.onSearch(e.target.value.toUpperCase());
  };
  return (
    <div className="input-group mb-3 mx-auto mt-4 " >
      <input
        type="text"
        className="form-control"
        placeholder="Search Products.."
        onChange={searchHandler}
        id='search-product' 
      />
    </div>
  );
}
export default Search;
