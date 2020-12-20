import React from 'react';
import MainNavbar from './Navbar';
import Footer from './Footer';
import ExampleHexagon from '../Components/ExampleHexagons';
import HabitBoard from '../Components/HabitBoard';

const User: React.FC<undefined> = () => {
  return (
    <div
      className="App"
      style={{ display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}
    >
      <MainNavbar as="header" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          alignItems: 'center',
        }}
      >
        {/* <ExampleHexagon/> */}
        <div style={{ padding: '2em', minHeight: '300px', width: '100%' }}>
          {/* <Hexagon
            style={{
              padding:"0.5em",
              stroke: '#ffe802', 
              minHeight:"300px",
              fill:"#ffe802"
            }}
          /> */}
          <HabitBoard />
        </div>
      </div>
      <Footer as="footer" />
    </div>
  );
};

export default User;
