import React, { Component } from 'react';

class Nav extends Component {

  renderSideList(data) {
    return (
      <div className="sidebar-nav navbar-collapse">
        <ul className="nav" id="side-menu">
          <li className="sidebar-search">
            <div className="input-group custom-search-form">
              <input type="text" className="form-control" placeholder="Search..." />
              <span className="input-group-btn">
              <button className="btn btn-default" type="button">
                <i className="fa fa-search"></i>
              </button>
            </span>
            </div>
          </li>
          <li>
            <a href="index.html"><i className="fa fa-dashboard fa-fw"></i> Dashboard</a>
          </li>
          <li>
            <a href="#"><i className="fa fa-bar-chart-o fa-fw"></i> Charts<span className="fa arrow"></span></a>
            <ul className="nav nav-second-level">
              <li>
                <a href="flot.html">Flot Charts</a>
              </li>
              <li>
                <a href="morris.html">Morris.js Charts</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="tables.html"><i className="fa fa-table fa-fw"></i> Tables</a>
          </li>
          <li>
            <a href="forms.html"><i className="fa fa-edit fa-fw"></i> Forms</a>
          </li>
          <li>
            <a href="#"><i className="fa fa-wrench fa-fw"></i> UI Elements<span className="fa arrow"></span></a>
            <ul className="nav nav-second-level">
              <li>
                <a href="panels-wells.html">Panels and Wells</a>
              </li>
              <li>
                <a href="buttons.html">Buttons</a>
              </li>
              <li>
                <a href="notifications.html">Notifications</a>
              </li>
              <li>
                <a href="typography.html">Typography</a>
              </li>
              <li>
                <a href="icons.html"> Icons</a>
              </li>
              <li>
                <a href="grid.html">Grid</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#"><i className="fa fa-sitemap fa-fw"></i> Multi-Level Dropdown<span className="fa arrow"></span></a>
            <ul className="nav nav-second-level">
              <li>
                <a href="#">Second Level Item</a>
              </li>
              <li>
                <a href="#">Second Level Item</a>
              </li>
              <li>
                <a href="#">Third Level <span className="fa arrow"></span></a>
                <ul className="nav nav-third-level">
                  <li>
                    <a href="#">Third Level Item</a>
                  </li>
                  <li>
                    <a href="#">Third Level Item</a>
                  </li>
                  <li>
                    <a href="#">Third Level Item</a>
                  </li>
                  <li>
                    <a href="#">Third Level Item</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <a href="#"><i className="fa fa-files-o fa-fw"></i> Sample Pages<span className="fa arrow"></span></a>
            <ul className="nav nav-second-level">
              <li>
                <a href="blank.html">Blank Page</a>
              </li>
              <li>
                <a href="login.html">Login Page</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }

  renderList(data) {
    return (
      <div>
        <ul className="dropdown-menu dropdown-messages">
          {
            data.forEach((datum) => {
             (
               <li>
                 <a href="#">
                   <div>
                     <strong>{datum.title}</strong>
                     <span className="pull-right text-muted">
                       <em>{datum.note}</em>
                     </span>
                   </div>
                   <div className={datum.className} >{datum.body}</div>
                 </a>
               </li>
               <li className="divider"></li>
             )
           });
          }
          <li></li>
        </ul>
      </div>
    )
  }

  renderButton(data, iconType) {
    return (
      <div>
        <a className="dropdown-toggle" data-toggle="dropdown" href="#">
          <i className="fa {iconType} fa-fw"></i> <i className="fa fa-caret-down"></i>
        </a>
        { renderList(data) }
      </div>
    );
  }
  render() {

    const messageData = [
      {
        title: 'John Smith',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...',
        note: 'Yesterday'
      },
      {
        title: 'John Smith',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...',
        note: 'Yesterday'
      },
      {
        title: 'John Smith',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...',
        note: 'Yesterday'
      }
    ];

    const taskData = [
      {
        title: 'Task 1',
        body: (
          <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: '40%'}}>
            <span className="sr-only">40% Complete (success)</span>
          </div>
        ),
        note: '40% Complete'
      },
      {
        title: 'Task 2',
        body: (
          <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{width: '20%'}}>
            <span className="sr-only">20% Complete (success)</span>
          </div>
        ),
        note: '20% Complete'
      },
      {
        title: 'Task 3',
        body: (
          <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: '60%'}}>
            <span className="sr-only">60% Complete (warning)</span>
          </div>
        ),
        note: '60% Complete',
        classNames: 'progress progress-striped active'
      }
    ]

    return (
      <nav className="navbar navbar-default navbar-static-top" role="navigation" style={{marginBottom: 0}}>
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="index.html">Timeliner</a>
        </div>

        <ul className="nav navbar-top-links navbar-right">
          <li className="dropdown">
            { renderButton(message, 'fa-envelope') }
          </li>
          <li className="dropdown">
            { renderButton( taskData, 'fa-tasks') }
          </li>
          <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
              <i className="fa fa-user fa-fw"></i> <i className="fa fa-caret-down"></i>
            </a>
            <ul className="dropdown-menu dropdown-user">
              <li><a href="#"><i className="fa fa-user fa-fw"></i> User Profile</a>
              </li>
              <li><a href="#"><i className="fa fa-gear fa-fw"></i> Settings</a>
              </li>
              <li className="divider"></li>
              <li><a href="login.html"><i className="fa fa-sign-out fa-fw"></i> Logout</a>
              </li>
            </ul>
          </li>
        </ul>

        <div className="navbar-default sidebar" role="navigation">
          { renderSideList() }
        </div>
      </nav>
    )
  }
}
