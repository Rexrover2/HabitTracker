import React, {useState}from 'react'
import logo from '../logo.svg';
import { Menu, MenuItemProps } from 'semantic-ui-react'

interface MainProps {

}

const Main: React.FC<MainProps> = ({}) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, data: MenuItemProps) => setActiveItem(data.activeItem);
  return (
    <div className="App">
        <Menu as="header" style={{display:"flex", justifyContent:"center"}}>
          <Menu.Item
            name='editorials'
            active={activeItem === 'editorials'}
            onClick={handleItemClick}
          >
            Editorials
          </Menu.Item>

          <Menu.Item
            name='reviews'
            active={activeItem === 'reviews'}
            onClick={handleItemClick}
          >
            Reviews
          </Menu.Item>

          <Menu.Item
            name='upcomingEvents'
            active={activeItem === 'upcomingEvents'}
            onClick={handleItemClick}
          >
            Upcoming Events
          </Menu.Item>
        </Menu>
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to the main page!</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
    </div>
  );
};

export default Main;