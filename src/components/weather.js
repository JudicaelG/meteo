import React, {Component} from 'react'
import ForecastWeather from './forecastWeather'

class Weather extends Component{

    constructor(props){
        super(props)
        this.state = {
            weathers:[],
            lat: '',
            lon: '',
        }
        //this.latLonUpdate = this.latLonUpdate.bind(this);

    }

    changeBackground(weather) {
        switch (weather.toString().toLowerCase()) {
            case 'clouds':
                return 'card backgroundOvercastDay';
            case 'rain' :
                return 'card backgroundRainDay';
            case 'clear' :
                return 'card backgroundClearDay';
            default :
                return 'card'
        }
    }

    componentDidMount() {
        if(this.props.cityname !== ''){
            fetch('https://api.openweathermap.org/data/2.5/weather?q=' + this.props.cityname + '&units=metric&appid=' + process.env.REACT_APP_WEATHER_API + '&lang=fr')
                .then(res => res.json())
                .then((data) => {
                    this.setState({weathers: [data]})
                    if(this.state.weathers.map(weather => weather.cod).toString() === '200'){
                        this.setState({lat: this.state.weathers.map(weather => weather.coord.lat).toString()})
                        this.setState({lon: this.state.weathers.map(weather => weather.coord.lon).toString()})
                    }

                })
                .catch()



        }else{
            fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + this.props.lat + '&lon=' + this.props.lon + '&units=metric&appid=' + process.env.REACT_APP_WEATHER_API + '&lang=fr')
                .then(res => res.json())
                .then((data) => {
                    this.setState({weathers: [data]})
                    this.setState({lat: this.state.weathers.map(weather => weather.coord.lat).toString()})
                    this.setState({lon: this.state.weathers.map(weather => weather.coord.lon).toString()})
                })
                .catch()
        }

    }



    actualWeatherImage(status) {
        switch (status.toString()) {
            case '01d':
                return <img className="float-left" src="https://openweathermap.org/img/wn/01d@2x.png" alt="clear sky"/>;
            case '02d':
                return <img className="float-left" src="https://openweathermap.org/img/wn/02d@2x.png" alt="few clouds"/>;
            case '03d':
                return <img className="float-left" src="https://openweathermap.org/img/wn/03d@2x.png" alt="scattered clouds"/>;
            case '04d':
                return <img className="float-left" src="https://openweathermap.org/img/wn/04d@2x.png" alt="broken clouds"/>;
            case '09d':
                return <img className="float-left" src="https://openweathermap.org/img/wn/09d@2x.png" alt="shower rain"/>;
            case '10d':
                return <img className="float-left" src="https://openweathermap.org/img/wn/10d@2x.png" alt="rain"/>;
            case '11d':
                return <img className="float-left" src="https://openweathermap.org/img/wn/11d@2x.png" alt="thunderstorm"/>;
            case '13d':
                return <img className="float-left" src="https://openweathermap.org/img/wn/13d@2x.png" alt="snow"/>;
            case '50d':
                return <img className="float-left" src="https://openweathermap.org/img/wn/50d@2x.png" alt="mist"/>;
            default:
                return <img className="float-left" src="https://openweathermap.org/img/wn/01d@2x.png" alt="clear sky"/>;
        }
    }

    getTime(datetime){

        let date = new Date(datetime * 1000);
        let min = date.getMinutes()
        let hour = date.getHours()

        if(min < 10){
            min = '0' + min
        }else{
            min = min + ''
        }
        if(hour < 10){
            hour = '0' + hour
        }else{
            hour = hour + ''
        }
        let time = hour + ':' + min
        return time
    }

    findCity(){
        let code = this.state.weathers.map(weather => weather.cod).toString()
        if(code === '404'){
            return false
        }else{
            return true
        }
    }

    windDirection(direction){
        switch (true) {
            case (direction === 0) :
            return <li>Direction : {this.state.weathers.map(weather => weather.wind.deg)}° (N)</li>;
            case (direction >= 0 && direction < 45) :
                return <li>Direction : {this.state.weathers.map(weather => weather.wind.deg)}° (N)</li>;
            case (direction >= 45 && direction < 90) :
                return <li>Direction : {this.state.weathers.map(weather => weather.wind.deg)}° (NE)</li>;
            case (direction >= 90 && direction < 135) :
                return <li>Direction : {this.state.weathers.map(weather => weather.wind.deg)}° (E)</li>;
            case (direction >= 135 && direction < 180) :
                return <li>Direction : {this.state.weathers.map(weather => weather.wind.deg)}° (SE)</li>;
            case (direction >= 180 && direction < 225):
                return <li>Direction : {this.state.weathers.map(weather => weather.wind.deg)}° (S)</li>;
            case (direction >= 225 && direction < 270) :
                return <li>Direction : {this.state.weathers.map(weather => weather.wind.deg)}° (SO)</li>;
            case (direction >= 270 && direction < 315) :
                return <li>Direction : {this.state.weathers.map(weather => weather.wind.deg)}° (O)</li>;
            case (direction >= 315 && direction < 360) :
                return <li>Direction : {this.state.weathers.map(weather => weather.wind.deg)}° (NO)</li>;
            case (direction === 360) :
                return <li>Direction : {this.state.weathers.map(weather => weather.wind.deg)}° (N)</li>;
            default :
                return <li>Direction : no direction</li>;
        }
    }

    render() {
        let forecast
        if(this.state.lat !== '' && this.state.lon !== ''){
            forecast = <ForecastWeather lat={this.state.lat} lon={this.state.lon}/>
        }
        if(!this.findCity()){
            return (<h1>Ville indisponible</h1>)
        }else{
            return(
                <div>
                    <div className={this.changeBackground(this.state.weathers.map(weather => weather.weather[0].main))}>
                        <div className="card-body">
                            <h2 className="card-title">{this.state.weathers.map(weather => weather.name)}</h2>
                            <div className="row">
                                <div className="col-sm d-flex align-items-center">
                                    {this.actualWeatherImage(this.state.weathers.map(weather => weather.weather[0].icon))}
                                    <ul className="pl-2">
                                        <li>{this.state.weathers.map(weather => weather.weather[0].description)}</li>
                                        <li>Nébulosité : {this.state.weathers.map(weather => weather.clouds.all)} %</li>
                                        <li>Température : {this.state.weathers.map(weather => weather.main.temp)} °C</li>
                                    </ul>
                                </div>
                                <div className="col-sm d-flex align-items-center">
                                    <p className="float-left mr-2 mb-0" ><i className="fas fa-wind fa-3x"></i></p>
                                    <ul className="pl-2">
                                        {this.windDirection(this.state.weathers.map(weather => weather.wind.deg))}
                                        <li>Vitesse : {this.state.weathers.map(weather => weather.wind.speed)} km/h</li>
                                    </ul>
                                </div>
                                <div className="col-sm d-flex align-items-center">
                                    <ul className="pl-2">
                                        <li>Ressentit : {this.state.weathers.map(weather => weather.main.feels_like)} C°</li>
                                        <li>Humidité : {this.state.weathers.map(weather => weather.main.humidity)} %</li>
                                        <li>Pression : {this.state.weathers.map(weather => weather.main.pressure)} hPa</li>
                                        <li>Visibilité : {this.state.weathers.map(weather => weather.visibility)} m</li>
                                    </ul>
                                </div>
                                <div className="col-sm d-flex align-items-center">
                                    <ul>
                                        <li className="text-sm-left">Lever et coucher de soleil</li>
                                        <li className="text-center"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 30 30" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.75,15.36c0-0.25,0.1-0.48,0.3-0.69c0.22-0.19,0.46-0.29,0.7-0.29h2.33c0.27,0,0.49,0.1,0.67,0.29
        c0.18,0.19,0.27,0.43,0.27,0.69c0,0.29-0.09,0.53-0.27,0.72c-0.18,0.19-0.41,0.29-0.67,0.29H3.75c-0.27,0-0.5-0.1-0.7-0.3
        C2.85,15.86,2.75,15.62,2.75,15.36z M6.08,7.38c0-0.27,0.09-0.5,0.26-0.68C6.57,6.5,6.8,6.4,7.05,6.4c0.26,0,0.49,0.1,0.68,0.29
        l1.64,1.65c0.19,0.22,0.28,0.45,0.28,0.69c0,0.28-0.09,0.52-0.27,0.7s-0.4,0.28-0.66,0.28c-0.24,0-0.48-0.1-0.7-0.29L6.34,8.11
        C6.17,7.9,6.08,7.65,6.08,7.38z M8.08,20.88c0-0.28,0.1-0.51,0.29-0.68c0.18-0.17,0.4-0.26,0.68-0.26h2.63l3.11-2.92
        c0.1-0.08,0.21-0.08,0.34,0l3.16,2.92h2.77c0.27,0,0.5,0.09,0.69,0.28c0.19,0.18,0.29,0.41,0.29,0.67c0,0.27-0.1,0.5-0.29,0.69
        c-0.19,0.19-0.42,0.29-0.69,0.29h-3.38c-0.1,0-0.2-0.02-0.29-0.07l-2.41-2.27l-2.39,2.27c-0.08,0.05-0.17,0.07-0.28,0.07H9.05
        c-0.27,0-0.5-0.1-0.69-0.29C8.17,21.38,8.08,21.15,8.08,20.88z M9,15.36c0,0.97,0.21,1.85,0.62,2.64c0.02,0.12,0.11,0.18,0.25,0.18
        h1.88c0.07,0,0.12-0.03,0.15-0.08c0.03-0.06,0.02-0.12-0.02-0.19c-0.64-0.77-0.96-1.62-0.96-2.55c0-1.12,0.4-2.08,1.2-2.87
        c0.8-0.79,1.76-1.18,2.89-1.18c1.12,0,2.07,0.39,2.86,1.18c0.79,0.79,1.19,1.74,1.19,2.87c0,0.94-0.32,1.79-0.95,2.55
        c-0.04,0.07-0.05,0.13-0.03,0.19s0.07,0.08,0.15,0.08h1.9c0.13,0,0.21-0.06,0.23-0.18C20.8,17.23,21,16.35,21,15.36
        c0-0.81-0.16-1.59-0.48-2.32c-0.32-0.74-0.75-1.37-1.28-1.91c-0.53-0.53-1.17-0.96-1.91-1.28c-0.74-0.32-1.51-0.47-2.32-0.47
        c-0.81,0-1.59,0.16-2.33,0.47c-0.74,0.32-1.38,0.74-1.92,1.28c-0.54,0.53-0.97,1.17-1.29,1.91C9.16,13.77,9,14.54,9,15.36z
         M14.03,6.4v-2.3c0-0.29,0.09-0.52,0.28-0.71s0.43-0.28,0.71-0.28c0.28,0,0.51,0.09,0.7,0.28S16,3.83,16,4.11v2.3
        c0,0.29-0.09,0.52-0.28,0.71c-0.18,0.18-0.42,0.28-0.7,0.28c-0.29,0-0.52-0.09-0.71-0.28C14.12,6.93,14.03,6.69,14.03,6.4z
         M20.38,9.04c0-0.25,0.09-0.48,0.27-0.69l1.62-1.65c0.19-0.19,0.43-0.29,0.7-0.29c0.27,0,0.51,0.1,0.69,0.29
        c0.19,0.19,0.28,0.42,0.28,0.69c0,0.29-0.09,0.53-0.26,0.73L22,9.73c-0.21,0.19-0.45,0.29-0.7,0.29c-0.27,0-0.49-0.09-0.66-0.28
        S20.38,9.32,20.38,9.04z M22.99,15.36c0-0.27,0.09-0.5,0.27-0.69c0.18-0.19,0.4-0.29,0.66-0.29h2.35c0.27,0,0.5,0.1,0.69,0.29
        c0.19,0.19,0.29,0.43,0.29,0.69c0,0.28-0.1,0.51-0.29,0.71s-0.42,0.3-0.69,0.3h-2.35c-0.27,0-0.49-0.1-0.67-0.29
        C23.08,15.88,22.99,15.64,22.99,15.36z"></path>
                                        </svg> : {this.getTime(this.state.weathers.map(weather => weather.sys.sunrise))}</li>
                                        <li className="text-center"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 30 30" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.88,15.47c0-0.28,0.1-0.5,0.3-0.68c0.17-0.18,0.4-0.26,0.68-0.26h2.31c0.27,0,0.49,0.09,0.67,0.27
        c0.17,0.18,0.26,0.4,0.26,0.67c0,0.28-0.09,0.52-0.27,0.71c-0.18,0.19-0.4,0.29-0.66,0.29H3.87c-0.27,0-0.5-0.1-0.69-0.3
        C2.98,15.97,2.88,15.74,2.88,15.47z M6.17,7.61c0-0.28,0.08-0.51,0.25-0.68c0.2-0.2,0.43-0.3,0.7-0.3c0.29,0,0.51,0.1,0.68,0.3
        l1.62,1.63c0.46,0.44,0.46,0.89,0,1.35c-0.19,0.19-0.4,0.28-0.65,0.28c-0.22,0-0.44-0.09-0.68-0.28L6.43,8.29
        C6.26,8.11,6.17,7.88,6.17,7.61z M8.14,20.89c0-0.26,0.1-0.49,0.3-0.69c0.18-0.18,0.41-0.27,0.68-0.27h3.22
        c0.11,0,0.2,0.02,0.28,0.08l2.35,2.22L17.36,20c0.07-0.05,0.17-0.08,0.29-0.08h3.3c0.27,0,0.5,0.09,0.69,0.28
        c0.19,0.19,0.29,0.42,0.29,0.68c0,0.27-0.1,0.5-0.29,0.69c-0.19,0.19-0.42,0.29-0.69,0.29h-2.68l-3.14,2.84
        c-0.12,0.09-0.23,0.09-0.33,0l-3.08-2.84h-2.6c-0.27,0-0.5-0.1-0.69-0.29C8.24,21.39,8.14,21.16,8.14,20.89z M9.08,15.47
        c0,0.99,0.19,1.87,0.58,2.62c0.06,0.11,0.15,0.16,0.27,0.16h1.87c0.08,0,0.13-0.02,0.15-0.07c0.02-0.05-0.01-0.11-0.07-0.18
        c-0.59-0.74-0.89-1.59-0.89-2.53c0-1.1,0.39-2.04,1.18-2.81c0.79-0.77,1.74-1.16,2.85-1.16c1.1,0,2.04,0.39,2.83,1.16
        c0.78,0.78,1.18,1.71,1.18,2.8c0,0.94-0.3,1.79-0.89,2.53c-0.07,0.07-0.09,0.13-0.07,0.18c0.02,0.05,0.07,0.07,0.15,0.07h1.88
        c0.13,0,0.21-0.05,0.24-0.16c0.41-0.78,0.62-1.66,0.62-2.62c0-0.79-0.16-1.56-0.47-2.29s-0.74-1.37-1.27-1.9s-1.16-0.95-1.89-1.27
        c-0.73-0.32-1.5-0.47-2.3-0.47c-0.8,0-1.57,0.16-2.3,0.47c-0.73,0.32-1.36,0.74-1.89,1.27s-0.95,1.16-1.27,1.9
        S9.08,14.68,9.08,15.47z M14.04,6.66V4.33c0-0.27,0.1-0.5,0.29-0.69s0.42-0.29,0.69-0.29c0.27,0,0.5,0.1,0.69,0.29
        s0.29,0.42,0.29,0.69v2.32c0,0.27-0.1,0.5-0.29,0.69c-0.19,0.19-0.42,0.29-0.69,0.29c-0.27,0-0.5-0.1-0.69-0.29
        C14.13,7.15,14.04,6.93,14.04,6.66z M20.31,9.24c0-0.28,0.09-0.51,0.26-0.67l1.63-1.63c0.16-0.2,0.39-0.3,0.68-0.3
        c0.27,0,0.5,0.1,0.68,0.29c0.18,0.19,0.27,0.42,0.27,0.69c0,0.28-0.08,0.51-0.25,0.68l-1.66,1.63c-0.23,0.19-0.46,0.28-0.69,0.28
        c-0.26,0-0.48-0.09-0.66-0.28C20.4,9.74,20.31,9.51,20.31,9.24z M22.9,15.47c0-0.27,0.09-0.49,0.26-0.67
        c0.17-0.18,0.4-0.27,0.67-0.27h2.32c0.27,0,0.5,0.09,0.69,0.27c0.19,0.18,0.29,0.4,0.29,0.67c0,0.27-0.1,0.5-0.29,0.7
        c-0.19,0.2-0.42,0.3-0.69,0.3h-2.32c-0.26,0-0.48-0.1-0.66-0.29C22.99,15.99,22.9,15.75,22.9,15.47z"></path>
                                        </svg> : {this.getTime(this.state.weathers.map(weather => weather.sys.sunset))}</li>
                                    </ul>
                                </div>
                            </div>
                            <hr className="border-top border-white"></hr>
                            {forecast}
                        </div>

                    </div>
                </div>
            )
        }

    }


}



export default Weather
