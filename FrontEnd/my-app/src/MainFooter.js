import React, { Component } from 'react';

class MainFooter extends Component {
    render() {
        return(
            <div className="MainFooter">
                <footer className="main-footer">
                    <strong>Copyright © 2020 ChalkBoard</strong>
                    <div className="float-right d-none d-sm-inline-block">
                        <b>Version</b> 1.0.0
                    </div>
                </footer>
            </div>
        )
    }
}

export default MainFooter;