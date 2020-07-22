import React, {Component} from 'react'

class forecastWeather extends Component {

    constructor(props) {
        super(props)
        this.state = {
            weathers: [],

        }
    }

    componentDidMount() {
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + this.props.lat + '&lon=' + this.props.lon + '&%20exclude=current,minutely,hourly&lang=fr-fr&units=metric&appid=' + process.env.REACT_APP_WEATHER_API + '')//https://api.openweathermap.org/data/2.5/onecall?lat=48.76&lon=7.52&%20exclude=current,minutely,hourly&appid=e7244f113d429bc8a453d641e588f3aa
            .then(res => res.json())
            .then((data) => {
                this.setState({weathers: [data]})
            })
            .catch(console.log)
    }

    generatePrevision(){
       return this.state.weathers.map(weather => {
           return weather.daily.map((day, i) =>{
               return(
                    <div className="col text-center" key={i}>
                        <h5>{this.getDate(day.dt)}</h5>
                        <p>{this.weatherImg(day.weather[0].icon)}</p>
                        <p><i className="fas fa-thermometer-quarter"></i> {day.temp.min} C°</p>
                        <p><i className="fas fa-thermometer-full"></i> {day.temp.max} C°</p>
                        <p>{this.getTime(day.sunrise)}</p>
                        <p>{this.getTime(day.sunset)}</p>
                    </div>
               )
           })
       })
    }

    getDate(datetime){
        let date = new Date(datetime * 1000);
        const day = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
        return day[date.getUTCDay()];
    }

    getTime(datetime){
        let date = new Date(datetime * 1000);
        let time = date.getHours() + ':' + date.getMinutes()
        return time
    }

    weatherImg(status) {
        switch (status.toString()) {
            case '01d':
                return <img className="" src="http://openweathermap.org/img/wn/01d@2x.png" alt="clear sky"/>;
            case '02d':
                return <img className="" src="http://openweathermap.org/img/wn/02d@2x.png" alt="few clouds"/>;
            case '03d':
                return <img className="" src="http://openweathermap.org/img/wn/03d@2x.png" alt="scattered clouds"/>;
            case '04d':
                return <img className="" src="http://openweathermap.org/img/wn/04d@2x.png" alt="broken clouds"/>;
            case '09d':
                return <img className="" src="http://openweathermap.org/img/wn/09d@2x.png" alt="shower rain"/>;
            case '10d':
                return <img className="" src="http://openweathermap.org/img/wn/10d@2x.png" alt="rain"/>;
            case '11d':
                return <img className="" src="http://openweathermap.org/img/wn/11d@2x.png" alt="thunderstorm"/>;
            case '13d':
                return <img className="" src="http://openweathermap.org/img/wn/13d@2x.png" alt="snow"/>;
            case '50d':
                return <img className="" src="http://openweathermap.org/img/wn/50d@2x.png" alt="mist"/>;
            default:
                return <img className="" src="http://openweathermap.org/img/wn/01d@2x.png" alt="clear sky"/>;
        }
    }
    render(){
        const daily = this.generatePrevision()
        return (
            <div className="row">
                {daily}
            </div>

        )
    }
}

export default forecastWeather
