import React from 'react';
import MainNavbar from './Navbar';
import Footer from './Footer';

interface Props {
  page: string;
  extra?: React.ReactNode;
}

const Layout: React.FC<Props> = (props) => {
  const centerflex = {
    maxWidth: '300px',
    padding: '1.2em',
    width: '100%',
    border: '2px solid #ccc',
    borderRadius: '5px',
  };
  return (
    <div
      className="App"
      style={{ display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}
    >
      <MainNavbar as="header" page={props.page} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '100vh',
          alignItems: 'center',
        }}
      >
        <div style={centerflex}>
          <div style={{ width: '100%' }}>{props.children}</div>
        </div>
        {props.extra}
      </div>
      <Footer as="footer" />
    </div>
  );
};

export default Layout;
