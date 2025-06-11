
import React from 'react';
import Banner from './Banner';
import Featured from './Featured';
// import CategoriesList from './CategoriesList';
import ExtraSections from './ExtraSections';
import ExtraSections2 from './ExtraSections2';
import ShowCategory from './ShowCategory';

const Home = () => {
  return (
    <div>
      <Banner/>
      <Featured></Featured>
      <ShowCategory/>
      {/* <CategoriesList/> */}
      <ExtraSections/>
      <ExtraSections2/>
    </div>
  );
};

export default Home;