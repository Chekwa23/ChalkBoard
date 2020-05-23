import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginScreen from './LoginScreen'

import Home from './Home';
import TopNavBar from './TopNavBar';
import CoursePage from './CoursePage';
import ChatBox from './ChatBox';
import CoursesEnrolledPage from './CoursesEnrolledPage';
import AddCourse from './AddCourse';
import AddedCourseConfirmation from './AddedCourseConfirmation';
import ViewNotes from './ViewNotes';
import AnnouncementContent from './AnnouncementContent';
import AnnouncementPage from './AnnouncementPage';
import AssignmentContent from './AssignmentContent';
import AssignmentPage from './AssignmentPage';

import InstructorHome from './InstructorHome';
import InstructorTopNavBar from './InstructorTopNavBar';
import InstructorClassPage from './InstructorClassPage';
import InstructorChatBox from './InstructorChatBox';
import InstructorClassesInstructingPage from './InstructorClassesInstructingPage';
import InstructorAddClass from './InstructorAddClass';
import InstructorAddedClassConfirmation from './InstructorAddedClassConfirmation';
import InstructorStudentList from './InstructorStudentList';
import InstructorAddNotes from './InstructorAddNotes';



import { Route, BrowserRouter, Switch } from 'react-router-dom';

class board extends Component {
  render() {
    return (
        <BrowserRouter>
            <div>
              <Switch>
                <Route path='/' exact component={LoginScreen}></Route>
                
                <Route path='/Home' component={Home}></Route> 
                
                <Route path='/AnnouncementPage' component={AnnouncementPage}></Route>
                <Route path='/AssignmentPage' component={AssignmentPage}></Route> 
              
                <Route path='/CoursePage' component={CoursePage}></Route> 
                <Route path='/CoursesEnrolledPage' component={CoursesEnrolledPage}></Route> 
                <Route path='/AddCourse' component={AddCourse}></Route>
                <Route path='/AddedCourseConfirmation' component={AddedCourseConfirmation}></Route>
                <Route path='/ClassGroupChat' component={ChatBox}></Route>
                <Route path='/ViewNotes' component={ViewNotes}></Route>

                <Route path='/InstructorHome' component={InstructorHome}></Route> 
                <Route path='/InstructorClassPage' component={InstructorClassPage}></Route>
                <Route path='/InstructorClassesInstructingPage' component={InstructorClassesInstructingPage}></Route>
                <Route path='/InstructorAddClass' component={InstructorAddClass}></Route>
                <Route path='/InstructorAddedClassConfirmation' component={InstructorAddedClassConfirmation}></Route>
                <Route path='/InstructorStudentList' component={InstructorStudentList}></Route>
                <Route path='/InstructorChatBox' component={InstructorChatBox}></Route>
                <Route path='/InstructorAddNotes' component={InstructorAddNotes}></Route>
                
              </Switch>
            </div>
        </BrowserRouter>
    );
  }
}

export default board;
