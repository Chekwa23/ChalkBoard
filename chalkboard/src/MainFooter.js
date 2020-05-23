import React, { Component } from 'react';

class MainFooter extends Component {
    render() {
        return(
            <div  className="MainFooter px-2">
                <footer className="main-footer">
                    <strong> Copyright © 2020 ChalkBoard</strong>
                    <div className="float-right d-none d-sm-inline-block">
                        <b>Version</b> 2.0.0 
                    </div>
                </footer>
            </div>
        )
    }
}


export default MainFooter;