import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginScreen.css';

import InstructorTopNavBar from './InstructorTopNavBar';
import MainFooter from './MainFooter';

import {Button, FormControl, InputGroup, Container, Table} from 'react-bootstrap';
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

class InstructorStudentList extends Component {
  constructor(props){
    super(props);
    const {linkClassCode} = this.props.location.state;
    const {linkFullName} = this.props.location.state;
    const {linkUserId} = this.props.location.state;
    const {linkPassword} = this.props.location.state;
    this.state = {
      jsonList:[],
      fullName:linkFullName,
      userId:linkUserId,
      password:linkPassword,
      class:linkClassCode,
      urlPart1:'&Password=',
      urlPart2:'&Code=',
      urlPart3:'&userToAdd=',
      urlPart4:'&studentUsername=',
      urlPart5:'&pointsToAdd=',
      studentsPostURL:'http://coms-319-050.cs.iastate.edu:8080/Chalkboard/GetEnrolledByClass?Username=',
      addEnrolledPostURL:'http://coms-319-050.cs.iastate.edu:8080/Chalkboard/AddEnrolled?Username=',
      deleteEnrolledPostURL:'http://coms-319-050.cs.iastate.edu:8080/Chalkboard/DeleteEnrolled?Username=',
      changeGradePointPostURL:'http://coms-319-050.cs.iastate.edu:8080/Chalkboard/ChangeGradePoint?Username=',
      studentID:'',
      studentIdToChangeGrade:'',
      pointsToAdd:''
    };

    axios.post(this.state.studentsPostURL+this.state.userId+this.state.urlPart1+this.state.password+this.state.urlPart2+this.state.class)
    .then(response => {
      this.setState({jsonList:response.data});
      this.state.jsonList.sort(compare);
    })
    .catch(error =>{
      alert(error);
    });
  }

  async componentDidMount(props){
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
        <InstructorTopNavBar fullname={this.state.fullName} userID={this.state.userId} passWord={this.state.password} />
        <div className="container-fluid">
          <div className="row mb-2">
              <div className="col-sm-7">
              <h1 className="m-0 text-dark">{this.state.class} Student List</h1>
              </div>
              <div className="col-sm-5">
                  <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item"><Link to={{pathname:"./InstructorHome", state: {linkFullName: this.state.fullName, 
                                                                                              linkUserId: this.state.userId, 
                                                                                              linkPassword: this.state.password}}}>Home</Link></li>
                      <li className="breadcrumb-item"><Link to={{pathname:'/InstructorClassPage', state: {linkFullName: this.state.fullName, 
                                                                                              linkUserId: this.state.userId, 
                                                                                              linkPassword: this.state.password,
                                                                                              linkClassCode: this.state.class}}}>Class Dashboard</Link></li>
                      <li className="breadcrumb-item active">Student List</li>
                  </ol>
              </div>
          </div>
        </div>
        <Container className="card">
          <div className="card-header">
            <h4>List of Students taking this Course: {this.state.class}</h4>
          </div>
          <div className="card-body">
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>StudentId</th>
                  <th>Gradepoint</th>
                </tr>
              </thead>
              <tbody>
                {this.instantiateX()}
                {this.state.jsonList.map((i)=>(
                  <tr>
                      <td>{this.increaseCount()}</td>
                      <td>{i.Username}</td>
                      <td>{i.Gradepoint}</td>
                  </tr>
                  ))
                }
              </tbody>
            </Table>
          </div>
          <div className="card-footer text-center">
            <InputGroup>
              <FormControl onChange={(e) => {
                  this.setState({studentIdToChangeGrade: e.target.value});
              }} type="text" placeholder="StudentId to change grade..."aria-label="With textarea" />
              <FormControl onChange={(e) => {
                  this.setState({pointsToAdd: e.target.value});
              }} type="text" placeholder="Points to add -/+..."aria-label="With textarea" />

              <InputGroup.Append>
                <Button onClick={(e) => {
                    axios.post(this.state.changeGradePointPostURL+this.state.userId+this.state.urlPart1+this.state.password+this.state.urlPart4+this.state.studentIdToChangeGrade+this.state.urlPart2+this.state.class+this.state.urlPart5+this.state.pointsToAdd)
                    .then(response => {
                        alert(response.data);
                    })
                    .catch(error =>{
                        alert(error);
                    });
                    }} variant="outline-danger">Change Student Gradepoint</Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
          <div className="card-footer text-center">
            <InputGroup>
              <InputGroup.Prepend>
                <Button onClick={(e) => {
                    axios.post(this.state.addEnrolledPostURL+this.state.userId+this.state.urlPart1+this.state.password+this.state.urlPart3+this.state.studentID+this.state.urlPart2+this.state.class)
                    .then(response => {
                        alert(response.data);
                    })
                    .catch(error =>{
                        alert(error);
                    });
                    }} variant="outline-danger">Add Student</Button>
              </InputGroup.Prepend>

              <FormControl onChange={(e) => {
                  this.setState({studentID: e.target.value});
              }} type="text" placeholder="Enter student userID..."aria-label="With textarea" />

              <InputGroup.Append>
                <Button onClick={(e) => {
                    axios.post(this.state.deleteEnrolledPostURL+this.state.userId+this.state.urlPart1+this.state.password+this.state.urlPart4+this.state.studentID+this.state.urlPart+this.state.class)
                    .then(response => {
                        alert(response.data);
                    })
                    .catch(error =>{
                        alert(error);
                    });
                    }} variant="outline-danger">Remove Student</Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </Container>
        <MainFooter />
      </div>
    );
  }
}
export default InstructorStudentList;