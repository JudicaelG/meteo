import React , { Component }from 'react';
import './App.css';
import Weather from './components/weather';

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            cityname: '',
            lat: '',
            lon: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event) {
        this.setState({cityname: event.target.value});
    }

  componentDidMount() {
        if(navigator.geolocation)
        navigator.geolocation.watchPosition((position) =>{
            this.setState({lat: position.coords.latitude})
            this.setState({lon: position.coords.longitude})
      })
  }

    render() {

        let weather = null;
        if(this.state.lat !== '' && this.state.lon !== '' && this.state.cityname === '')
        {
            weather = <Weather lat={this.state.lat} lon={this.state.lon} cityname={this.state.cityname} />
        }

        if(this.state.cityname !== ''){
            weather = <Weather cityname={this.state.cityname} />
        }
    return (
        <div>
            <div>
                <input className="form-control mb-2 mt-2"  placeholder="Paris" type="text"  value={this.state.cityname} onChange={this.handleChange}/>
            </div>
            <div key={this.state.cityname}>
                {weather}
            </div>
        </div>
    );
  }
}

export default App;
