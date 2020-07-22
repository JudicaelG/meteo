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
            fetch('http://api.openweathermap.org/data/2.5/weather?q=' + this.props.cityname + ',fr&units=metric&appid=e7244f113d429bc8a453d641e588f3aa&lang=fr')//http://api.openweathermap.org/data/2.5/weather?q=melsheim,fr&appid=e7244f113d429bc8a453d641e588f3aa
                .then(res => res.json())
                .then((data) => {
                    this.setState({weathers: [data]})
                    this.setState({lat: this.state.weathers.map(weather => weather.coord.lat).toString()})
                    this.setState({lon: this.state.weathers.map(weather => weather.coord.lon).toString()})
                    //this.latLonUpdate();
                })
                .catch(console.log)
        }else{
            fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + this.props.lat + '&lon=' + this.props.lon + '&units=metric&appid=e7244f113d429bc8a453d641e588f3aa&lang=fr')//http://api.openweathermap.org/data/2.5/weather?q=melsheim,fr&appid=e7244f113d429bc8a453d641e588f3aa
                .then(res => res.json())
                .then((data) => {
                    this.setState({weathers: [data]})
                    this.setState({lat: this.state.weathers.map(weather => weather.coord.lat).toString()})
                    this.setState({lon: this.state.weathers.map(weather => weather.coord.lon).toString()})
                    //this.latLonUpdate();
                })
                .catch(console.log)
        }

    }

    isRain(){
        if(!(this.state.weathers.map(weather => weather.rain))){
            return <div className="col">
                <h5>Précipitations</h5>
                <p>1h : {this.state.weathers.map(weather => weather.rain["1h"])} mm</p>
                <p>3h : {this.state.weathers.map(weather => weather.rain["3h"])} mm</p>
            </div>
        }
        else{
            return <div className="col">
                <h5>Précipitations</h5>
                <p>1h : 0 mm</p>
                <p>3h : 0 mm</p>
            </div>
        }
    }

    isSnow(){
        if(!(this.state.weathers.map(weather => weather.snow))){
            return <div className="col">
                <h5>Neiges</h5>
                <p>1h : {this.state.weathers.map(weather => weather.snow["1h"])} mm</p>
                <p>3h : {this.state.weathers.map(weather => weather.snow["3h"])} mm</p>
            </div>
        }
        else{
            return <div className="col">
                <h5>Neiges</h5>
                <p>1h : 0 mm</p>
                <p>3h : 0 mm</p>
            </div>
        }
    }

    actualWeatherImg(status) {
        switch (status.toString()) {
            case '01d':
                return <img className="float-left" src="http://openweathermap.org/img/wn/01d@2x.png" alt="clear sky"/>;
            case '02d':
                return <img className="float-left" src="http://openweathermap.org/img/wn/02d@2x.png" alt="few clouds"/>;
            case '03d':
                return <img className="float-left" src="http://openweathermap.org/img/wn/03d@2x.png" alt="scattered clouds"/>;
            case '04d':
                return <img className="float-left" src="http://openweathermap.org/img/wn/04d@2x.png" alt="broken clouds"/>;
            case '09d':
                return <img className="float-left" src="http://openweathermap.org/img/wn/09d@2x.png" alt="shower rain"/>;
            case '10d':
                return <img className="float-left" src="http://openweathermap.org/img/wn/10d@2x.png" alt="rain"/>;
            case '11d':
                return <img className="float-left" src="http://openweathermap.org/img/wn/11d@2x.png" alt="thunderstorm"/>;
            case '13d':
                return <img className="float-left" src="http://openweathermap.org/img/wn/13d@2x.png" alt="snow"/>;
            case '50d':
                return <img className="float-left" src="http://openweathermap.org/img/wn/50d@2x.png" alt="mist"/>;
            default:
                return <img className="float-left" src="http://openweathermap.org/img/wn/01d@2x.png" alt="clear sky"/>;
        }
    }

    getTime(datetime){
        let date = new Date(datetime * 1000);
        let time = date.getHours() + ':' + date.getMinutes()
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
            return <li>{this.state.weathers.map(weather => weather.wind.deg)}° (N)</li>;
            case (direction >= 0 && direction < 45) :
                return <li>{this.state.weathers.map(weather => weather.wind.deg)}° (N)</li>;
            case (direction >= 45 && direction < 90) :
                return <li>{this.state.weathers.map(weather => weather.wind.deg)}° (NE)</li>;
            case (direction >= 90 && direction < 135) :
                return <li>{this.state.weathers.map(weather => weather.wind.deg)}° (E)</li>;
            case (direction >= 135 && direction < 180) :
                return <li>{this.state.weathers.map(weather => weather.wind.deg)}° (SE)</li>;
            case (direction >= 180 && direction < 225):
                return <li>{this.state.weathers.map(weather => weather.wind.deg)}° (S)</li>;
            case (direction >= 225 && direction < 270) :
                return <li>{this.state.weathers.map(weather => weather.wind.deg)}° (SO)</li>;
            case (direction >= 270 && direction < 315) :
                return <li>{this.state.weathers.map(weather => weather.wind.deg)}° (O)</li>;
            case (direction >= 315 && direction < 360) :
                return <li>{this.state.weathers.map(weather => weather.wind.deg)}° (NO)</li>;
            case (direction === 360) :
                return <li>{this.state.weathers.map(weather => weather.wind.deg)}° (N)</li>;
            default :
                return <li>{this.state.weathers.map(weather => weather.wind.deg)}°</li>;
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
                <div className={this.changeBackground(this.state.weathers.map(weather => weather.weather[0].main))}>
                    <div className="card-body">
                        <h2 className="card-title">{this.state.weathers.map(weather => weather.name)}</h2>
                        <div className="row">
                            <div className="col d-flex align-items-center">
                                {this.actualWeatherImg(this.state.weathers.map(weather => weather.weather[0].icon))}
                                <ul>
                                    <li>{this.state.weathers.map(weather => weather.weather[0].description)}</li>
                                    <li>Nébulosité : {this.state.weathers.map(weather => weather.clouds.all)} %</li>
                                    <li>Température : {this.state.weathers.map(weather => weather.main.temp)} C°</li>
                                </ul>
                            </div>
                            <div className="col d-flex align-items-center">
                                <p className="float-left mr-2 mb-0" ><i className="fas fa-wind fa-3x"></i></p>
                                <ul>
                                    {this.windDirection(this.state.weathers.map(weather => weather.wind.deg))}
                                    <li> {this.state.weathers.map(weather => weather.wind.speed)} km/h</li>
                                </ul>
                            </div>
                            <div className="col d-flex align-items-center">
                                <div>
                                    <ul>
                                        <li>Ressentit : {this.state.weathers.map(weather => weather.main.feels_like)} C°</li>
                                        <li>Humidité : {this.state.weathers.map(weather => weather.main.humidity)} %</li>
                                        <li>Pression : {this.state.weathers.map(weather => weather.main.pressure)} hPa</li>
                                        <li>Visibilité : {this.state.weathers.map(weather => weather.visibility)} m</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <h2 className="card-title">Détails</h2>
                        <div className="row">
                            <div className="col">
                                <div>
                                    <h5 >Températures</h5>
                                    <p><i className="fas fa-thermometer-full"></i> Max: {this.state.weathers.map(weather => weather.main.temp_max)} C°</p>
                                    <p><i className="fas fa-thermometer-quarter"></i> Min: {this.state.weathers.map(weather => weather.main.temp_min)} C°</p>
                                </div>
                            </div>
                            <div className="col">
                                <div>
                                    <h5>Lever et coucher de soleil</h5>
                                    <p>{this.getTime(this.state.weathers.map(weather => weather.sys.sunrise))}</p>
                                    <p>{this.getTime(this.state.weathers.map(weather => weather.sys.sunset))}</p>
                                </div>
                            </div>
                            {this.isRain()}
                            {this.isSnow()}
                        </div>
                    </div>
                    <div className="card-body" id="forecastWeather">
                        <h2 className="card-title">Prévisions</h2>
                        {forecast}
                    </div>

                </div>
            )
        }

    }


}



export default Weather
