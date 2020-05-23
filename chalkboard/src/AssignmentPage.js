import React, { Component } from 'react';
import axios from 'axios';
import TopNavBar from './TopNavBar';
import AssignmentContent from './AssignmentContent';
import MainFooter from './MainFooter';

class AssignmentPage extends Component{
    constructor(props) {
        super(props);

        const {linkUserId} = this.props.location.state;
        const {linkPassword} = this.props.location.state;
        const {linkFullName} = this.props.location.state;

        this.state = {
            userID: linkUserId,
            userPass: linkPassword,
            fullName: linkFullName,
            courseName: ' ',
            jsonList: {},
            assgnList: []
        };

    }

    componentDidMount() {
        const getUsername = this.state.userID;
        const getUserPass = this.state.userPass;
        const {courseCode} = this.props.location.state;
        const getClassCode = courseCode;
        this.setState({courseName: getClassCode});

        var loginLink = "http://coms-319-050.cs.iastate.edu:8080/Chalkboard/Login?Username=";
        var viewAssignmentLink = "http://coms-319-050.cs.iastate.edu:8080/Chalkboard/ViewAssignments?Username=";

        var ampersand = "&";
        var passWEqual = "Password=";
        var codeEqual = "Code=";

        var fullLoginLink = loginLink.concat(getUsername,ampersand,passWEqual,getUserPass);
        var fullViewAssgnLink = viewAssignmentLink.concat(getUsername,ampersand,passWEqual,getUserPass,ampersand,codeEqual,getClassCode);
        console.log(fullViewAssgnLink);

        axios.post(fullLoginLink)
        .then(res => {
          const data = res.data;
          this.setState({ jsonList: data});
        });

        axios.post(fullViewAssgnLink)
        .then(res => {
          const data = res.data;
          this.setState({ assgnList: data});
        });
  
    }

    render(){
        const list = this.state.jsonList;
        const assignmentList = this.state.assgnList;
        const fullN = this.state.fullName;
        const userid = this.state.userID;
        const userPw = this.state.userPass;
        const courseCode = this.state.courseName;

        return(
            <div>
                <TopNavBar fullname={fullN} userID={userid} passWord={userPw} />
                <AssignmentContent assgnList={assignmentList} fullName={fullN} userID={userid} passW={userPw} course={courseCode}/>
                <MainFooter/>
            </div>
        );
    }
}

export default AssignmentPage