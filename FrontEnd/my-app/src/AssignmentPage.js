import React, { Component } from 'react';
import axios from 'axios';
import TopNavBar from './TopNavBar';
import AssignmentContent from './AssignmentContent';
import MainFooter from './MainFooter';

class AssignmentPage extends Component{
    constructor() {
        super();

        this.state = {
            jsonList: {},
            assgnList: []
        };

    }

    componentDidMount() {
        axios.post(`http://coms-319-050.cs.iastate.edu:8080/Chalkboard/Login?Username=jgos&Password=123`)
        .then(res => {
          const data = res.data;
          this.setState({ jsonList: data});
        });

        axios.post(`http://coms-319-050.cs.iastate.edu:8080/Chalkboard/ViewAssignments?Username=jgos&Password=123&Code=ENG250`)
        .then(res => {
          const data = res.data;
          this.setState({ assgnList: data});
        });
  
    }

    render(){
        const list = this.state.jsonList;
        const assignmentList = this.state.assgnList;

        return(
            <div>
                <TopNavBar jsonData={list}/>
                <AssignmentContent assgnList={assignmentList}/>
                <MainFooter/>
            </div>
        );
    }
}

export default AssignmentPage