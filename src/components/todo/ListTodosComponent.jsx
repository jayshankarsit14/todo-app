import moment from 'moment';
import { Component } from 'react';
import TodoDataService from '../api/TodoDataService';
import AuthenticationService from './AuthenticationService';
class ListTodosComponent extends Component{
    constructor(props){
        console.log("Constructor")
        super(props)
        this.state={
            todos:[
                // {id:1,description:'Learn React',done:false,targetDate:new Date()},
                // {id:2,description:'Learn Angular',done:true,targetDate:new Date()},
                // {id:3,description:'Learn java',done:true,targetDate:new Date()},
                // {id:4,description:'Learn html',done:true,targetDate:new Date()}
            ],
            message:null
            
        }
        this.deleteTodoClicked=this.deleteTodoClicked.bind(this)
        this.updateTodoClicked=this.updateTodoClicked.bind(this)
        this.addTodoClicked=this.addTodoClicked.bind(this)
    }

    componentWillUnmount(){
        console.log("componentWillUnmount")
    }

    shouldComponentUpdate(nextProps,nextState){
        console.log("shouldComponentUpdate")
        console.log(nextProps)
        console.log(nextState)
        return true;
    }

    componentDidMount(){
        console.log("componentDidMount")
        this.refreshTodos();
       
    }

    refreshTodos(){
        let username=AuthenticationService.getLoggedInUserName();
        TodoDataService.retriveAllTodoService(username)
        .then(
            response=>{
                //console.log(response)
                this.setState(
                    {
                        todos:response.data
                    }
                )
            }
        )
    }

    deleteTodoClicked(id){
        let username=AuthenticationService.getLoggedInUserName();
        //console.log(id+" "+username);
        TodoDataService.deleteTodo(username,id)
        .then(
            response =>{
                this.setState({message :`Delete of todo ${id} successful`})
                this.refreshTodos()
            }
        )
    }

    updateTodoClicked(id){
        console.log("update "+id);
        this.props.navigate(`/todos/${id}`)
    }

    addTodoClicked(){
        console.log("jay shankar")
        this.props.navigate(`/todos/-1`)
    }

    render(){
        console.log("render")
        return <div>
            <h1>List Todos</h1>
            {this.state.message && <div>{this.state.message}</div>}
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Target Date</th>
                        <th>update</th>
                        <th>Delete</th>
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
                      <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                      <td><button onClick={()=> this.updateTodoClicked(todo.id)}>update</button></td>
                      <td><button onClick={()=> this.deleteTodoClicked(todo.id)}>Delete</button></td>
                       </tr>
                        )
                    }
                   
                </tbody>
            </table>
            <button onClick={this.addTodoClicked}>Add</button>
            </div>
    }
}

export default ListTodosComponent;