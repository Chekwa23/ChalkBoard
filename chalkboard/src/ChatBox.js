import React, {Component} from 'react';
import TopNavBar from './TopNavBar';
import './adminlteCustom.css';
import {Container} from 'react-bootstrap';
import Link from 'react-router-dom/Link';
import MainFooter from './MainFooter';
// import './ChatBox.css';

/* use on server */
// var url = "ws" + window.location.href.substring(4); /* changes http to ws in the beginning of the url */
var url = "ws://coms-319-050.cs.iastate.edu:8080";
/* use for local testing */
// var url = "ws://localhost:8080"
var client;

class ChatBox extends Component {
    constructor(props){
        super(props);
        const {linkClassCode} = props.location.state;
        const {linkFullName} = props.location.state;
        const {linkUserId} = props.location.state;
        const {linkPassword} = props.location.state; 
        this.state = {
            fullName:linkFullName,
            userId:linkUserId,
            password:linkPassword,
            class:linkClassCode
        }
    };

    connect () {
    
        var host = document.location.host;
        var pathname = document.location.pathname;

        var newURL = url + "/chat/" + this.state.class + "/" + this.state.userId;

        console.log("Connecting to " + newURL);
        
        client = new WebSocket(newURL);

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

    disconnect () {
        console.log("Disconnecting Web Socket");
        client.close();
    };
    
    render() {
        return (
            <div>
                <TopNavBar fullname={this.state.fullName} userID={this.state.userId} passWord={this.state.password} />
                <Container className="container-fluid">
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-7">
                                <h1 className="m-0 text-dark">{this.state.class} Class Chat</h1>
                                </div>
                                <div className="col-sm-5">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><Link to={{pathname:"./Home", state: {linkFullName: this.state.fullName, 
                                                                                                                linkUserId: this.state.userId, 
                                                                                                                linkPassword: this.state.password}}}>Home</Link></li>
                                        <li className="breadcrumb-item"><Link to={{pathname:'/CoursePage', state: {linkFullName: this.state.fullName, 
                                                                                                                linkUserId: this.state.userId, 
                                                                                                                linkPassword: this.state.password,
                                                                                                                linkClassCode: this.state.class}}}>Course Dashboard</Link></li>
                                        <li className="breadcrumb-item active">Class Chat</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="card mt-3">
                            <div className="card-header border-transparent">
                                <h3 className="card-title">Chat with your Class!</h3>
                            </div>
                            <div className="card-body p-0" id="chat">
                                <h3 className="card-title mb-4">&ensp; Click 'Connect' to start chatting!</h3>
                                
                                <div className=" mb-4" style={{paddingLeft:'10px'}}>
                                    <button type="button" id="connectButtton" onClick={() => this.connect() } >Connect</button>
                                    <button type="button" id="disconnectButtton" onClick={() => this.disconnect() } >Disconnect</button>
                                </div>

                                <div className=" mb-4"style={{paddingLeft:'10px'}}>
                                    <textarea readOnly rows="10" cols="80" id="log">
                                    </textarea>
                                </div>
                            </div>
                            <div className="card-footer clearfix">
                                <input type="text" size="51" id="msg" placeholder="Message"/>
                                <button type="button" className="sendButton" onClick={() => this.send() } >Send</button>
                            </div>
                        </div>
                    </div>
                </Container>
                <MainFooter />
            </div> 
        )
    };
}

export default ChatBox;