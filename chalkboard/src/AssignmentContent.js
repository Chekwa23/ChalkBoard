import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import MainFooter from './MainFooter';

import assIcon from './logo/iconAssignment.png';

class AssignmentContent extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        const getAllAssignment = this.props.assgnList;
        const getUserID = this.props.userID;
        const getFullName = this.props.fullName;
        const getUserPwd = this.props.passW;
        const getCourse = this.props.course;

        return(
            <div className="content-wrapper" style={{ paddingLeft: '4%', paddingRight: '4%'}}>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                            <h1>Assignment <Image className="" src={assIcon} heigth="30px" width="30px" alt="logo"></Image></h1>
                            </div>
                            <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <Link to={{pathname:"/Home", state: {linkFullName: getFullName, linkUserId: getUserID, linkPassword: getUserPwd}}}>Home</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to={{pathname:'/CoursePage', state:{linkUserId: getUserID, linkPassword: getUserPwd, linkClassCode: getCourse, linkFullName: getFullName}}}>Course</Link>
                                    
                                </li>
                                <li className="breadcrumb-item active">Assignment</li>
                            </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <div className="card">
                                <div className="card-header"></div>
                                <div className="card-body p-0">
                                    <ul className="nav nav-pills flex-column">
                                    <li className="nav-item active">
                                        <Link to={{pathname:'/CoursePage', state:{linkUserId: getUserID, linkPassword: getUserPwd, linkClassCode: getCourse, linkFullName: getFullName}}} className="nav-link">
                                            <i className="fas fa-tachometer-alt" /> &ensp; Course Dashboard
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={{pathname:'/AnnouncementPage', state:{linkUserId: getUserID, linkPassword: getUserPwd, linkFullName: getFullName, courseCode: getCourse}}} className="nav-link">
                                            <i className="fas fa-bullhorn" /> &ensp; Announcement
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={{pathname:'/AssignmentPage', state:{linkUserId: getUserID, linkPassword: getUserPwd, linkFullName: getFullName, courseCode: getCourse}}} className="nav-link">
                                            <i className="fas fa-file-signature" /> &ensp; Assignments
                                        </Link>
                                    </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="card card-danger card-outline">
                                <div className="card-header">
                                    <h3 className="card-title">All Assignments</h3>
                                </div>
                                <div className="card-body p-0">
                                    <div className="table-responsive mailbox-messages">
                                    <table className="table table-hover table-striped">
                                        <tbody>
                                        {
                                            getAllAssignment.map((assignment)=>(
                                                <tr>
                                                    <td className="mailbox-name">{assignment.Code}</td>
                                                    <td className="mailbox-subject">
                                                        {assignment.Description}
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default AssignmentContent