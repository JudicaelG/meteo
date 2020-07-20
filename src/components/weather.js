import React, {Component} from 'react'

class Weather extends Component{

    constructor(props){
        super(props)
        this.state = {
            weathers:[]
        }
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

        fetch('http://api.openweathermap.org/data/2.5/weather?q=' + this.props.cityname + ',fr&units=metric&appid=e7244f113d429bc8a453d641e588f3aa&lang=fr')//http://api.openweathermap.org/data/2.5/weather?q=melsheim,fr&appid=e7244f113d429bc8a453d641e588f3aa
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                this.setState({weathers: [data]})
            })
            .catch(console.log)
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

    date(utcTime){
        console.log(utcTime)
        const time = new Date(1594871049)
        console.log(time.toLocaleString());
    }

    render() {
        //const windUrl = "https://tile.openweathermap.org/map/wind_new/6/" + this.state.weathers.map(weather => String(weather.coord.lat)) + "/" + this.state.weathers.map(weather => String(weather.coord.lon)) + ".png?appid=e7244f113d429bc8a453d641e588f3aa"
        {console.log(this.state.weathers)}
        return(
            <div className={this.changeBackground(this.state.weathers.map(weather => weather.weather[0].main))}>
                <div className="card-body">
                    <h2 className="card-title">{this.state.weathers.map(weather => weather.name)}</h2>
                    <div className="row">
                        <div className="col">
                            <div>
                                {this.actualWeatherImg(this.state.weathers.map(weather => weather.weather[0].icon))}
                                <ul>
                                    <li>{this.state.weathers.map(weather => weather.weather[0].description)}</li>
                                    <li>Nébulosité : {this.state.weathers.map(weather => weather.clouds.all)} %</li>
                                    <li>Température : {this.state.weathers.map(weather => weather.main.temp)} C°</li>
                                </ul>


                            </div>
                        </div>
                        <div className="col">
                            <div>
                                <p className="float-left mr-2 mb-0" ><i className="fas fa-wind fa-5x"></i></p>
                                <ul>
                                    {this.windDirection(this.state.weathers.map(weather => weather.wind.deg))}
                                    <li> {this.state.weathers.map(weather => weather.wind.speed)} km/h</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col">
                            <div>
                                <ul>
                                    <li>Ressentit : {this.state.weathers.map(weather => weather.main.feels_like)} C°</li>
                                    <li>Humidité : {this.state.weathers.map(weather => weather.main.humidity)} %</li>
                                    <li>Pression : {this.state.weathers.map(weather => weather.main.pressure)} hPa</li>
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
                                <h5>Températures</h5>
                                <p><i className="fas fa-thermometer-full"></i> Max: {this.state.weathers.map(weather => weather.main.temp_max)}°</p>
                                <p><i className="fas fa-thermometer-quarter"></i> Min: {this.state.weathers.map(weather => weather.main.temp_min)}°</p>
                            </div>
                        </div>
                        <div className="col">
                            <h5>nom à voir</h5>
                            {this.date(this.state.weathers.map(weather => weather.sys.sunrise))}
                            <p>{this.state.weathers.map(weather => weather.sys.sunrise)}</p>
                            <p>{this.state.weathers.map(weather => weather.sys.sunset)}</p>
                        </div>
                    </div>
                </div>

            </div>
        )
    }


}



export default Weather
