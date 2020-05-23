import React, {Component} from 'react';
import './adminlteCustom.css';

class CourseDashboard extends Component {
    render() {
        return(
            <div className="content-wrapper" style={{ paddingLeft: '4%', paddingRight: '4%'}}>
            {/* Content Header (Page header) */}
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                        <h1 className="m-0 text-dark">Course Dashboard</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Course Dashboard</li>
                            </ol>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
            {/* /.content-header */}
            {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                {/* Info boxes */}
                <div className="row">
                    <div className="col-3 col-sm-6 col-md-3">
                        {/* /.info-box */}
                        <div className="info-box mb-3 bg-light">
                            <span className="info-box-icon"><i className="fas fa-cloud-download-alt"/></span>
                            <div className="info-box-content">
                                <span className="info-box-text">Course Syllabus</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 col-sm-6 col-md-3">
                        {/* /.info-box */}
                        <div className="info-box mb-3 bg-light">
                            <span className="info-box-icon"><i className="fas fa-cloud-download-alt"/></span>
                            <div className="info-box-content">
                                <span className="info-box-text">Course Modules</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Grade Overview</h5>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8">
                                    <p className="text-center">
                                        <strong>Current Grade Standing</strong>
                                    </p>
                                    <div className="chart">
                                        {/* Sales Chart Canvas */}
                                        <canvas id="salesChart" height={180} style={{height: 180}} />
                                    </div>
                                    {/* /.chart-responsive */}
                                </div>
                                {/* /.col */}
                                <div className="col-md-4">
                                    <p className="text-center">
                                        <strong>Course Assessment Score</strong>
                                    </p>
                                <div className="progress-group">
                                    <span className="progress-text">Exams</span>                                    
                                    <span className="float-right"><b>160</b>/200</span>
                                    <div className="progress progress-sm">
                                    <div className="progress-bar bg-secondary" style={{width: '80%'}} />
                                    </div>
                                </div>
                                <div className="progress-group">
                                    <span className="progress-text">Assignments</span>                                    
                                    <span className="float-right"><b>160</b>/200</span>
                                    <div className="progress progress-sm">
                                    <div className="progress-bar bg-primary" style={{width: '80%'}} />
                                    </div>
                                </div>
                                {/* /.progress-group */}
                                <div className="progress-group">
                                    <span className="progress-text">Quizzes</span>                                    
                                    <span className="float-right"><b>310</b>/400</span>
                                    <div className="progress progress-sm">
                                    <div className="progress-bar bg-danger" style={{width: '75%'}} />
                                    </div>
                                </div>
                                {/* /.progress-group */}
                                <div className="progress-group">
                                    <span className="progress-text">Projects</span>
                                    <span className="float-right"><b>480</b>/800</span>
                                    <div className="progress progress-sm">
                                    <div className="progress-bar bg-success" style={{width: '60%'}} />
                                    </div>
                                </div>
                                {/* /.progress-group */}
                                <div className="progress-group">
                                    <span className="progress-text">Attendance</span>                                    
                                    <span className="float-right"><b>490</b>/500</span>
                                    <div className="progress progress-sm">
                                    <div className="progress-bar bg-warning" style={{width: '98%'}} />
                                    </div>
                                </div>
                                {/* /.progress-group */}
                                </div>
                                {/* /.col */}
                            </div>
                        {/* /.row */}
                        </div>
                    </div>
                    {/* /.card */}
                    </div>
                    {/* /.col */}
                </div>
                {/* /.row */}
                {/* Main row */}
                <div className="row">
                    {/* Left col */}
                    <div className="col-md-8">
                    {/* TABLE: LATEST ORDERS */}
                    <div className="card">
                        <div className="card-header border-transparent">
                        <h3 className="card-title">Assignment Due</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table m-0">
                            <thead>
                                <tr>
                                <th>Course Name</th>
                                <th>Assignment Title</th>
                                <th>Status</th>
                                <th>Submission Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><a href="/Course">COM S 319</a></td>
                                    <td><a href="/Course/Assigments">Project 3</a></td>
                                    <td><span className="badge badge-warning">Pending</span></td>
                                    <td>
                                        <div className="sparkbar" data-color="#00a65a" data-height={20}>May 7, 2020</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><a href="/Course">COM S 319</a></td>
                                    <td><a href="/Course/Assigments">Homework 8</a></td>
                                    <td><span className="badge badge-warning">Pending</span></td>
                                    <td>
                                        <div className="sparkbar" data-color="#f39c12" data-height={20}>May 7, 2020</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><a href="/Course">COM S 319</a></td>
                                    <td><a href="/Course/Assigments">Project 3</a></td>
                                    <td><span className="badge badge-warning">Pending</span></td>
                                    <td>
                                        <div className="sparkbar" data-color="#00a65a" data-height={20}>May 7, 2020</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><a href="/Course">COM S 319</a></td>
                                    <td><a href="/Course/Assigments">Homework 8</a></td>
                                    <td><span className="badge badge-warning">Pending</span></td>
                                    <td>
                                        <div className="sparkbar" data-color="#f39c12" data-height={20}>May 7, 2020</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><a href="/Course">COM S 319</a></td>
                                    <td><a href="/Course/Assigments">Project 3</a></td>
                                    <td><span className="badge badge-warning">Pending</span></td>
                                    <td>
                                        <div className="sparkbar" data-color="#00a65a" data-height={20}>May 7, 2020</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><a href="/Course">COM S 319</a></td>
                                    <td><a href="/Course/Assigments">Homework 8</a></td>
                                    <td><span className="badge badge-warning">Pending</span></td>
                                    <td>
                                        <div className="sparkbar" data-color="#f39c12" data-height={20}>May 7, 2020</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><a href="/Course">COM S 319</a></td>
                                    <td><a href="/Course/Assigments">Project 3</a></td>
                                    <td><span className="badge badge-warning">Pending</span></td>
                                    <td>
                                        <div className="sparkbar" data-color="#00a65a" data-height={20}>May 7, 2020</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><a href="/Course">COM S 319</a></td>
                                    <td><a href="/Course/Assigments">Homework 7</a></td>
                                    <td><span className="badge badge-warning">Pending</span></td>
                                    <td>
                                        <div className="sparkbar" data-color="#f39c12" data-height={20}>May 7, 2020</div>
                                    </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        {/* /.table-responsive */}
                        </div>
                        {/* /.card-body */}
                        <div className="card-footer clearfix">
                            <a href="/Course/Assigments" className="uppercase">View All Due Assignment</a>
                        </div>
                        {/* /.card-footer */}
                    </div>
                    {/* /.card */}
                    {/* TABLE: LATEST ORDERS */}
                    <div className="card">
                        <div className="card-header border-transparent">
                            <h3 className="card-title">Assignment Submission</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table m-0">
                            <thead>
                                <tr>
                                <th>Course Name</th>
                                <th>Assignment Title</th>
                                <th>Status</th>
                                <th>Submission Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><a href="/Course">COM S 319</a></td>
                                    <td><a href="/Course/Assigments">HW5</a></td>
                                    <td><span className="badge badge-success">Graded</span></td>
                                    <td>
                                        <div className="sparkbar" data-color="#00a65a" data-height={20}>May 23 2020</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><a href="/Course">COM S 319</a></td>
                                    <td><a href="/Course/Assigments">Quiz 2</a></td>
                                    <td><span className="badge badge-warning">Late</span></td>
                                    <td>
                                        <div className="sparkbar" data-color="#f39c12" data-height={20}>May 23 2020</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><a href="/Course">COM S 319</a></td>
                                    <td><a href="/Course/Assigments">Proposal Assignment</a></td>
                                    <td><span className="badge badge-danger">Missing</span></td>
                                    <td>
                                        <div className="sparkbar" data-color="#f56954" data-height={20}>May 23 2020</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><a href="/Course">COM S 319</a></td>
                                    <td><a href="/Course/Assigments">Hw6</a></td>
                                    <td><span className="badge badge-info">Submitted</span></td>
                                    <td>
                                        <div className="sparkbar" data-color="#00c0ef" data-height={20}>May 23 2020</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><a href="/Course">COM S 319</a></td>
                                    <td><a href="/Course/Assigments">Homework 2</a></td>
                                    <td><span className="badge badge-warning">Late</span></td>
                                    <td>
                                        <div className="sparkbar" data-color="#f39c12" data-height={20}>May 23 2020</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><a href="/Course">COMS 319</a></td>
                                    <td><a href="/Course/Assigments">Group Activity</a></td>
                                    <td><span className="badge badge-danger">Missing</span></td>
                                    <td>
                                        <div className="sparkbar" data-color="#f56954" data-height={20}>May 23 2020</div>
                                    </td>
                                </tr>
                                <tr>
                                <td><a href="/Course">COM S 319</a></td>
                                <td><a href="/Course/Assigments">HW2: Compiling with Pyrite</a></td>
                                <td><span className="badge badge-success">Graded</span></td>
                                <td>
                                    <div className="sparkbar" data-color="#00a65a" data-height={20}>January 23 2020</div>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        {/* /.table-responsive */}
                        </div>
                        {/* /.card-body */}
                        <div className="card-footer clearfix">
                            <a href="/Course/Assigments" className="uppercase">View All Submission</a>
                        </div>
                        {/* /.card-footer */}
                    </div>
                    {/* /.card */}
                    </div>
                    {/* /.col */}
                    <div className="col-md-4">                 
                        {/* ANNOUNCEMENT LIST */}
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Announcement</h3>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body p-0">
                            <ul className="products-list product-list-in-card pl-2 pr-2">
                                <li className="item">
                                <div className="product-img">
                                    <div style={{backgroundColor:'#FF4646', width:'50px', height: '50px'}}></div>
                                </div>
                                <div className="product-info">
                                    <a href="/Course" className="product-title">COM S 319
                                    <span className="badge badge-danger float-right">Unread</span></a>
                                    <span className="product-description">
                                        <a href="/Course/Announcement">HW 7 Posted</a>
                                    </span>
                                </div>
                                </li>
                                {/* /.item */}
                                <li className="item">
                                <div className="product-img">
                                    <div style={{backgroundColor:'#FF4646', width:'50px', height: '50px'}}></div>
                                </div>
                                <div className="product-info">
                                    <a href="/Course" className="product-title">COM S 319
                                    <span className="badge badge-danger float-right">Unread</span></a>
                                    <span className="product-description">
                                        <a href="/Course/Announcement">Lab Activity 8</a>
                                    </span>
                                </div>
                                </li>
                                {/* /.item */}
                                <li className="item">
                                <div className="product-img">
                                    <div style={{backgroundColor:'#FF4646', width:'50px', height: '50px'}}></div>
                                </div>
                                <div className="product-info">
                                    <a href="/Course" className="product-title">COM S 319
                                    <span className="badge badge-danger float-right">Unread</span>
                                    </a>
                                    <span className="product-description">
                                        <a href="/Course/Announcement">Instruction Manual Assignment Posted</a>
                                    </span>
                                </div>
                                </li>
                                {/* /.item */}
                                <li className="item">
                                <div className="product-img">
                                    <div style={{backgroundColor:'#FF4646', width:'50px', height: '50px'}}></div>
                                </div>
                                <div className="product-info">
                                    <a href="/Course" className="product-title">COM S 319
                                    <span className="badge badge-danger float-right">Unread</span></a>
                                    <span className="product-description">
                                        <a href="/Course/Announcement">Quiz 2 due this Monday</a>
                                    </span>
                                </div>
                                </li>
                                {/* /.item */}
                            </ul>
                            </div>
                            {/* /.card-body */}
                            <div className="card-footer text-center">
                                <a href="/Course/Announcement">View All Announcement</a>
                            </div>
                            {/* /.card-footer */}
                        </div>
                        {/* /.card */}
                        {/* DISCUSSION LIST */}
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Discussion</h3>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body p-0">
                            <ul className="products-list product-list-in-card pl-2 pr-2">
                                <li className="item">
                                <div className="product-img">
                                    <div style={{backgroundColor:'#FF4646', width:'50px', height: '50px'}}></div>
                                </div>
                                <div className="product-info">
                                    <a href="/Course" className="product-title">COM S 319
                                    <span className="badge badge-danger float-right">Unread</span></a>
                                    <span className="product-description">
                                    HW 7 Posted
                                    </span>
                                </div>
                                </li>
                                {/* /.item */}
                                <li className="item">
                                <div className="product-img">
                                    <div style={{backgroundColor:'#FF4646', width:'50px', height: '50px'}}></div>
                                </div>
                                <div className="product-info">
                                    <a href="/Course" className="product-title">COMS 319
                                    <span className="badge badge-danger float-right">Unread</span></a>
                                    <span className="product-description">
                                    Lab Activity 8
                                    </span>
                                </div>
                                </li>
                                {/* /.item */}
                                <li className="item">
                                <div className="product-img">
                                    <div style={{backgroundColor:'#FF4646', width:'50px', height: '50px'}}></div>
                                </div>
                                <div className="product-info">
                                    <a href="/Course" className="product-title">COM S 319
                                    <span className="badge badge-danger float-right">Unread</span>
                                    </a>
                                    <span className="product-description">
                                        Instruction Manual Assignment Posted
                                    </span>
                                </div>
                                </li>
                                {/* /.item */}
                                <li className="item">
                                <div className="product-img">
                                    <div style={{backgroundColor:'#FF4646', width:'50px', height: '50px'}}></div>
                                </div>
                                <div className="product-info">
                                    <a href="/Course" className="product-title">COM S 319
                                    <span className="badge badge-danger float-right">Unread</span></a>
                                    <span className="product-description">
                                    Quiz 2 due this Monday
                                    </span>
                                </div>
                                </li>
                                {/* /.item */}
                            </ul>
                            </div>
                            {/* /.card-body */}
                            <div className="card-footer text-center">
                                View All Discussion
                            {/* <a href="javascript:void(0)" className="uppercase">View All Discussion</a> */}
                            </div>
                            {/* /.card-footer */}
                        </div>
                        {/* /.card */}
                    </div>
                    {/* /.col */}
                </div>
                {/* /.row */}
                </div>{/*/. container-fluid */}
            </section>
            {/* /.content */}
            </div>

        )
    }
}

export default CourseDashboard;