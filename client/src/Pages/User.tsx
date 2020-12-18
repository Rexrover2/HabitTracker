import React, { useState } from 'react';
import Hexagon from 'react-hexagon';
import MainNavbar from './Navbar';
import Footer from './Footer';
//style={{ stroke: '#ffe802' }} 
const MyHexagon = () => {
  const [selected, setSelected] = useState<boolean>(false);
  const handleClick = () => {setSelected(!selected)};

  const colourScheme = {
    unselected: {
      stroke: '#993300',
      fill: '#808080',
    },
    selected: {
      stroke: '#ffe802',
      fill: '#ff8e02',
    },
  };

  return (
    <Hexagon
      flatTop={true}  
      style={{
        padding:"0.5em",
        ...(selected ? colourScheme.selected : colourScheme.unselected),
        strokeWidth:20,
        minHeight:"150px",
        diagonal:50
      }}
      onClick={handleClick}
    >
      <text x="50%" y="50%">1</text>
    </Hexagon>
  );
};

const HabitBoard = () => {};

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
        Hi
        <div style={{ padding: '2em', minHeight:"300px", width:"100%"}}>
          {/* <Hexagon
            style={{
              padding:"0.5em",
              stroke: '#ffe802', 
              minHeight:"300px",
              fill:"#ffe802"
            }}
          /> */}
          <MyHexagon/>
          Hi
        </div>
      </div>
      <Footer as="footer" />
    </div>
  );
};

export default User;
