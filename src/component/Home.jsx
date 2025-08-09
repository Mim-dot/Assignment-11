
import React from 'react';
import Banner from './Banner';
import Featured from './Featured';

import ExtraSections from './ExtraSections';
// import ExtraSections2 from './ExtraSections2';
import ShowCategory from './ShowCategory';
import WeeklyChallenge from './WeeklyChallenge';

const Home = () => {
    document.title = "Home";
  return (
    <div>
      <Banner/>
      <Featured></Featured>
      <ShowCategory/>
     
      <ExtraSections/>
      {/* <ExtraSections2/>  */}
      <WeeklyChallenge/>
    </div>
  );
};

export default Home;