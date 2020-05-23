import React, { Component } from 'react';
import axios from 'axios';
import TopNavBar from './TopNavBar';
import AnnouncementContent from './AnnouncementContent';
import MainFooter from './MainFooter';

class AnnouncementPage extends Component {
    constructor() {
        super();

        this.state = {
            jsonList: {},
            announcementList: []
        };

    }

    componentDidMount() {
        axios.post(`http://coms-319-050.cs.iastate.edu:8080/Chalkboard/Login?Username=jgos&Password=123`)
        .then(res => {
          const data = res.data;
          this.setState({ jsonList: data});
        });

        axios.post(`http://coms-319-050.cs.iastate.edu:8080/Chalkboard/ViewAnnouncements?Username=jgos&Password=123&Code=ENG250`)
        .then(res => {
          const data = res.data;
          this.setState({ announcementList: data});
        });

    }

    render() {
        const list = this.state.jsonList;
        const ancemntList = this.state.announcementList;
        return (
            <div>
                <TopNavBar jsonData={list}/>
                <AnnouncementContent ancemntData={ancemntList}/>
                <MainFooter/>
            </div>
        );
    }
}

export default AnnouncementPage