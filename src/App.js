import './App.css';
import './bootstrap.css';
import { Component } from 'react';
import FirstComponent from './components/learning-example/FirstComponent'
import SecondComponent  from './components/learning-example/SecondComponent';
import ThirdComponent from './components/learning-example/ThirdComponent';
import HelloComponent from './components/learning-example/HelloComponent';
import Counter from './components/counter/Counter';
import TodoApp from './components/todo/TodoApp';
class App extends Component{
  render(){
    return(
      <div className="App">
        <TodoApp/>
      </div>
    )
  }
}

export default App;
