import React from "react";
import magnify from "../assets/images/magnify.png";

interface SearchBarProps {
  current: any;
  send: any;
}

const SearchBar: React.FC<SearchBarProps> = ({ current, send }) => {
  return (
    <div className="searchBarContainer">
      <img src={magnify} alt="Search Icon" />
      <input placeholder="Search by Client Names" type="text" name="name" />
    </div>
  );
};

export default SearchBar;
