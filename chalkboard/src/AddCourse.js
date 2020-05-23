import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginScreen.css';
import MainFooter from './MainFooter';

import TopNavBar from './TopNavBar';

import {Button, Table, Container} from 'react-bootstrap';
import Link from 'react-router-dom/Link';

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

class AddCourse extends Component {
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
      urlPart1:'&Password=',
      urlPart2:'&Code=',
      viewAllClassesPostUrl:'http://coms-319-050.cs.iastate.edu:8080/Chalkboard/ViewClasses?Username=',
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

  componentDidMount(){

  }

  render() {
      return (
      <div>
        <TopNavBar fullname={this.state.fullName} userID={this.state.userId} passWord={this.state.password} />
        <div className="container-fluid">
          <div className="row mb-2">
              <div className="col-sm-7">
                <h1 className="m-0 text-dark">ADD COURSE</h1>
              </div>
              <div className="col-sm-5">
                  <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item"><Link to={{pathname:"./Home", state: {linkFullName: this.state.fullName, 
                                                                                              linkUserId: this.state.userId, 
                                                                                              linkPassword: this.state.password}}}>Home</Link></li>
                      <li className="breadcrumb-item"><Link to={{pathname:'/CoursesEnrolledPage', state: {linkFullName: this.state.fullName, 
                                                                                                        linkUserId: this.state.userId, 
                                                                                                        linkPassword: this.state.password}}}>Course Dashboard</Link></li>
                      <li className="breadcrumb-item active">Add Course</li>
                  </ol>
              </div>
          </div>
        </div>
        <Container class="card mt-3">
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
              <Link to={{ pathname: '/AddedCourseConfirmation',  state: {added: addedCourses, 
                                                                                  linkFullName: this.state.fullName, 
                                                                                  linkUserId: this.state.userId, 
                                                                                  linkPassword: this.state.password}
                                                                               }}><Button variant="danger">Submit</Button></Link>
            </div>
          </div>
        </Container>
        <MainFooter />
      </div>
    );
  }
}
export default AddCourse;