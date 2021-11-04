import React, {useContext} from 'react'
import SearchBar from '../../componets/searchBar';
import { AppContext } from '../../providers/AppProvider';
import addIcon from '../../assets/images/addIcon.png'




const LandingPage = () => {
    const {current, send} = useContext(AppContext);


    return <div className="landingPageContainer">
        <div className="optionRow">
            <SearchBar current={current} send={send}></SearchBar>
            <img className="addIcon" src={addIcon} alt="Add Icon" onClick={() => send('TOGGLE_MODAL', {title: 'Add Entity', modalData:{}})}/>
        </div>
    </div>
}

export default LandingPage;