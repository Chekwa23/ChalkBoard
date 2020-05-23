import React, { Component } from 'react';
import TopNavBar from './TopNavBar';
// import Sidebar from './SideBar';
import LoginScreen from './LoginScreen';

//side bar menu
const sideBarModule = [
    {
        name: "dashboard",
        description: "Dashboard"
    },
    {
        name: "courses",
        description: "Courses"
    },
    {
        name: "announcement",
        description: "Announcement"
    },
    {
        name: "help",
        description: "Help"
    },
]

export class Home extends Component {
    render() {
        return (
            <div>
                <TopNavBar/>
                {/* <Sidebar sideBarModule={sideBarModule}/> */}
                <LoginScreen />
            </div>
        )
    }
}

export default Home