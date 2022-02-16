import { Component } from 'react';
import './Counter.css';
import PropTypes from 'prop-types';

class Counter extends Component{
    constructor(){
        super();
        this.state={
            counter : 0
        }
        this.increment=this.increment.bind(this);
        this.decrement=this.decrement.bind(this);
        this.reset=this.reset.bind(this);
    }
    render(){
        return(
          <div className="counter">
            <CounterButton by={1} incementMethod={this.increment} decementMethod={this.decrement} />
            <CounterButton by={5} incementMethod={this.increment} decementMethod={this.decrement}/>
            <CounterButton by={10} incementMethod={this.increment} decementMethod={this.decrement}/>
            <span className="count">{this.state.counter}</span>
            <div><button className='reset' onClick={this.reset}>Reset</button></div>
          </div>
        )
      }

      reset(){
        this.setState({
            counter: 0
        })
      }

      increment(by){
          //console.log(by);
        this.setState(
           (prevState)=> {
              return{counter: prevState.counter+by}
           }
        );
    }

    decrement(by){
        //console.log(by);
      this.setState(
         (prevState)=> {
            return{counter: prevState.counter-by}
         }
      );
  }
}

class CounterButton extends Component{
    constructor(){
        super();
        // this.state={
        //     counter : 0
        // }
        // this.increment=this.increment.bind(this);
        // this.decrement=this.decrement.bind(this);
    }
    render(){
      return(
        <div className="counter">
      <button onClick={()=> this.props.incementMethod(this.props.by)}>+{this.props.by}</button>
      <button onClick={()=> this.props.decementMethod(this.props.by)}>-{this.props.by}</button>
      {/* <span className="count">{this.state.counter}</span> */}
      </div>
      )
    }
    // increment(){
    //     //console.log('increment');
    //     //this.state.counter+1;
    //     this.setState({
    //         counter: this.state.counter+this.props.by,

    //     }
    //     );
    //     this.props.incementMethod(this.props.by);
    // }
    // decrement(){
    //     //console.log('increment');
    //     //this.state.counter+1;
    //     this.setState({
    //         counter: this.state.counter+this.props.by,

    //     }
    //     );
    //     this.props.decementMethod(this.props.by);
    // }
  }

  CounterButton.defaultProps={
      by:1
  }
  CounterButton.propTypes={
    by:PropTypes.number
}
  export default Counter;