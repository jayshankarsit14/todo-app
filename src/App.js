import './App.css';
import { Component } from 'react';
import FirstComponent from './components/learning-example/FirstComponent'
import SecondComponent  from './components/learning-example/SecondComponent';
import ThirdComponent from './components/learning-example/ThirdComponent';
import HelloComponent from './components/learning-example/HelloComponent';
class App extends Component{
  render(){
    return(
      <div className="App">
      My Hellow world
      <FirstComponent/>
      <SecondComponent/>
      <ThirdComponent/>
      <HelloComponent/>
      </div>
    )
  }
}

//class component




export default App;
