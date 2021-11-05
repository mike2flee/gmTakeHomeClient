import React, { useState } from "react";
import magnify from "../assets/images/magnify.png";
import reset from "../assets/images/reset.png";

interface SearchBarProps {
  current: any;
  send: any;
}

const SearchBar: React.FC<SearchBarProps> = ({ current, send }) => {
  const [clientName, setClientName] = useState("");
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      send("FIND_BY_CLIENT_NAME", { request: { clientName: clientName } });
    }
  };

  return (
    <div className="searchBarContainer">
      <input
        placeholder="Search by Client Names"
        type="text"
        name="name"
        value={clientName}
        onChange={(e: any) => setClientName(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <img
        src={magnify}
        alt="Search Icon"
        onClick={() =>
          send("FIND_BY_CLIENT_NAME", { request: { clientName: clientName } })
        }
        style={{ marginRight: "20px" }}
      />
      <img src={reset} alt="Reset Icon" onClick={() => send("GET_ALL")} />
    </div>
  );
};

export default SearchBar;
