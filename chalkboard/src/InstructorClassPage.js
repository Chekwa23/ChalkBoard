import React, {Component} from 'react';
import InstructorTopNavBar from './InstructorTopNavBar';
import MainFooter from './MainFooter';
import './adminlteCustom.css';
import { InputGroup, FormControl, Button, Image } from 'react-bootstrap';
import Link from 'react-router-dom/Link';
import axios from 'axios';
import assIcon from './logo/iconAssignment.png';
import annIcon from './logo/iconAnnouncement.png';

class InstructorClassPage extends Component {
    constructor(props){
        super(props);
        const {linkClassCode} = this.props.location.state;
        const {linkFullName} = this.props.location.state;
        const {linkUserId} = this.props.location.state;
        const {linkPassword} = this.props.location.state; 
        this.state = {
            jsonAnnouncementList:[],
            jsonAssignemntList:[],
            fullName:linkFullName,
            userId:linkUserId,
            password:linkPassword,
            class:linkClassCode,
            announcementStr:'',
            assignmentStr:'',
            urlPart1:'&Password=',
            urlPart2:'&Code=',
            urlPart3:'&Description=',
            addAssPostURL:'http://coms-319-050.cs.iastate.edu:8080/Chalkboard/AddAssignment?Username=',
            addAnnPostURL:'http://coms-319-050.cs.iastate.edu:8080/Chalkboard/AddAnnouncement?Username=',
            viewAssPostURL:'http://coms-319-050.cs.iastate.edu:8080/Chalkboard/ViewAssignments?Username=',
            viewAnnPostURL:'http://coms-319-050.cs.iastate.edu:8080/Chalkboard/ViewAnnouncements?Username='
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
    }

    async componentDidMount(props) {

    }

    render() {
        return(
            <div>
                <InstructorTopNavBar fullname={this.state.fullName} userID={this.state.userId} passWord={this.state.password} />
                <div className="content-wrapper" >
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-7">
                                    <h1 className="m-0 text-dark">Class Dashboard: {this.state.class}</h1>
                                </div>
                                <div className="col-sm-5">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><Link to={{pathname:"./InstructorHome", state: {linkFullName: this.state.fullName, 
                                                                                                                        linkUserId: this.state.userId, 
                                                                                                                        linkPassword: this.state.password}
                                                                                }}>Home</Link></li>
                                        <li className="breadcrumb-item active">Class Dashboard</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Main content */}
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-2 col-sm-4 col-md-3">
                                    <div className="mb-3 bg-light">
                                        <div>
                                            <Link to={{pathname:'/InstructorAddNotes', state: {linkClassCode: this.state.class, 
                                                                                            linkFullName: this.state.fullName, 
                                                                                            linkUserId: this.state.userId, 
                                                                                            linkPassword: this.state.password}}}><Button variant="secondary" block>Course Modules</Button></Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2 col-sm-3 col-md-3">
                                    <div className=" mb-3 bg-light">
                                        <div >
                                            <Link to={{pathname:'/InstructorChatBox', state: {linkClassCode: this.state.class, 
                                                                                            linkFullName: this.state.fullName, 
                                                                                            linkUserId: this.state.userId, 
                                                                                            linkPassword: this.state.password}}}><Button variant="secondary" block>Course Chat</Button></Link>
                                         </div>
                                    </div>
                                </div>
                            </div>
                            <div>     
                                <div className="card mb-5">
                                    <div className="card-header">
                                        <h3 className="card-title">Announcement <Image className="" src={annIcon} heigth="20px" width="20px" alt="logo"></Image></h3>
                                    </div>
                                    <div className="card-body p-0 ml-3">
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
                                    <div className="card-footer text-center">
                                        <InputGroup>
                                            <FormControl onChange={(e) => {
                                                this.setState({announcementStr: e.target.value});
                                            }} as="textarea" placeholder="Enter announcement..."aria-label="With textarea" />
                                            <InputGroup.Append>
                                                <Button onClick={(e) => {
                                                    axios.post(this.state.addAnnPostURL+this.state.userId+this.state.urlPart1+this.state.password+this.state.urlPart2+this.state.class+this.state.urlPart3+this.state.announcementStr)
                                                    .then(response => {
                                                        alert(response.data);
                                                    })
                                                    .catch(error =>{
                                                        alert(error);
                                                    });
                                                    }} variant="outline-danger">Add Announcement</Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="card mb-5">
                                    <div className="card-header border-transparent">
                                        <h3 className="card-title">Assignments <Image className="" src={assIcon} heigth="20px" width="20px" alt="logo"></Image></h3>
                                    </div>
                                    <div className="card-body p-0">
                                        <div className="table-responsive">
                                            <table className="table m-0">
                                                <thead>
                                                    <tr>
                                                        <th>Course</th>
                                                        <th>Assignment Description</th>
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
                                    <div className="card-footer text-center">
                                        <InputGroup>
                                            <FormControl onChange={(e) => {
                                                this.setState({assignmentStr: e.target.value});
                                            }} as="textarea" placeholder="Enter assignment..."aria-label="With textarea" />
                                            <InputGroup.Append>
                                                <Button onClick={(e) => {
                                                    axios.post(this.state.addAssPostURL+this.state.userId+this.state.urlPart1+this.state.password+this.state.urlPart2+this.state.class+this.state.urlPart3+this.state.assignmentStr)
                                                    .then(response => {
                                                        alert(response.data);
                                                    })
                                                    .catch(error =>{
                                                        alert(error);
                                                    });
                                                    }} variant="outline-danger">Add Assignment</Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="px-4 mb-4">
                    <Link to={{pathname:'./InstructorStudentList', state: {linkClassCode: this.state.class, 
                                                                            linkFullName: this.state.fullName, 
                                                                            linkUserId: this.state.userId, 
                                                                            linkPassword: this.state.password}}} style={{color:"black"}}><Button variant="danger" block>All Students</Button></Link>
                </div>
                <MainFooter />
            </div>
        )
    }
}
export default InstructorClassPage;