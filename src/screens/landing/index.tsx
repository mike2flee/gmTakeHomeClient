import React, { useContext } from "react";
import SearchBar from "../../componets/SearchBar";
import { AppContext } from "../../providers/AppProvider";
import addIcon from "../../assets/images/addIcon.png";
import ClientInstaceModal from "../../componets/ClientInstaceModal";
import Table from "../../componets/Table";

const LandingPage = () => {
  const { current, send } = useContext(AppContext);

  return (
    <div className="landingPageContainer">
      <div className="optionRow">
        <SearchBar current={current} send={send} />
        <img
          className="addIcon"
          src={addIcon}
          alt="Add Icon"
          onClick={() =>
            send("TOGGLE_MODAL", { title: "Add Entity", modalData: {} })
          }
        />
      </div>
      <Table current={current} send={send} />
      <ClientInstaceModal current={current} send={send} />
    </div>
  );
};

export default LandingPage;
