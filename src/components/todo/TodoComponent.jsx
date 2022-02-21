import { Component } from 'react';
import moment from 'moment'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import TodoDataService from '../api/TodoDataService';
import AuthenticationService from './AuthenticationService';
class TodoComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.params.id,
            description :'',
           targetDate:moment(new Date()).format('YYYY-MM-DD')

        }
        this.onSubmit=this.onSubmit.bind(this)
        this.validate=this.validate.bind(this)
    }
    onSubmit(values){
        let username=AuthenticationService.getLoggedInUserName();
        if(this.state.id===-1){
            TodoDataService.createTodo(username,{
                id:this.state.id,
                description:values.description,
                targetDate:values.targetDate
            }).then(
                ()=>{
                    this.props.navigate(`/todos/`)
                }
            )
        }else{
            TodoDataService.updateTodo(username,this.state.id,{
                id:this.state.id,
                description:values.description,
                targetDate:values.targetDate
            }).then(
                ()=>{
                    this.props.navigate(`/todos/`)
                }
            )
        }
        
        //console.log(values)
    }
    validate(values){
        let errors={}
        if(!values.description){
            errors.description='Enter description'
        }else if(values.description.length<5){
            errors.description='Enter atleast 5 characters in description'
        }
        if(!moment(values.targetDate).isValid()){
          errors.targetDate='Enter valid target date'
        }
        return errors;
    }
    componentDidMount(){
        if(this.state.id===-1) {
            return
        }

        let username=AuthenticationService.getLoggedInUserName();
        TodoDataService.retriveTodoService(username,this.state.id)
        .then(
            response=>{
                //console.log(response)
                this.setState(
                    {
                        description:response.data.description,
                        targetDate:response.data.targetDate
                    }
                )
            }
        )
    }
    render(){
        let{ description,targetDate}=this.state
        //let targetDate=this.state.targetDate
        return(
            <div>
                <h1>Todo</h1>
                <div>
                    <Formik
                    initialValues={{description,targetDate}}
                    onSubmit={this.onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}
                    >
                        {
                            (props)=>(
                                <Form>
                                    <ErrorMessage name="description" ></ErrorMessage>
                                    <ErrorMessage name="targetDate" ></ErrorMessage>
                                    <fieldset>
                                         <label>Description</label>
                                         <Field type="text" name="description"/>
                                    </fieldset>
                                    <fieldset>
                                         <label>Target Date</label>
                                         <Field type="date" name="targetDate"/>
                                    </fieldset>
                                    <button type="submit">Save</button>
                                </Form>
                            )
                           
                        }
                    </Formik>
                </div>
            </div>
        )
        
    }
}

export default TodoComponent;