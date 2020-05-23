import React from 'react';
import {Component} from 'react';
import ReactDOM from 'react-dom';
// import NewSideBar2 from './NewSideBar2.js';
// import TopNavBar from './TopNavBar.js';
import './ChatBox.css';

// var url = "http://coms-319-050.cs.iastate.edu:8080/Chalkboard";
// var url = window.location.href;
var url = "ws://localhost:8080";
var client;

class ChatBox extends Component {
    constructor(){
        super();
        // this.state = {
        //     msg : '', 
        //     username : prompt("What is your username?")
        // };
    };
    connect () {
        var username = document.getElementById("username").value;
    
        var host = document.location.host;
        var pathname = document.location.pathname;
        
        client = new WebSocket(url + "/chat/" + username);
        // ws = new WebSocket("ws://coms-319-050.cs.iastate.edu:8080/Chalkboard/chat/" + username);

        client.onmessage = function(event) {
            var log = document.getElementById("log");
                console.log(event.data);
                log.innerHTML += event.data + "\n";
        };
    };

    send () {
        var context = document.getElementById("msg").value;
        client.send(context);
    };
    
    render() {
        return (
            <>
                {/* <TopNavBar fullname={this.state.fullname} />
                <NewSideBar2 /> */}
                <div className = "chatpage">
                        <h2>Chat with your Class!</h2>
                        <input type="text" className="username" placeholder="Username"/>
                        <button type="button" className="connectButtton" onClick={() => this.connect() } >Connect</button>
                        <br />
                        <textarea readOnly rows="10" cols="80" className="log">
                        </textarea>
                        <br />
                        <input type="text" size="51" className="msg" placeholder="Message"/>
                        <button type="button" className="sendButton" onClick={() => this.send() } >Send</button>
                        <br/>
                </div>  
            </>   
        )
    };
}

export default ChatBox;