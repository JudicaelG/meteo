import React , { Component }from 'react';
import './App.css';
import Weather from './components/weather';

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            cityname: 'melsheim'
        }
    }

  render() {
    return (
        <div>
            <Weather cityname={this.state.cityname} />
        </div>
    );
  }
}

export default App;
