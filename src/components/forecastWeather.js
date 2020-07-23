import React, {Component} from 'react'

class forecastWeather extends Component {

    constructor(props) {
        super(props)
        this.state = {
            weathers: [],

        }
    }

    componentDidMount() {
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + this.props.lat + '&lon=' + this.props.lon + '&%20exclude=current,minutely,hourly&lang=fr-fr&units=metric&appid=' + process.env.REACT_APP_WEATHER_API + '')
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                this.setState({weathers: [data]})
            })
            .catch()
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

    generateHourPerHour(){
        return this.state.weathers.map(weather =>{
            return weather.hourly.map((hour, i) =>{
                if(i < 10){
                    return(
                        <div className="col-sm text-center" key={i}>
                            <h5 className="">{this.getTime(hour.dt)}</h5>
                            {this.weatherImg(hour.weather[0].icon)}
                            <p>{hour.temp} C°</p>
                        </div>
                    )
                }

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
        let min = date.getMinutes()
        if(min < 10){
            min = '0' + min
        }else{
            min = min + ''
        }
        let time = date.getHours() + ':' + min
        return time
    }

    weatherImg(status) {
        switch (status.toString()) {
            case '01d':
                return <img className="" src="https://openweathermap.org/img/wn/01d@2x.png" alt="clear sky" width="80"/>;
            case '02d':
                return <img className="" src="https://openweathermap.org/img/wn/02d@2x.png" alt="few clouds" width="80"/>;
            case '03d':
                return <img className="" src="https://openweathermap.org/img/wn/03d@2x.png" alt="scattered clouds" width="80"/>;
            case '04d':
                return <img className="" src="https://openweathermap.org/img/wn/04d@2x.png" alt="broken clouds" width="80"/>;
            case '09d':
                return <img className="" src="https://openweathermap.org/img/wn/09d@2x.png" alt="shower rain" width="80"/>;
            case '10d':
                return <img className="" src="https://openweathermap.org/img/wn/10d@2x.png" alt="rain" width="80"/>;
            case '11d':
                return <img className="" src="https://openweathermap.org/img/wn/11d@2x.png" alt="thunderstorm" width="80"/>;
            case '13d':
                return <img className="" src="https://openweathermap.org/img/wn/13d@2x.png" alt="snow" width="80"/>;
            case '50d':
                return <img className="" src="https://openweathermap.org/img/wn/50d@2x.png" alt="mist" width="80"/>;
            default:
                return <img className="" src="https://openweathermap.org/img/wn/01d@2x.png" alt="clear sky" width="80"/>;
        }
    }
    render(){
        const daily = this.generatePrevision()
        const hourly = this.generateHourPerHour()
        return (
            <div>
                <h2 className="card-title font-weight-bold">Prévisions</h2>
                <h3 className="card-title">Heures</h3>
                <div className="row">
                    {hourly}
                </div>
                <h3 className="card-title">Jours</h3>
                <div className="row">
                    {daily}
                </div>
            </div>


        )
    }
}

export default forecastWeather
