import React from 'react';
import {Component} from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
// import axios from 'http://unpkg.com/axios/dist/axios.min.js';
// import NewSideBar2 from './NewSideBar2.js';
// import TopNavBar from './TopNavBar.js';
import './ChatBox.css';

// var url = "http://coms-319-050.cs.iastate.edu:8080/Chalkboard";
var url = "ws://localhost:8080";

class ChatBox extends Component {
    constructor(){
        super();
        this.state = {
            msg : '', 
            username : prompt("What is your username?")
        };
        this.client = new WebSocket(url + "/chat/" + this.state.username.value);
    };
    componentWillMount() {
        this.client.onopen = () => {
            console.log(this.state.username.toString() + ' Connected');
        };
        this.client.onmessage = (message) => {
            var log = document.getElementById("log");
            console.log(message);
            log.innerHTML += message + "\n";
        };
    };

    send () {
        var context = document.getElementById("msgBox").value;
        this.client.send(context);
    };

    // assigns firstname lastname and full name
    // async getFullName (){
    //     const qStr = window.location.search;
    //     const urlParam = new URLSearchParams(qStr);
    //     await this.setState({ lastname : urlParam.get('Lname'), firstname : urlParam.get('Fname') });
    //     let str = this.state.firstname + this.state.lastname;
    //     await this.setState({fullname: str})
    // }; 

    // assigns username
    // async getUsername (){
    //     const qStr = window.location.search;
    //     const urlParam = new URLSearchParams(qStr);
    //     await this.setState({ username : urlParam.get('Username')});
    // }; 

    // assigns the current class
    // async getCurrentClass (){
    //     const qStr = window.location.search;
    //     const urlParam = new URLSearchParams(qStr);
    //     await this.setState({ curClass : urlParam.get('ClassName')});
    // };
    
    render() {
        return (
            <>
                {/* <TopNavBar fullname={this.state.fullname} /> */}
                {/* <NewSideBar2 /> */}
                <div id = "chatpage">
                    <div>
                        <h2>Chat with your Class!</h2>
                        <br />
                        <textarea readOnly rows = "17" cols = "100" id = "log">
                        </textarea>
                        <br/>
                        <input
                            id = "msgBox"
                            type = "text"
                            placeholder = "Type message here"
                            size = "95"
                        ></input>
                        <button id = "sendButton" onClick= { () => this.send() } >Send</button>                     
                        <br/>
                    </div> 
                </div>  
            </>   
        )
    };
}


export default ChatBox;
