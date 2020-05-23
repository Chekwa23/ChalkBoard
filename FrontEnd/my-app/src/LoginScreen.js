import React, { Component } from 'react';
import Helmet from 'react-helmet';
import './LoginScreen.css';

const TitleComp = ({ title }) => {
    var defaultTitle = 'ChalkBoard';
    return (
        <Helmet>
            <title>{title ? title : defaultTitle}</title>
        </Helmet>
    );
};
export { TitleComp };

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"",
      password:"", 
      list:[]
    }
  }

  login(){
    /*fake login method
    just adds username to a list below the input textboxes*/
    const newUser = {
      id: 1 + Math.random(),
      value: this.state.username.slice()
    }
    // const newPass = {
    //   id: newUser.id
    //   value: this.state.password.slice()
    // }

    const list = [...this.state.list];

    list.push(newUser);

    this.setState({
      list,
      username:"",
      password:""
    });
  }
  
  updatePassword(key, value){
    this.setState({
      [key]:value
    });
  }

  updateUsername(key, value){
    this.setState({
      [key]:value
    });
  }
  
  render() {
    return (
      
      <div className="LoginScreen">
        <div>
          <h1>Login:</h1>
          <br/>
          <input
            type="text"
            placeholder="Type username here.."
            value={this.state.username}
            onChange={e => this.updateUsername("username", e.target.value)}
          />
          <br/>
          <input
            type="text"
            placeholder="Type password here.."
            value={this.state.password}
            onChange={e => this.updatePassword("password", e.target.value)}
          />
          <br/>
          <button onClick={() => this.login(this.state.username, this.state.password)}>Login</button>
          <br/>
          <ul>
            {this.state.list.map(item =>{
              return(
                <li key={item.id}>
                  {item.value}
                  <button onClick={() => this.deleteItem(item.id)}>X
                  </button>
                </li>)})}
          </ul>
        </div>    
      </div>
    );
  }
}

export default LoginScreen;
