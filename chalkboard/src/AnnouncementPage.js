import React, { Component } from 'react';
import axios from 'axios';
import TopNavBar from './TopNavBar';
import AnnouncementContent from './AnnouncementContent';
import MainFooter from './MainFooter';


class AnnouncementPage extends Component {
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
            announcementList: []
        };

    }

    componentDidMount() {
        const getUsername = this.state.userID;
        const getUserPass = this.state.userPass;
        const {courseCode} = this.props.location.state;
        const getClassCode = courseCode;
        this.setState({courseName: getClassCode});

        var loginLink = "http://coms-319-050.cs.iastate.edu:8080/Chalkboard/Login?Username=";
        var viewAnnouncementLink = "http://coms-319-050.cs.iastate.edu:8080/Chalkboard/ViewAnnouncements?Username=";

        var ampersand = "&";
        var passWEqual = "Password=";
        var codeEqual = "Code=";

        var fullLoginLink = loginLink.concat(getUsername,ampersand,passWEqual,getUserPass);
        var fullViewAncmtLink = viewAnnouncementLink.concat(getUsername,ampersand,passWEqual,getUserPass,ampersand,codeEqual,getClassCode);

        axios.post(fullLoginLink)
        .then(res => {
          const data = res.data;
          this.setState({ jsonList: data});
        });

        axios.post(fullViewAncmtLink)
        .then(res => {
          const data = res.data;
          this.setState({ announcementList: data});
        });

    }

    render() {
        const list = this.state.jsonList;
        const ancemntList = this.state.announcementList;
        const fullN = this.state.fullName;
        const userid = this.state.userID;
        const userPw = this.state.userPass;
        const courseCode = this.state.courseName;

        return (
            <div>
                <TopNavBar fullname={fullN} userID={userid} passWord={userPw} />
                <AnnouncementContent ancemntData={ancemntList} fullName={fullN} userID={userid} passW={userPw} course={courseCode}/>
                <MainFooter />
            </div>
        );
    }
}

export default AnnouncementPage