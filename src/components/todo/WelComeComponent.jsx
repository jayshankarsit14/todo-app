import { Component } from 'react';
import {Link} from 'react-router-dom';
import HelloWorldService from '../api/HelloWorldService';
class WelComeComponent extends Component{
    constructor(props){
        super(props)
        this.state={
          welcomeMessage:''
        }
        this.retriveWelcomeMessage=this.retriveWelcomeMessage.bind(this);
        this.handleSuccessFullResponse=this.handleSuccessFullResponse.bind(this);
        this.handleErrorResponse=this.handleErrorResponse.bind(this);
    }
    render(){
        return(
            <div>
                <h1>Welcome!</h1>
                <div>
                 Welcome to {this.props.params.name} website. 
                 You can manage your todos <Link to="/todos">here</Link>
                </div>
                <div>
                 click here to get the customized message.
                 <button onClick={this.retriveWelcomeMessage}>Get Welcome Message</button>
                </div>
                <div>
                      {this.state.welcomeMessage}
                </div>
            </div>
        )
    }
    retriveWelcomeMessage(){
        // HelloWorldService.executeHelloWorldService()
        // .then(response =>{this.handleSuccessFullResponse(response)})

        HelloWorldService.executeHelloWorldBeanServicePathVariable(this.props.params.name)
        .then(response =>{this.handleSuccessFullResponse(response)})
        .catch(error=>this.handleErrorResponse(error))


    }

    handleSuccessFullResponse(response){
        this.setState(
            {
                welcomeMessage : response.data.message
            }
        )
    }
    handleErrorResponse(error){
        console.log(error.response);
        let errorMessage='';
        if(error.message){
            errorMessage+=error.message
        }
        if(error.response && error.response.data){
            errorMessage+=error.response.data.message
        }
        this.setState(
            {
                welcomeMessage : errorMessage
            }
        )
    }
}
export default WelComeComponent;