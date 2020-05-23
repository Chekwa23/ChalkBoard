import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Home from './Home';
import Courses from './Courses';
import AnnouncementPage from './AnnouncementPage';
import AssignmentPage from './AssignmentPage';

class AllRouter extends Component{
    render(){
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path='/Home' component={Home}></Route>
                        <Route path='/Course/Announcement' exact component={AnnouncementPage}></Route>
                        <Route path='/Course/Assigments' exact component={AssignmentPage}></Route>
                        <Route path='/Course' exact component={Courses}></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default AllRouter;