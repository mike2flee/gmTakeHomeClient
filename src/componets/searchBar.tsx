import React, { useState } from "react";
import magnify from "../assets/images/magnify.png";

interface SearchBarProps {
  current: any;
  send: any;
}

const SearchBar: React.FC<SearchBarProps> = ({ current, send }) => {
  const [clientName, setClientName] = useState("");
  return (
    <div className="searchBarContainer">
      <img
        src={magnify}
        alt="Search Icon"
        onClick={() =>
          send("FIND_BY_CLIENT_NAME", { request: { clientName: clientName } })
        }
      />
      <input
        placeholder="Search by Client Names"
        type="text"
        name="name"
        value={clientName}
        onChange={(e: any) => setClientName(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
