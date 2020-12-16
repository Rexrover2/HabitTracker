import React from 'react'
import { Menu, Image, Button } from 'semantic-ui-react';
import profileImage from '../Assets/profileIcon.png';
import websiteImage from '../Assets/websiteIcon.jpg';

interface Props {
    children:  React.ReactNode;
    style: object;
}

const Navbar: any = (props:Props) => {
    return (
        <Menu 
            {...props}
            style={{
                ...props.style,
                display:"flex", 
                justifyContent:"center",
                alignItems:"center"
            }}
            
        />
    );
}

const Left: React.FC<Props> = (props) => {
    return (
        <Menu.Menu
            position="left"
            {...props}
            style={{
                ...props.style,
                display:"flex", 
                justifyContent:"center",
                alignItems:"center"
            }}
            
        />
    );
}

const Center: React.FC<Props> = (props) => {
    return (
        <Menu.Menu 
            {...props}
            style={{
                ...props.style,
                display:"flex", 
                justifyContent:"center",
                alignItems:"center"
            }}
            
        />
    );
}

const Right: React.FC<Props> = (props) => {
    console.log(props)
    return (
        <Menu.Menu 
            position="right"
            {...props}
            style={{
                ...props.style,
                display:"flex", 
                justifyContent:"center",
                alignItems:"center"
            }}
            
        />
    );
}

const WebsiteButton: React.FC<Props> = (props) => {
    return (
        <Button>
            <Image src={websiteImage} style={{width:48, height:48}}/>
        </Button>
    );
}

const ProfileButton: React.FC<Props> = (props) => {
    return (
        <Button style={{margin:"0.25em", padding:0, borderRadius:"50%",width:48, height:48}}>
            <Image src={profileImage} style={{borderRadius:"50%", width:"100%", height:48}}/>
        </Button>
    );
}

Navbar.Left = Left;
Navbar.Right = Right;
Navbar.Center = Center;
Navbar.WebIcon = WebsiteButton;
Navbar.ProfileIcon = ProfileButton;
export default Navbar;