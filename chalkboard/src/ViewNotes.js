import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNavBar from './TopNavBar';
import axios from 'axios';
import {Container, Table} from 'react-bootstrap';
import Link from 'react-router-dom/Link';
import MainFooter from './MainFooter';

var x = 0;

class ViewNotes extends Component {
  constructor(props){
    super(props);
    const {linkClassCode} = this.props.location.state;
    const {linkFullName} = this.props.location.state;
    const {linkUserId} = this.props.location.state;
    const {linkPassword} = this.props.location.state;
    this.state = {
      jsonNotesList:[],
      noteName:'',
      noteLink:'',
      class:linkClassCode,
      fullName:linkFullName,
      userId:linkUserId,
      password:linkPassword,
      urlPart1:'&Password=',
      urlPart2:'&Code=',
      urlPart3:'&Name=',
      urlPart4:'&Link=',
      viewNotesPostURL:'http://coms-319-050.cs.iastate.edu:8080/Chalkboard/ViewNotes?Username=',
      addNotesPostURL:'http://coms-319-050.cs.iastate.edu:8080/Chalkboard/AddNote?Username='
    };
    
    axios.post(this.state.viewNotesPostURL+this.state.userId+this.state.urlPart1+this.state.password+this.state.urlPart2+this.state.class)
    .then(response => {
        this.setState({jsonNotesList:response.data});
    })
    .catch(error =>{
        alert(error);
    });
  }

  async componentDidMount(props){

  }

  increaseCount(){
    x++;
    return x;
  }

  instantiateX(){
    x = 0;
  }

    render() {
        return (
        <div>
            <TopNavBar fullname={this.state.fullName} userID={this.state.userId} passWord={this.state.password} />
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-7">
                        <h1 className="m-0 text-dark">MODULES AND NOTES</h1>
                    </div>
                    <div className="col-sm-5">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><Link to={{pathname:"./Home", state: {linkFullName: this.state.fullName, 
                                                                                                    linkUserId: this.state.userId, 
                                                                                                    linkPassword: this.state.password}}}>Home</Link></li>
                            <li className="breadcrumb-item"><Link to={{pathname:"./CoursePage", state: {linkFullName: this.state.fullName, 
                                                                                                    linkUserId: this.state.userId, 
                                                                                                    linkPassword: this.state.password,
                                                                                                    linkClassCode: this.state.class}}}>Course Dashboard</Link></li>
                            <li className="breadcrumb-item active">Modules</li>
                        </ol>
                    </div>
                </div>
            </div>
            <Container className="card mt-3">
                <div className="card-header">
                    <h4>Links to Modules and Notes.</h4>
                    <h6>Click on the title to download the note.</h6>
                </div>
                <div className="card-body">
                    <Table>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Course Code</th>
                            <th>Title</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.instantiateX()}
                            {this.state.jsonNotesList.map((i)=>(
                            <tr>
                                <td>{this.increaseCount()}</td>
                                <td>{i.Code}</td>
                                <td><a target="_blank" href={i.Link}>{i.Name}</a></td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
            <MainFooter />
        </div>
        );
    }
}

export default ViewNotes;


