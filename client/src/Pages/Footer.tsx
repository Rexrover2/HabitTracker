import React from 'react';
import Navbar from '../Components/Navbar';

interface Props {
  as: string;
}

const Footer: React.FC<Props> = (props: Props) => (
  <Navbar {...props} attached="bottom" style={{ display: 'flex' }}>
    <Navbar.Left style={{ flex: 1 }}>
      <Navbar.SocialIcon
        color="linkedin"
        icon="linkedin"
        href="https://www.linkedin.com/in/lawrenceleong5/"
      />
      <Navbar.SocialIcon
        color="github"
        icon="github"
        href="https://github.com/Rexrover2"
      />
    </Navbar.Left>

    <Navbar.Center style={{ flex: 1 }}></Navbar.Center>

    <Navbar.Right style={{ flex: 1 }}></Navbar.Right>
  </Navbar>
);

export default Footer;