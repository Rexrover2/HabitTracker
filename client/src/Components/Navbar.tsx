import React from 'react'
import { Menu, Image, Button } from 'semantic-ui-react';
import profileImage from '../Assets/ProfileIcon.svg';
import websiteImage '../Assets/websiteIcon.jpg';

interface Props {
    children:  React.ReactNode
}

const Navbar: React.FC<Props> = (props) => {
    return (
        <Menu 
            as="header" 
            {...props}
            style={{
                display:"flex", 
                justifyContent:"center"
            }}
        />
    );
}

const Left: React.FC<Props> = (props) => {
    return (
        <Menu.Menu
            as="header" 
            position="left"
            {...props}
            style={{
                display:"flex", 
                justifyContent:"center"
            }}
        />
    );
}

const Center: React.FC<Props> = (props) => {
    return (
        <Menu.Menu 
            as="header" 
            {...props}
            style={{
                display:"flex", 
                justifyContent:"center"
            }}
        />
    );
}

const Right: React.FC<Props> = (props) => {
    return (
        <Menu.Menu 
            as="header" 
            position="right"
            {...props}
            style={{
                display:"flex", 
                justifyContent:"center"
            }}
        />
    );
}

const websiteButton: React.FC<Props> = (props) => {
    return (
        <Button>
            <Image src={websiteImage}/>
        </Button>
    );
}

const profileButton: React.FC<Props> = (props) => {
    return (
        <Button>
            <Image src={profileImage} style={{borderRadius:"50%"}}/>
        </Button>
    );
}


export default Navbar;