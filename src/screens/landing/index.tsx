import React, { useContext } from "react";
import SearchBar from "../../componets/SearchBar";
import { AppContext } from "../../providers/AppProvider";
import addIcon from "../../assets/images/addIcon.png";
import ClientInstaceModal from "../../componets/ClientInstaceModal";

const LandingPage = () => {
  const { current, send } = useContext(AppContext);

  return (
    <div className="landingPageContainer">
      <div className="optionRow">
        <SearchBar current={current} send={send}></SearchBar>
        <img
          className="addIcon"
          src={addIcon}
          alt="Add Icon"
          onClick={() =>
            send("TOGGLE_MODAL", { title: "Add Entity", modalData: {} })
          }
        />
        <ClientInstaceModal current={current} send={send}></ClientInstaceModal>
      </div>
    </div>
  );
};

export default LandingPage;
