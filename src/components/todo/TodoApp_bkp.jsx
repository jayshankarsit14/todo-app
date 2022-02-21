import { Component } from 'react';
import {BrowserRouter as Router, Link, Route,Routes} from 'react-router-dom';
import withNavigation from './WithNavigation.jsx'  
import withParams from './withParams';
import AuthenticationService from './AuthenticationService.jsx';
import AuthenticatedRoute from './AuthenticatedRoute.jsx';

class TodoApp extends Component{
    render(){
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const WelcomeComponentWithParams = withParams(WelComeComponent);
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
        return(
            <div className='TodoApp'>
                <Router>
                    <HeaderComponentWithNavigation/>
                    <Routes>
                    <Route path="/" element={<LoginComponentWithNavigation/>} />
                    <Route path="/login" element={<LoginComponentWithNavigation/>} />
                    <Route path="/welcome/:name" element={
                        <AuthenticatedRoute><WelcomeComponentWithParams/></AuthenticatedRoute>
                    } />
                    <Route path="/todos" element={
                        <AuthenticatedRoute>
                          <ListTodosComponent/>
                        </AuthenticatedRoute>
                    } />
                    <Route path="/logout" element={
                        <AuthenticatedRoute><LogoutComponent/></AuthenticatedRoute> 
                    } />
                    <Route path="*" element={<ErrrorComponent/>} />
                    </Routes>
                    <FooterComponent/>
                </Router>
            </div>
        )
    }
}

class HeaderComponent extends Component{
    render(){
        const isUserLoggedIn=AuthenticationService.isUserLoggedIn();
        console.log(isUserLoggedIn)
        return(
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="https://getbootstrap.com/">jayshankar</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to="/welcome">Home</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {isUserLoggedIn &&  <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav><hr/>
            </header>

        )
    }
}

class FooterComponent extends Component{
    render(){
        return(
            <div>
               <footer className='footer'>
                 <span className='text-muted'> All right reserved 2021 @jayshankar</span>
               </footer>
            </div>
        )
    }
}

class LogoutComponent extends Component{
    render(){
        return(
            <div>
               <h1>you have been logout</h1>
               <div className='container'>
                  Thank you for using our application
               </div>
            </div>
        )
    }
}

function ErrrorComponent(){
    console.log("Error message")
    return <div>An error occured. Please do later</div>
}

class WelComeComponent extends Component{
    render(){
        return(
            <div>
                <h1>Welcome!</h1>
                <div>
                 Welcome to {this.props.params.name} website. You can manage your todos <Link to="/todos">here</Link>
                </div>
            </div>
        )
    }
}


class ListTodosComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            todos:[
                {id:1,description:'Learn React',done:false,targetDate:new Date()},
                {id:2,description:'Learn Angular',done:true,targetDate:new Date()},
                {id:3,description:'Learn java',done:true,targetDate:new Date()},
                {id:4,description:'Learn html',done:true,targetDate:new Date()}
            ]
            
        }
    }
    render(){
        return <div>
            <h1>List Todos</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Target Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.todos.map(
                            todo=>
                      <tr key={todo.id}>
                      <td>{todo.id}</td>
                      <td>{todo.description}</td>
                      <td>{todo.done.toString()}</td>
                      <td>{todo.targetDate.toString()}</td>
                       </tr>
                        )
                    }
                   
                </tbody>
            </table>
            </div>
    }
}

class LoginComponent extends Component{
    constructor(){
        super();
        this.state={
            username:"jayshankar",
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
        if(this.state.username==='jayshankar' && this.state.password==='jayshankar123'){
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

function ShowInvalidCredentials(props){
    if(props.hasLoginFailed){
        return <div>Invalid Credentisls</div>
    }
    else{
      return null
    }
} 

function ShowLoginSuccessMessage(props){
    if(props.showSuccessMessage){
        return <div>Login Successful</div>
    }
    else{
      return null
    }
}

export default TodoApp;