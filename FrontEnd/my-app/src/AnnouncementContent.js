import React, { Component } from 'react';

class AnnouncementContent extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        const getAnouncement = this.props.ancemntData;

        return(
            <div className="content-wrapper" style={{ paddingLeft: '4%', paddingRight: '4%'}}>
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Announcement</h1>
                        </div>
                        <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="/Home">Home</a></li>
                            <li className="breadcrumb-item"><a href="/Course">Course</a></li>
                            <li className="breadcrumb-item active">Announcement</li>
                        </ol>
                        </div>
                    </div>
                    </div>{/* /.container-fluid */}
                </section>
                {/* Main content */}
                <section className="content">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card">
                            <div className="card-header">
                            </div>
                            <div className="card-body p-0">
                                <ul className="nav nav-pills flex-column">
                                <li className="nav-item active">
                                    <a href="/Course" className="nav-link">
                                        <i className="fas fa-tachometer-alt" /> &ensp; Course Dashboard
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/Course/Announcement" className="nav-link">
                                        <i className="fas fa-bullhorn" /> &ensp; Announcement
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/Course/Assigments" className="nav-link">
                                        <i className="fas fa-file-signature" /> &ensp; Assignments
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="fas fa-filter" /> &ensp; Discussion
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="fas fa-calculator" /> &ensp; Grades
                                    </a>
                                </li>
                                </ul>
                            </div>
                            {/* /.card-body */}
                            </div>
                            {/* /.card */}
                            <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Labels</h3>
                            </div>
                            <div className="card-body p-0">
                                <ul className="nav nav-pills flex-column">
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                    <i className="fas fa-star text-warning" />
                                    &ensp; Starred
                                    </a>
                                </li>
                                </ul>
                            </div>
                            {/* /.card-body */}
                            </div>
                            {/* /.card */}
                        </div>
                        {/* /.col */}
                        <div className="col-md-9">
                            <div className="card card-danger card-outline">
                            <div className="card-header">
                                <h3 className="card-title">Announcement</h3>
                                <div className="card-tools">
                                <div className="input-group input-group-sm">
                                    <input type="text" className="form-control" placeholder="Search Mail" />
                                    <div className="input-group-append">
                                    <div className="btn btn-danger">
                                        <i className="fas fa-search" />
                                    </div>
                                    </div>
                                </div>
                                </div>
                                {/* /.card-tools */}
                            </div>
                            {/* /.card-header */}
                            <div className="card-body p-0">
                                <div className="mailbox-controls">
                                {/* Check all button */}
                                <button type="button" className="btn btn-default btn-sm checkbox-toggle"><i className="far fa-square" />
                                </button>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-default btn-sm"><i className="far fa-trash-alt" /></button>
                                </div>
                                {/* /.btn-group */}
                                <button type="button" className="btn btn-default btn-sm"><i className="fas fa-sync-alt" /></button>
                                <div className="float-right">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-default btn-sm"><i className="fas fa-chevron-left" /></button>
                                        <button type="button" className="btn btn-default btn-sm"><i className="fas fa-chevron-right" /></button>
                                    </div>
                                    {/* /.btn-group */}
                                </div>
                                {/* /.float-right */}
                                </div>
                                <div className="table-responsive mailbox-messages">
                                    <table className="table table-hover table-striped">
                                        <tbody>
                                            {
                                                getAnouncement.map((announcement)=>(
                                                    <tr>
                                                        <td>
                                                            <div className="icheck-primary">
                                                                <input type="checkbox" defaultValue id="check1" />
                                                                <label htmlFor="check1" />
                                                            </div>
                                                        </td>
                                                        <td className="mailbox-star"><i className="fas fa-star text-warning" /></td>
                                                        <td className="mailbox-name">{announcement.Asid}</td>
                                                        <td className="mailbox-subject">
                                                            {announcement.Description}
                                                        </td>
                                                        <td className="mailbox-attachment" />
                                                        <td className="mailbox-date">5 mins ago</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    {/* /.table */}
                                </div>
                                {/* /.mail-box-messages */}
                            </div>
                            {/* /.card-body */}
                            <div className="card-footer p-0">
                                <div className="mailbox-controls">
                                {/* Check all button */}
                                <button type="button" className="btn btn-default btn-sm checkbox-toggle"><i className="far fa-square" />
                                </button>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-default btn-sm"><i className="far fa-trash-alt" /></button>
                                </div>
                                {/* /.btn-group */}
                                <button type="button" className="btn btn-default btn-sm"><i className="fas fa-sync-alt" /></button>
                                <div className="float-right">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-default btn-sm"><i className="fas fa-chevron-left" /></button>
                                        <button type="button" className="btn btn-default btn-sm"><i className="fas fa-chevron-right" /></button>
                                    </div>
                                    {/* /.btn-group */}
                                </div>
                                {/* /.float-right */}
                                </div>
                            </div>
                            </div>
                            {/* /.card */}
                        </div>
                        {/* /.col */}
                    </div>
                    {/* /.row */}
                </section>
                {/* /.content */}
            </div>
        );
    }
}

export default AnnouncementContent