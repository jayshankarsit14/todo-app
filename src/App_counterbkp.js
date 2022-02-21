import './App.css';
import { Component } from 'react';
import FirstComponent from './components/learning-example/FirstComponent'
import SecondComponent  from './components/learning-example/SecondComponent';
import ThirdComponent from './components/learning-example/ThirdComponent';
import HelloComponent from './components/learning-example/HelloComponent';
import Counter from './components/counter/Counter';
class App extends Component{
  render(){
    return(
      <div className="App">
        <Counter/>

      </div>
    )
  }
}

//class component
 class LearningComponent extends Component{
  render(){
    return(
      <div className="LearningComponent">
      My Hellow world
      <FirstComponent/>
      <SecondComponent/>
      <ThirdComponent/>
      <HelloComponent/>
      </div>
    )
  }
 }



export default App;
