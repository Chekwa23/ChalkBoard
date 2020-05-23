import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo/logo.png';
import {Nav, Navbar, NavDropdown, Image} from 'react-bootstrap';
import Link from 'react-router-dom/Link';

function compare( a, b ){
    if ( a.Code < b.Code ){
      return -1;
    }
    if ( a.Code > b.Code ){
      return 1;
    }
    return 0;
}

class TopNavBar extends Component {
    constructor(props){
        super(props);
        this.state={
            jsonList:[],
            fullName:this.props.fullname,
            userId:this.props.userID,
            password:this.props.passWord,
            urlPart1:'&Password=',
            viewEnrolledPostURL:'http://coms-319-050.cs.iastate.edu:8080/Chalkboard/ViewEnrolled?Username='
        };

        axios.post(this.state.viewEnrolledPostURL+this.state.userId+this.state.urlPart1+this.state.password)
        .then(response => {
            this.setState({jsonList:response.data});
            this.state.jsonList.sort(compare);
        })
        .catch(error =>{
            alert(error);
        });

        
    }

    render() {
        return (
            <div class="TopNavBar" className="sticky-top mb-2">
                <div class="TopNavBar" className="sticky-top mb-2">
                    <Navbar style={navbarheight}  expand="lg">
                        <Navbar.Brand style={titleText}>ChalkBoard <Image className="pb-3" src={logo} heigth="35px" width="35px" alt="logo"></Image></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link style={items}><Link to={{pathname:"./Home", state:{linkFullName: this.state.fullName, 
                                                                                            linkUserId: this.state.userId, 
                                                                                            linkPassword: this.state.password}}} style={{color:"black"}}>DashBoard</Link></Nav.Link>
                                <NavDropdown style={items} title="Courses" id="basic-nav-dropdown">
                                    {this.state.jsonList.map((i) => (
                                        <NavDropdown.Item ><Link to={{pathname:"./CoursePage", state:{linkClassCode: i.Code, 
                                                                                                    linkFullName: this.state.fullName, 
                                                                                                    linkUserId: this.state.userId, 
                                                                                                    linkPassword: this.state.password}}} style={{color:"black"}}>{i.Code}</Link></NavDropdown.Item>
                                        ))
                                    }
                                    <NavDropdown.Divider />
                                <NavDropdown.Item ><Link to={{pathname: "./CoursesEnrolledPage", state:{linkFullName: this.state.fullName, 
                                                                                                                linkUserId: this.state.userId, 
                                                                                                                linkPassword: this.state.password}}} style={{color:"black"}}>All Courses</Link></NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <NavDropdown style={nameTag} title={"Signed in as "+this.props.fullname} id="basic-nav-dropdown">
                                <NavDropdown.Item href="./">Sign Out</NavDropdown.Item>
                            </NavDropdown>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>
        )
    }
}

const navbarheight = {
    backgroundColor: '#c8102e',
    borderBottom: '15px solid #F1BE48'
}

const titleText = {
    paddingLeft: '10px',
    color: '#F1BE48',
    textShadow: '1px 1px 2px #000000',
    fontSize: '300%'
}

const items = {
    paddingLeft: '25px',
    fontSize: '15px',
    fontWeight: 'bold',
    color: 'black'
}

const nameTag = {
    float: 'right',
    color: 'black',
    textShadow: '1px 1px 2px #000000'
}

export default TopNavBar;

