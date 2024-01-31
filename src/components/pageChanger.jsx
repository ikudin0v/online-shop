import React from 'react';
import MainPage from './mainPage';

const PageChanger = ({match}) => {


	if (match.params.page === "male") {
		return ( <MainPage sex={match.params.page} /> )
	} else if (match.params.page === "female") {
		return ( <MainPage sex={match.params.page} /> )
	}else if (match.params.page === "kids")
	return ( <MainPage sex={match.params.page} /> )
	// return ( <div>MAIN</div> )
}
 
export default PageChanger;