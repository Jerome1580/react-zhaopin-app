import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    const store = this.props.store;
    const num = store.getState()
    const ADD_GUN = this.props.ADD_GUN;
    const REMOVE_GUN = this.props.REMOVE_GUN;
    return (
      <div className="App">
        <h1>现在的数据是{num}</h1>
        <button onClick={ ()=>store.dispatch(ADD_GUN())}> 添加</button>
        <button onClick={ ()=>store.dispatch(REMOVE_GUN())}> 减少</button>
      </div>
    );
  }
}

export default App;
