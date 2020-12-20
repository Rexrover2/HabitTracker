import React from 'react';
import MainNavbar from './Navbar';
import Footer from './Footer';
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
        <div style={{ margin:'2em',}}>
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
