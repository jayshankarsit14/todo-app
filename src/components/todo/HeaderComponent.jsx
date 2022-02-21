import { Component } from 'react';
import {Link} from 'react-router-dom';
import AuthenticationService from './AuthenticationService.jsx';
class HeaderComponent extends Component{
    render(){
        const isUserLoggedIn=AuthenticationService.isUserLoggedIn();
        console.log(isUserLoggedIn)
        return(
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="https://getbootstrap.com/">jayshankar</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to="/welcome/:name">Home</Link></li>}
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
export default HeaderComponent;