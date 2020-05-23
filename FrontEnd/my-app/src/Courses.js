import React, { Component } from 'react';
import TopNavBar from './TopNavBar';
import CourseDashboard from './CourseDashboard';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';

class Courses extends Component {
    constructor() {
        super();

        this.state = {
            jsonList: {},
        };

    }

    componentDidMount() {
        axios.post(`http://coms-319-050.cs.iastate.edu:8080/Chalkboard/Login?Username=jgos&Password=123`)
        .then(res => {
          const data = res.data;
          this.setState({ jsonList: data});
        });
  
    }

    render() {
        const list = this.state.jsonList;
        return (
            <div>
                <TopNavBar jsonData={list}/>
                <CourseDashboard/>
            </div>
        )
    }
}

export default Courses

