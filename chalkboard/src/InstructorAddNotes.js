import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InstructorTopNavBar from './InstructorTopNavBar';
import axios from 'axios';
import {Button, Form, InputGroup, FormControl, Container, Image, Table} from 'react-bootstrap';
import Link from 'react-router-dom/Link';
import MainFooter from './MainFooter';

var x = 0;

class InstructorAddNotes extends Component {
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
            <InstructorTopNavBar fullname={this.state.fullName} userID={this.state.userId} passWord={this.state.password} />
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-7">
                        <h1 className="m-0 text-dark">MODULES AND NOTES</h1>
                    </div>
                    <div className="col-sm-5">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><Link to={{pathname:"./InstructorHome", state: {linkFullName: this.state.fullName, 
                                                                                                    linkUserId: this.state.userId, 
                                                                                                    linkPassword: this.state.password}}}>Home</Link></li>
                            <li className="breadcrumb-item"><Link to={{pathname:"./InstructorClassPage", state: {linkFullName: this.state.fullName, 
                                                                                                    linkUserId: this.state.userId, 
                                                                                                    linkPassword: this.state.password,
                                                                                                    linkClassCode: this.state.class}}}>Class Dashboard</Link></li>
                            <li className="breadcrumb-item active">Modules</li>
                        </ol>
                    </div>
                </div>
            </div>
            <Container className="card mt-3">
                <div className="card-header">
                    <h4>Links to Modules and Notes</h4>
                    <h6>Important!! When pasting the link, dont forget to add "http://"</h6>
                    <h6>If that isn't added the link would not work.</h6>
                </div>
                <div className="card-body">
                    <Table>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Course Code</th>
                            <th>Title</th>
                            <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.instantiateX()}
                            {this.state.jsonNotesList.map((i)=>(
                            <tr>
                                <td>{this.increaseCount()}</td>
                                <td>{i.Code}</td>
                                <td>{i.Name}</td>
                                <td><a target="_blank" href={i.Link}>{i.Link}</a></td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <div className="card-footer mb-3">
                    <InputGroup>
                        <FormControl onChange={(e) => {
                            this.setState({noteName: e.target.value});
                        }} type="text" placeholder="Note title"aria-label="With textarea" />
                        <FormControl onChange={(e) => {
                            this.setState({noteLink: e.target.value});
                        }} type="text" placeholder="Link to note"aria-label="With textarea" />
                        
                        <InputGroup.Append>
                            <Button onClick={(e) => {
                                axios.post(this.state.addNotesPostURL+this.state.userId+this.state.urlPart1+this.state.password+this.state.urlPart2+this.state.class+this.state.urlPart3+this.state.noteName+this.state.urlPart4+this.state.noteLink)
                                .then(response => {
                                    alert(response.data);
                                })
                                .catch(error =>{
                                    alert(error);
                                });
                                }} variant="outline-danger">Add Note Link</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
                <div className='mb-3'>
                    <a target="_blank" href='http://coms-319-050.cs.iastate.edu:8080/FileHandler/'><Button variant="danger" block>Upload Notes</Button></a>
                   
                </div>
            </Container>
            <MainFooter />
        </div>
        );
    }
}

export default InstructorAddNotes;


