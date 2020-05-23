import React, {Component} from 'react';
import TopNavBar from './TopNavBar';
import './adminlteCustom.css';
import { InputGroup, FormControl, Button, Image } from 'react-bootstrap';
import Link from 'react-router-dom/Link';
import axios from 'axios';
import assIcon from './logo/iconAssignment.png';
import annIcon from './logo/iconAnnouncement.png';
import MainFooter from './MainFooter';

/* use on server */
var url = "ws://coms-319-050.cs.iastate.edu:8080";
// var url = "ws" + window.location.href.substring(4); /* changes http to ws in the beginning of the url */
/* use for local testing */
// var url = "ws://localhost:8080";
var client;

class CourseDashboard extends Component {
    constructor(props){
        super(props);
        const {linkClassCode} = props.location.state;
        const {linkFullName} = props.location.state;
        const {linkUserId} = props.location.state;
        const {linkPassword} = props.location.state; 
        this.state = {
            jsonAnnouncementList:[],
            jsonAssignemntList:[],
            fullName:linkFullName,
            userId:linkUserId,
            password:linkPassword,
            class:linkClassCode,
            gradeInClass:'',
            urlPart1:'&Password=',
            urlPart2:'&Code=',
            viewAssPostURL:'http://coms-319-050.cs.iastate.edu:8080/Chalkboard/ViewAssignments?Username=',
            viewAnnPostURL:'http://coms-319-050.cs.iastate.edu:8080/Chalkboard/ViewAnnouncements?Username=',
            getEnrolledPostURl:'http://coms-319-050.cs.iastate.edu:8080/Chalkboard/GetEnrolled?Username='
        };

        axios.post(this.state.viewAnnPostURL+this.state.userId+this.state.urlPart1+this.state.password+this.state.urlPart2+this.state.class)
        .then(response => {
            this.setState({jsonAnnouncementList:response.data});
        })
        .catch(error =>{
            alert(error);
        });

        axios.post(this.state.viewAssPostURL+this.state.userId+this.state.urlPart1+this.state.password+this.state.urlPart2+this.state.class)
        .then(response => {
            this.setState({jsonAssignemntList:response.data});
        })
        .catch(error =>{
            alert(error);
        });

        axios.post(this.state.getEnrolledPostURl+this.state.userId+this.state.urlPart1+this.state.password+this.state.urlPart2+this.state.class)
        .then(response => {
            var gradeObject = response.data;
            this.setState({gradeInClass:gradeObject.Gradepoint});
        })
        .catch(error =>{
            alert(error);
        });
    }

    render() {
        const getFullName = this.state.fullName;
        const getUserId = this.state.userId;
        const getUserPass = this.state.password;
        const getClassCode = this.state.class;
        return(
            <div>
                <TopNavBar fullname={this.state.fullName} userID={this.state.userId} passWord={this.state.password} />
                <div className="content-wrapper">
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-7">
                                <h1 className="m-0 text-dark">Course Dashboard: {this.state.class}</h1>
                                </div>
                                <div className="col-sm-5">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><Link to={{pathname:"./Home", state: {linkFullName: this.state.fullName, 
                                                                                                                        linkUserId: this.state.userId, 
                                                                                                                        linkPassword: this.state.password}
                                                                                }}>Home</Link></li>
                                        <li className="breadcrumb-item active">Course Dashboard</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-2 col-sm-4 col-md-3">
                                    <div className="mb-3 bg-light">
                                        <div>
                                            <Link to={{pathname:'/ViewNotes', state: {linkClassCode: this.state.class, 
                                                                                    linkFullName: this.state.fullName, 
                                                                                    linkUserId: this.state.userId, 
                                                                                    linkPassword: this.state.password}}}><Button variant="secondary" block>Course Modules</Button></Link>
                                        
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2 col-sm-3 col-md-3">
                                    <div className=" mb-3 bg-light">
                                        <div >
                                            <Link to={{pathname:'/ClassGroupChat', state:{linkUserId: getUserId, linkPassword: getUserPass, linkFullName: getFullName, linkClassCode: this.state.class}}}><Button variant="secondary" block>Course Chat</Button></Link>
                                         </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5 className="card-title">Grade Overview</h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <p className="text-center">
                                                        <strong>Current Grade Standing</strong>
                                                    </p>
                                                    <div className="chart">
                                                        <h1 className="text-center" ><span style={{color:'red'}}>{this.state.gradeInClass}</span>/100</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-5">
                                <div className="col-md-8">
                                    <div className="card mt-3">
                                        <div className="card-header border-transparent">
                                            <h3 className="card-title">Assignments <Image className="" src={assIcon} heigth="20px" width="20px" alt="logo"></Image></h3>
                                        </div>
                                        <div className="card-body p-0">
                                            <div className="table-responsive">
                                                <table className="table m-0">
                                                    <thead>
                                                        <tr>
                                                            <th>Assignments</th>
                                                            <th>Due Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.jsonAssignemntList.map((i)=>(
                                                            <tr>
                                                                <td>
                                                                    <div className="sparkbar" style={{fontSize: '20px'}}>{i.Code}</div>
                                                                </td>
                                                                <td>
                                                                    <div className="sparkbar">{i.Description}</div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="card-footer clearfix">
                                            <Link to={{pathname:'/AssignmentPage', state:{linkUserId: getUserId, linkPassword: getUserPass, linkFullName: getFullName, courseCode: this.state.class}}}>View All Assignments</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">    
                                    <div className="card mt-3">
                                        <div className="card-header">
                                            <h3 className="card-title">Announcement <Image className="" src={annIcon} heigth="20px" width="20px" alt="logo"></Image></h3>
                                        </div>
                                        <div className="card-body p-0">
                                            <ul className="products-list product-list-in-card pl-2 pr-2">
                                                {this.state.jsonAnnouncementList.map((i)=>(
                                                    <li className="item">
                                                        <div className="product-img">
                                                            <div style={{backgroundColor:'#FF4646', width:'50px', height: '50px'}}></div>
                                                        </div>
                                                        <div className="product-info">
                                                            <span>{i.Code}</span>
                                                            <span className="product-description">{i.Description}</span>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="card-footer clearfix">
                                            <Link to={{pathname:'/AnnouncementPage', state:{linkUserId: getUserId, linkPassword: getUserPass, linkFullName: getFullName, courseCode: this.state.class}}}>View Announcements</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </section>
                </div>
                <MainFooter/>
            </div>
        )
    }
}
export default CourseDashboard;
