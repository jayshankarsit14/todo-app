import { Component } from 'react';
import {BrowserRouter as Router, Link, Route,Routes} from 'react-router-dom';
import withNavigation from './WithNavigation.jsx'  
import withParams from './withParams';
import AuthenticationService from './AuthenticationService.jsx';
import AuthenticatedRoute from './AuthenticatedRoute.jsx';
import LoginComponent from './LoginComponent.jsx';
import FooterComponent from './FooterComponent.jsx';
import HeaderComponent from './HeaderComponent.jsx';
import LogoutComponent from './LogoutComponent.jsx';
import WelComeComponent from './WelComeComponent.jsx';
import ListTodosComponent from './ListTodosComponent.jsx';
import ErrrorComponent from './ErrrorComponent.jsx';
import TodoComponent from './TodoComponent.jsx';
class TodoApp extends Component{
    render(){
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const WelcomeComponentWithParams = withParams(WelComeComponent);
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
        const TodoComponentWithParamsAndNavigation = withParams(withNavigation(TodoComponent));
        const ListTodosComponentWithNavigation = withNavigation(ListTodosComponent) 
        return(
            <div className='TodoApp'>
                <Router>
                    <HeaderComponentWithNavigation/>
                    <Routes>
                    <Route path="/" element={<LoginComponentWithNavigation/>} />
                    <Route path="/login" element={<LoginComponentWithNavigation/>} />
                    <Route path="/welcome/:name" element={
                        <AuthenticatedRoute>
                            <WelcomeComponentWithParams/>
                        </AuthenticatedRoute>
                    } />
                     <Route path="/todos/:id" element={ 
			            	<AuthenticatedRoute>
			            		<TodoComponentWithParamsAndNavigation />
			            	</AuthenticatedRoute>
			            } />
                    <Route path="/todos" element={
                        <AuthenticatedRoute>
                          <ListTodosComponentWithNavigation/>
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
export default TodoApp;