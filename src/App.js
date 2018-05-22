import React, { Component } from 'react';
import { connect } from 'react-redux';
import { add_Gun , remove_Gun , add_GunAsync } from './index.redux.index.js'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>现在的数据是{this.props.num}</h1>
        <button onClick={ this.props.add_Gun }> 添加</button>
        <button onClick={ this.props.remove_Gun }> 减少</button>
        <button onClick={ this.props.add_GunAsync }> 拖2天给</button>
      </div>
    );
  }
}


const mapStateToProps = (state)=>{
  return {num:state}
}

const actionCreator = { add_Gun , remove_Gun , add_GunAsync }

App = connect(mapStateToProps,actionCreator)(App)
export default App;
