import React, { Component } from 'react';
import InstructorTopNavBar from './InstructorTopNavBar';
import MainFooter from './MainFooter';
import './adminlteCustom.css';
import Link from 'react-router-dom/Link';
import axios from 'axios';

function compare( a, b ){
    if ( a.Code < b.Code ){
      return -1;
    }
    if ( a.Code > b.Code ){
      return 1;
    }
    return 0;
}

class InstructorHome extends Component {
    constructor(props){
        super(props);
        const {linkFullName} = this.props.location.state;
        const {linkUserId} = this.props.location.state;
        const {linkPassword} = this.props.location.state;
        this.state = {
            jsonClassList:[],
            lastName:'',
            firstName:'',
            fullName:linkFullName,
            userId:linkUserId,
            password:linkPassword,
            urlPart1:'&Password=',
            viewEnrolledPostURL:'http://coms-319-050.cs.iastate.edu:8080/Chalkboard/ViewEnrolled?Username=',
        };

        axios.post(this.state.viewEnrolledPostURL+this.state.userId+this.state.urlPart1+this.state.password)
        .then(response => {
            this.setState({jsonClassList:response.data});
            this.state.jsonClassList.sort(compare);
        })
        .catch(error =>{
            alert(error);
        });
        
    }

    async componentDidMount(props){
        
    }

    render() {
        return(
            <div className="content-wrapper">
                <InstructorTopNavBar fullname={this.state.fullName} userID={this.state.userId} passWord={this.state.password} />
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
                        <div className='row'>
                            <div className="mt-3 col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">All Classes</h3>
                                    </div>
                                    <div className="card-body p-0">
                                        {this.state.jsonClassList.map((i)=>(
                                            <div className="row my-3 ml-3">
                                                <div className="col-sm-4">
                                                    <div style={{backgroundColor:'#FF4646', width:'128px', height: '128px', borderRadius: "50%"}}></div>
                                                </div>
                                                <div className="col-sm-8 mt-3">
                                                    <ul>
                                                        <li><Link to={{pathname:"./InstructorClassPage", state: {linkClassCode: i.Code, 
                                                                                                                linkFullName: this.state.fullName, 
                                                                                                                linkUserId: this.state.userId, 
                                                                                                                linkPassword: this.state.password}
                                                                    }}className="users-list-name">{i.Code}</Link></li>
                                                        <li>{i.Name}</li>
                                                        <li>{i.Description}</li>
                                                        <li>{i.TotalPoints} points</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            
                                            ))
                                        }
                                    </div>
                                    <div className="card-footer text-center">
                                        <Link to={{pathname:"./InstructorClassesInstructingPage", state:{linkFullName: this.state.fullName, 
                                                                                                        linkUserId: this.state.userId, 
                                                                                                        linkPassword: this.state.password}
                                                }} className="users-list-name" name="viewAllClasses">View All Classes</Link>
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

export default InstructorHome;