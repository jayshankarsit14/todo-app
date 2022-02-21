import { Component } from 'react';
import {BrowserRouter as Router, Link, Route,Routes} from 'react-router-dom';
import AuthenticationService from './AuthenticationService.jsx';

class LoginComponent extends Component{
    constructor(){
        super();
        this.state={
            username:"jayshankar123",
            password:"jayshankar123",
            hasLoginFailed: false,
            showSuccessMessage:false
        }
        // this.handleUsernameChange=this.handleUsernameChange.bind(this)
        // this.handlePasswordChange=this.handlePasswordChange.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.loginClicked=this.loginClicked.bind(this)
    }
    
    //More optimized way
    handleChange(event){
     console.log(event.target.name)
     this.setState(
        {
            [event.target.name]: event.target.value
        }
    )

    }

    loginClicked(){
        console.log(this.state.username);
        console.log(this.state.password);
        if(this.state.username==='jayshankar123' && this.state.password==='jayshankar123'){
            AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password);
            console.log("successfull")
            this.props.navigate(`/welcome/${this.state.username}`)
            // this.setState(
            //     {
            //         showSuccessMessage:true,
            //         hasLoginFailed:false
            //     }
            // )
        }
        else{
            console.log("failed")
            this.setState(
                {
                    showSuccessMessage:false,
                    hasLoginFailed:true
                }
            )
        }
        
    }
    // handleUsernameChange(event){
    //    //console.log(event.target.value);
    //    this.setState(
    //        {
    //            username:event.target.value
    //        }
    //    )
    // }

    // handlePasswordChange(event){
    //     //console.log(event.target.value);
    //     this.setState(
    //         {
    //             password:event.target.value
    //         }
    //     )
    // }

    render(){
        return(
            <div>
                <h1>Login</h1>
                {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/> */}
                {this.state.hasLoginFailed && <div>Invalid Credentials</div>}
                {/* <ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/> */}
                {this.state.showSuccessMessage && <div>Login Successful</div>}
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                Password:<input type="password" name ="password" value={this.state.password} onChange={this.handleChange}/>
                <button onClick={this.loginClicked}>Login</button>
            </div>
        )
    }
}


export default LoginComponent;