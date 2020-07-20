import React, {Component} from 'react'
import ReactDOM from 'react-dom';

class forecastWeather extends Component {

    constructor(props) {
        super(props)
        this.state = {
            weathers: [],

        }
    }

    componentDidMount() {
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + this.props.lat + '&lon=' + this.props.lon + '&%20exclude=current,minutely,hourly&appid=e7244f113d429bc8a453d641e588f3aa')//https://api.openweathermap.org/data/2.5/onecall?lat=48.76&lon=7.52&%20exclude=current,minutely,hourly&appid=e7244f113d429bc8a453d641e588f3aa
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                this.setState({weathers: [data]})
            })
            .catch(console.log)
    }

    test(){
        const element = <h1>trop cool</h1>;
        ReactDOM.create(element, document.getElementById("forecastWeather"))
    }

    render(){
        return (<h1>test</h1>)
    }
}

export default forecastWeather
