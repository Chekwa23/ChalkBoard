import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginScreen.css';

import TopNavBar from './TopNavBar';
import MainFooter from './MainFooter';

import {Button, Container, Table, InputGroup, FormControl} from 'react-bootstrap';
import Link from 'react-router-dom/Link';

export const addedCourses = [];

var x = 0;

function compare( a, b ){
  if ( a.Code < b.Code ){
    return -1;
  }
  if ( a.Code > b.Code ){
    return 1;
  }
  return 0;
}

class CoursesEnrolledPage extends Component {
  constructor(props){
    super(props);
    const {linkFullName} = this.props.location.state;
    const {linkUserId} = this.props.location.state;
    const {linkPassword} = this.props.location.state;
    this.state={
      jsonList:[],
      fullName:linkFullName,
      userId:linkUserId,
      password:linkPassword,
      classToDelete:'',
      urlPart1:'&Password=',
      urlPart2:'&studentUsername=',
      urlPart3:'&Code=',
      viewEnrolledPostURL:'http://coms-319-050.cs.iastate.edu:8080/Chalkboard/ViewEnrolled?Username=',
      deleteEnrolledPostURL: 'http://coms-319-050.cs.iastate.edu:8080/Chalkboard/DeleteEnrolled?Username='
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

  componentDidMount(){
    x = 0;
  }

  increaseCount(){
    x++;
    return x;
  }

  instantiateX(){
    x = 0;
  }

  render() {
      return (
      <div>
        <TopNavBar fullname={this.state.fullName} userID={this.state.userId} passWord={this.state.password} />
        <div className="container-fluid">
          <div className="row mb-2">
              <div className="col-sm-7">
                <h1 className="m-0 text-dark">ALL COURSES</h1>
              </div>
              <div className="col-sm-5">
                  <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item"><Link to={{pathname:"./Home", state: {linkFullName: this.state.fullName, 
                                                                                              linkUserId: this.state.userId, 
                                                                                              linkPassword: this.state.password}}}>Home</Link></li>
                      <li className="breadcrumb-item active">All Courses</li>
                  </ol>
              </div>
          </div>
        </div>
        <Container class="card">
          <div className="card-header">
            <h5>Below are a list of all the courses you are enrolled in.</h5>
          </div>
          <div className="card-body">
            <Table>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Description</th>
                  <th>TotalPoints</th>
                </tr>
              </thead>
              <tbody>
                {this.instantiateX()}
                {this.state.jsonList.map((i)=>(
                  <tr>
                      <td>{this.increaseCount()}</td>
                      <td><Link to={{ pathname: '/CoursePage', state: {linkClassCode: i.Code, 
                                                                      linkFullName: this.state.fullName, 
                                                                      linkUserId: this.state.userId, 
                                                                      linkPassword: this.state.password} }} style={{color:"black"}}>{i.Code}</Link></td>
                      <td>{i.Name}</td>
                      <td>{i.Description}</td>
                      <td>{i.TotalPoints}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="card-footer">
            <InputGroup>
                <InputGroup.Prepend>
                  <Link to={{ pathname: '/AddCourse', state: {linkFullName: this.state.fullName, 
                                                                  linkUserId: this.state.userId, 
                                                                  linkPassword: this.state.password} 
                                                                  }} style={{color:"black"}}><Button variant='danger'>Add Course</Button></Link>
                </InputGroup.Prepend>

                <FormControl onChange={(e) => {
                    this.setState({classToDelete: e.target.value});
                }} type="text" placeholder="Course to delete"aria-label="With textarea" />

                <InputGroup.Append>
                  <Button onClick={(e) => {
                      axios.post(this.state.deleteEnrolledPostURL+this.state.userId+this.state.urlPart1+this.state.password+this.state.urlPart2+this.state.userId+this.state.urlPart3+this.state.classToDelete)
                      .then(response => {
                          alert(response.data);
                      })
                      .catch(error =>{
                          alert(error);
                      });
                      }}variant="outline-danger">Delete Course</Button>
                </InputGroup.Append>
              </InputGroup>
          </div>
        </Container>
        <MainFooter />
      </div>
    );
  }
}

export default CoursesEnrolledPage;