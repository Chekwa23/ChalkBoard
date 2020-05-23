import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginScreen.css';

import {Button, Form, InputGroup, FormControl, Image} from 'react-bootstrap';
import Link from 'react-router-dom/Link';

class LoginScreen extends Component {
  constructor(props){
    super(props);
    
    this.studentRef = React.createRef();
    this.instructorRef = React.createRef();
    this.state = {
      Username:'',
      Password:'',
      fullName:'',
      finalStr:'',
      dataStr:'',
      dataArray:[],
      usefulStr:''
    };
  }

  changeHandler = async (e) =>{
    await this.setState({[e.target.name]: e.target.value});
    this.argumentString();
  }

  parseString = (e) =>{
    var unParsedStr = this.state.dataStr;
    var parsedStr = unParsedStr.substr(1,unParsedStr.length-2);
    var splitStr = parsedStr.split(",");
    var finalParsed = [];

    splitStr.forEach(element => {
      element = element.slice(1,element.length-1);
      element = element.replace('":"', "=");
      finalParsed.push(element);
    });
    
    var fname = finalParsed[1].split("=");
    var lname = finalParsed[0].split("=");
    var fullname = ""+fname[1]+" "+lname[1];

    var retVal = ""+finalParsed[0]+"&"+finalParsed[1]+"&"+finalParsed[2]+"&"+finalParsed[4]+"&"+finalParsed[5];
    this.setState({dataArray:finalParsed, usefulStr:retVal, fullName:fullname});
  }

  submitHandler = (e) =>{
    e.preventDefault();
    axios.post(this.state.finalStr)
    .then(response => {
      var str = JSON.stringify(response.data);
      this.setState({dataStr: str});
      
      if(response.data == "Invalid Username or Password\n"){
        alert(response.data);
      }
      else{
        this.parseString();
        if(this.state.dataArray[2] == "Role=student"){
          this.studentRef.current.click();
        }
        else if(this.state.dataArray[2] == "Role=instructor"){
          this.instructorRef.current.click();
        }
      }
      
    })
    .catch(error =>{
      alert(error);

    });
  }

  argumentString = () =>{
    var initialStr = "http://coms-319-050.cs.iastate.edu:8080/Chalkboard/Login?";
    var argumentStr = "Username="+this.state.Username+"&Password="+this.state.Password;
    var retVal = initialStr.concat(argumentStr);
    this.setState({finalStr: retVal});
  }

  triggerClick = () =>{
    var homeLink = this.refs.triggerLink;
    homeLink.click();
  }


  render() {
    return (
      <div class="wholePage">
        <Form onSubmit={this.submitHandler} class="form" className=" text-danger text-center">
          <Image className="pb-4" src={logo} heigth="150px" width="150px" alt="logo"></Image>
          <h4 className="mb-3 font-weight-bold"> Welcome To ChalkBoard 2.0</h4>
          <h6 className="mb-3"> Student/Instructor</h6>

          <InputGroup className="mb-3">
            <FormControl type="text" name="Username" onChange={this.changeHandler} placeholder="UserID" label="Username" required></FormControl>
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl type="password" name ="Password" onChange={this.changeHandler} placeholder="Password" label="Password" required></FormControl>
          </InputGroup>
          
          <div className="mb-3">
            <span><input type="checkbox" value="remember-me"/>Remember me</span>
          </div>
          <div className="mb-3">
            <Button type="submit" name="submitButton" variant="danger" size="lg" block>Sign in</Button>
            <Link to={{pathname:'./Home', state: {linkFullName: this.state.fullName, 
                                                  linkUserId: this.state.Username, 
                                                  linkPassword: this.state.Password}}} ref={this.studentRef}></Link>
            <Link to={{pathname:'./InstructorHome', state: {linkFullName: this.state.fullName, 
                                                            linkUserId: this.state.Username, 
                                                            linkPassword: this.state.Password}}} ref={this.instructorRef}></Link>
          </div>
          <div className="mb-3 mt-5">
            <p className="text-muted">&copy; G13 2020</p>
          </div>
        </Form>
      </div>
    );
  }
}

export default LoginScreen;

