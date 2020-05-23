import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginScreen.css';
import axios from 'axios';
import TopNavBar from './TopNavBar';
import {Button, Container, Table} from 'react-bootstrap';
import Link from 'react-router-dom/Link';
import MainFooter from './MainFooter';

var x = 0;

function compare( a, b ) {
  if ( a < b ){
    return -1;
  }
  if ( a > b ){
    return 1;
  }
  return 0;
}

class AddedCourseConfirmation extends Component {
  constructor(props){
    super(props);
    const {added} = this.props.location.state;
    const {linkFullName} = this.props.location.state;
    const {linkUserId} = this.props.location.state;
    const {linkPassword} = this.props.location.state;
    this.state = {
      courseList:added,
      fullName:linkFullName,
      userId:linkUserId,
      password:linkPassword,
      urlPart1:'&Password=',
      urlPart2:'&userToAdd=',
      urlPart3:'&Code=',
      addEnrolledURL:'http://coms-319-050.cs.iastate.edu:8080/Chalkboard/AddEnrolled?Username='
    };

    this.state.courseList.sort(compare);
  }

  async componentDidMount(){
    x = 0;
  }
  
  increaseCount(){
    x++;
    return x;
  }

  render() {
    return (
      <div>
        <TopNavBar fullname={this.state.fullName} userID={this.state.userId} passWord={this.state.password} />
        <Container class="pl-5">
          <div className="card-header">
            <h1>Confirmation Page</h1>
            <h6>You have selected the following courses to add. </h6>
            <h6>If the list is incorrect go back to the previou spage and re-select.</h6>
          </div>
          <div className="card-body">
            <Table className="mt-4">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Course Code</th>
                </tr>
              </thead>
              <tbody>
                {this.state.courseList.map((i)=>(
                  <tr>
                    <td>{this.increaseCount()}</td>
                    <td>{i}</td>
                  </tr>
                  ))
                }
              </tbody>
            </Table>
          </div>
          <div className="card-footer">
            <Link to={{pathname:'./AddCourse', state: {linkFullName: this.state.fullName, 
                                                                linkUserId: this.state.userId, 
                                                                linkPassword: this.state.password}
                                                                }}>
              <Button class="Submit" onClick={() => {
                for(var i = 0; i < this.state.courseList.length; i++)
                {
                  var tempUrl = this.state.courseList[i];
                  
                  axios.post(this.state.addEnrolledURL+this.state.userId+this.state.urlPart1+this.state.password+this.state.urlPart2+this.state.userId+this.state.urlPart3+tempUrl)
                  .then(response => {
                      alert(response.data);
                  })
                  .catch(error =>{
                      alert(error);
                  });
                }
              }} variant="danger">Submit</Button>
            </Link>
          </div>
        </Container>
        <MainFooter />
      </div>
    );
  }
}

export default AddedCourseConfirmation;


