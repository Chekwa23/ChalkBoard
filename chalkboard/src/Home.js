import React, { Component } from 'react';
import TopNavBar from './TopNavBar';
import './adminlteCustom.css';
import { Button, ProgressBar, Image} from "react-bootstrap";
import Link from 'react-router-dom/Link';
import axios from 'axios';
import MainFooter from './MainFooter';
import assIcon from './logo/iconAssignment.png';
import annIcon from './logo/iconAnnouncement.png';

function compare( a, b ){
    if ( a.Code < b.Code ){
      return -1;
    }
    if ( a.Code > b.Code ){
      return 1;
    }
    return 0;
}

class Home extends Component {
    constructor(props){
        super(props);
        const {linkFullName} = this.props.location.state;
        const {linkUserId} = this.props.location.state;
        const {linkPassword} = this.props.location.state;
        this.state = {
            jsonClassList:[],
            jsonAnnouncementList:[],
            jsonAssignemntList:[],
            jsonGradeList:[],
            lastName:'',
            firstName:'',
            GPA:0,
            fullName:linkFullName,
            userId:linkUserId,
            password:linkPassword,
            urlPart1:'&Password=',
            urlPart2:'&Code=',
            viewEnrolledPostURL:'http://coms-319-050.cs.iastate.edu:8080/Chalkboard/ViewEnrolled?Username=',
            viewAssPostURL:'http://coms-319-050.cs.iastate.edu:8080/Chalkboard/ViewAllUserAssignments?Username=',
            viewAnnPostURL:'http://coms-319-050.cs.iastate.edu:8080/Chalkboard/ViewAllUserAnnouncements?Username=',
            getEnrolledPostURl:'http://coms-319-050.cs.iastate.edu:8080/Chalkboard/ViewEnrolledRecords?Username='
        };
        
        axios.post(this.state.viewEnrolledPostURL+this.state.userId+this.state.urlPart1+this.state.password)
        .then(response => {
            this.setState({jsonClassList:response.data});
            this.state.jsonClassList.sort(compare);
        })
        .catch(error =>{
            alert(error);
        });

        axios.post(this.state.getEnrolledPostURl+this.state.userId+this.state.urlPart1+this.state.password)
        .then(response => {
            this.setState({jsonGradeList:response.data});
            this.state.jsonGradeList.sort(compare);
        })
        .catch(error =>{
            alert(error);
        });

        axios.post(this.state.viewAssPostURL+this.state.userId+this.state.urlPart1+this.state.password)
        .then(response => {
            this.setState({jsonAssignemntList:response.data});
            this.state.jsonAssignemntList.sort(compare);
        })
        .catch(error =>{
            alert(error);
        });

        axios.post(this.state.viewAnnPostURL+this.state.userId+this.state.urlPart1+this.state.password)
        .then(response => {
            this.setState({jsonAnnouncementList:response.data});
            this.state.jsonAnnouncementList.sort(compare);
        })
        .catch(error =>{
            alert(error);
        });

        
    }

    async componentDidMount(props){

    }

    calcGPA(){
        var tempGrade = 0;
        this.state.jsonGradeList.map((i)=>{
            tempGrade += i.Gradepoint;
        });
        return parseInt(tempGrade/this.state.jsonGradeList.length);
    }

    render() {
        return(
            <div className="content-wrapper">
                <TopNavBar fullname={this.state.fullName} userID={this.state.userId} passWord={this.state.password} />
                <div className="content-header mt-2">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-8">
                            <h1 className="m-0 text-dark">{this.state.fullName}'s Dashboard</h1>
                            </div>
                            <div className="col-sm-4">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">Home</li>
                                    <li className="breadcrumb-item active">Dashboard</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title">Grade Overview</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <p className="text-center">
                                                    <strong>Current GPA Standing</strong>
                                                </p>
                                                <div className="chart">
                                                    <h1 className="text-center" ><span style={{color:'red', fontSize:'100px'}}>{this.calcGPA()}</span>%</h1>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <p className="text-center">
                                                    <strong>All Courses Score</strong>
                                                </p>
                                                <div className="progress-group">
                                                    {this.state.jsonGradeList.map((i)=>(
                                                        <div>
                                                            <span className="progress-text"><Link to={{pathname:"./CoursePage", state: {linkClassCode: i.Code, 
                                                                                                                                        linkFullName: this.state.fullName, 
                                                                                                                                        linkUserId: this.state.userId, 
                                                                                                                                        linkPassword: this.state.password}
                                                                                                                }}className="users-list-name">{i.Code}</Link></span>                                                                         
                                                            <div >
                                                                <ProgressBar now={i.Gradepoint} label={`${i.Gradepoint}%`} />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="mt-3 col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">All Courses</h3>
                                    </div>
                                    <div className="card-body p-0">
                                        <ul className="users-list clearfix">
                                            {this.state.jsonClassList.map((i)=>(
                                                <li>
                                                    <div style={{backgroundColor:'#FF4646', width:'128px', height: '128px'}}></div>
                                                    <Link to={{pathname:"./CoursePage", state: {linkClassCode: i.Code, 
                                                                                                linkFullName: this.state.fullName, 
                                                                                                linkUserId: this.state.userId, 
                                                                                                linkPassword: this.state.password}
                                                                        }}className="users-list-name">{i.Code}</Link>
                                                </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <div className="card-footer text-center">
                                        <Link to={{pathname:"./CoursesEnrolledPage", state:{linkFullName: this.state.fullName, 
                                                                                            linkUserId: this.state.userId, 
                                                                                            linkPassword: this.state.password}
                                                    }} className="users-list-name" name="viewAllClasses">View All Classes</Link>
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
                                                <th>Course Name</th>
                                                <th>Assignment </th>
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
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
                <MainFooter />
            </div>

        )
    }
}

export default Home


