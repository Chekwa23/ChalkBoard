import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import InstructorTopNavBar from './InstructorTopNavBar';

import {Button, Table, FormControl, InputGroup, Container} from 'react-bootstrap';
import Link from 'react-router-dom/Link';
import MainFooter from './MainFooter';

const addedCourses = [];

function compare( a, b ){
  if ( a.Code < b.Code ){
    return -1;
  }
  if ( a.Code > b.Code ){
    return 1;
  }
  return 0;
}

class InstructorAddClass extends Component {
  constructor(props){
    super(props);
    const {linkFullName} = this.props.location.state;
    const {linkUserId} = this.props.location.state;
    const {linkPassword} = this.props.location.state; 
    this.state = {
      jsonList:[],
      fullName:linkFullName,
      userId:linkUserId,
      password:linkPassword,
      newClassCode:'',
      newClassName:'',
      newClassDescription:'',
      newClassTotal:'',
      urlPart1:'&Password=',
      urlPart2:'&Code=',
      urlPart3:'&Name=',
      urlPart4:'&Description=',
      urlPart5:'&Total=',
      viewAllClassesPostUrl:'http://coms-319-050.cs.iastate.edu:8080/Chalkboard/ViewClasses?Username=',
      addClassToDatabasePostURL:'http://coms-319-050.cs.iastate.edu:8080/Chalkboard/AddClass?Username=',
      deleteClassToDatabasePostURL:'http://coms-319-050.cs.iastate.edu:8080/Chalkboard/DeleteClass?Username='
    };

    axios.post(this.state.viewAllClassesPostUrl+this.state.userId+this.state.urlPart1+this.state.password)
    .then(response => {
      this.setState({jsonList:response.data});
      this.state.jsonList.sort(compare);
    })
    .catch(error =>{
      alert(error);
    });
  }

  async componentDidMount(props){
    
  }

  render() {
      return (
      <div>
        <InstructorTopNavBar fullname={this.state.fullName} userID={this.state.userId} passWord={this.state.password} />
        <div className="container-fluid">
          <div className="row mb-2">
              <div className="col-sm-7">
              <h1 className="m-0 text-dark">ADD CLASS TO INSTRUCT</h1>
              </div>
              <div className="col-sm-5">
                  <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item"><Link to={{pathname:"./InstructorHome", state: {linkFullName: this.state.fullName, 
                                                                                              linkUserId: this.state.userId, 
                                                                                              linkPassword: this.state.password}}}>Home</Link></li>
                      <li className="breadcrumb-item"><Link to={{pathname:'/InstructorClassesInstructingPage', state: {linkFullName: this.state.fullName, 
                                                                                                                      linkUserId: this.state.userId, 
                                                                                                                      linkPassword: this.state.password}}}>All Classes</Link></li>
                      <li className="breadcrumb-item active">Add Class</li>
                  </ol>
              </div>
          </div>
        </div>
        <Container className="card mt-3">
          <div className="card-header">
            <h5>Select courses to be added and click "Submit"</h5>
            <h6>Multiple courses can be selected</h6>
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
                {this.state.jsonList.map((i)=>(
                  <tr>
                    <td><input type="checkbox" onClick={(i) => {
                      if(!i.target.isChecked){
                        i.target.isChecked = true;
                        if(!addedCourses.includes(i.target.value))
                        {
                          addedCourses.push(i.target.value);
                        }
                        return;
                      } else {
                        i.target.isChecked = false;
                        if(addedCourses.includes(i.target.value))
                        {
                          addedCourses.pop(i.target.value);
                        }
                        return;
                      }
                    }} value={i.Code}/></td>
                    <td>{i.Code}</td>
                    <td>{i.Name}</td>
                    <td>{i.Description}</td>
                    <td>{i.TotalPoints}</td>
                  </tr>
                  ))
                }
              </tbody>
            </Table>
          </div>
          <div className="card-footer">
            <div>
              <Link to={{ pathname: '/InstructorAddedClassConfirmation',  state: {added: addedCourses, 
                                                                                  linkFullName: this.state.fullName, 
                                                                                  linkUserId: this.state.userId, 
                                                                                  linkPassword: this.state.password}
                                                                               }}><Button variant="danger">Submit</Button></Link>
            </div>
          </div>
        </Container>
        <Container className="card my-5">
          <div className="card-header">
            <h3>ADD A NEW CLASS TO THE DATABASE OR DELETE AN EXISTING CLASS FROM THE DATABASE </h3>
            <h5>To add a new class, enter all new Class details below. </h5>
            <h5>To delete a class, enter only the Class code below. </h5>
            <h7>Please confirm details before submitting.</h7>
          </div>
          <div className="card-body">
            
            <InputGroup>
              <InputGroup.Prepend>
                  <Button onClick={(e) => {
                      axios.post(this.state.deleteClassToDatabasePostURL+this.state.userId+this.state.urlPart1+this.state.password+this.state.urlPart2+this.state.newClassCode)
                      .then(response => {
                          alert(response.data);
                      })
                      .catch(error =>{
                          alert(error);
                      });
                      }} variant="outline-danger">Delete Class</Button>
              </InputGroup.Prepend>
              <FormControl onChange={(e) => {
                  this.setState({newClassCode: e.target.value});
              }} type="text" placeholder="Code"aria-label="With textarea" />
              <FormControl onChange={(e) => {
                  this.setState({newClassName: e.target.value});
              }} as='textarea' placeholder="Name"aria-label="With textarea" />
              <FormControl onChange={(e) => {
                  this.setState({newClassDescription: e.target.value});
              }} as='textarea' placeholder="Description"aria-label="With textarea" />
              <FormControl onChange={(e) => {
                  this.setState({newClassTotal: e.target.value});
              }} type="text" placeholder="Total"aria-label="With textarea" />

              <InputGroup.Append>
                <Button onClick={(e) => {
                    axios.post(this.state.addClassToDatabasePostURL+this.state.userId+this.state.urlPart1+this.state.password+this.state.urlPart2+this.state.newClassCode+this.state.urlPart3+this.state.newClassName+this.state.urlPart4+this.state.newClassDescription+this.state.urlPart5+this.state.newClassTotal)
                    .then(response => {
                        alert(response.data);
                    })
                    .catch(error =>{
                        alert(error);
                    });
                    }} variant="outline-danger">Add Class</Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </Container>
        <MainFooter />
      </div>
    );
  }
}
export default InstructorAddClass;