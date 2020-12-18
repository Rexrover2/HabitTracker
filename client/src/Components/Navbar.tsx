import React, { useState } from 'react';
import { Menu, Image, Button, MenuItemProps } from 'semantic-ui-react';
import profileImage from '../Assets/profileIcon.png';
import websiteImage from '../Assets/websiteIcon.jpg';
import { Link } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
  style: object;
  name: string;
}

const Navbar: any = (props: Props) => {
  return (
    <Menu
      {...props}
      style={{
        ...props.style,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0.60em 1em',
      }}
    />
  );
};

const Left: React.FC<Props> = (props) => {
  return (
    <Menu.Menu
      position="left"
      {...props}
      style={{
        ...props.style,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    />
  );
};

const Center: React.FC<Props> = (props) => {
  return (
    <Menu.Menu
      {...props}
      style={{
        ...props.style,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  );
};

const Right: React.FC<Props> = (props) => {
  return (
    <Menu.Menu
      position="right"
      {...props}
      style={{
        ...props.style,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    />
  );
};

const WebsiteButton: React.FC<Props> = (props) => {
  return (
    // <Button
    //   basic
    //   icon
    //   {...props}
    //   as={Link}
    //   to="/"
    //   style={{
    //     boxShadow: 'none',
    //     backgroundColor: 'transparent',
    //     border: 'none',
    //     padding: 0,
    //     width: 45,
    //     height: 45,
    //   }}
    // >
      <Image
        {...props}
        as={Link}
        to="/"
        style={{
          boxShadow: 'none',
          backgroundColor: 'transparent',
          border: 'none',
          padding: 0,
          width: 45,
          height: 45,
        }}
        src={websiteImage}
      />
    // </Button>
  );
};

const ProfileButton: React.FC<Props> = (props) => {
  return (
    <Button circular icon style={{ padding: 0, width: 36, height: 36 }}>
      <Image src={profileImage} style={{ borderRadius: '50%' }} />
    </Button>
  );
};

const SocialButton: React.FC<Props> = (props) => {
  return <Button circular {...props} style={{ marginRight: '0.5em' }} />;
};

const NavLink: React.FC<Props> = (props) => {
  const [selected, setSelected] = useState<null | string>(null);
  const handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: MenuItemProps
  ) => setSelected(data.activeItem);

  return (
    <Menu.Item
      {...props}
      active={selected === props.name}
      as={Link}
      onClick={handleItemClick}
      style={{ fontSize: '17px' }}
    />
  );
};

Navbar.Left = Left;
Navbar.Right = Right;
Navbar.Center = Center;
Navbar.WebIcon = WebsiteButton;
Navbar.ProfileIcon = ProfileButton;
Navbar.SocialIcon = SocialButton;
Navbar.Link = NavLink;
export default Navbar;
