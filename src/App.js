import React, {Component} from 'react';
import './App.css';
// import ReactDOM from 'react-dom';
import {VictoryChart, VictoryLine, VictoryLabel, VictoryAxis} from 'victory';
import Clock from "./components/Clock";

import axios from 'axios';

class App extends Component {
    constructor() {
        super();
        let CurrentMinutes = new Date(),
            minutes = (CurrentMinutes.getMinutes() < 10 ? '0' : '') + CurrentMinutes.getMinutes();
        let CurrentHour = new Date(),
            hour = (CurrentHour.getHours() < 10 ? '0' : '') + CurrentHour.getHours();
        let CurrentDay = new Date(),
            day = CurrentDay.getDay();
        let CurrentMonth = new Date(),
            month = CurrentMonth.getMonth();
        let NumberDay = new Date(),
            number = NumberDay.getDate();

        this.state = {
            countryCode: '',
            keyAPI: "38ad5d999b2c5b1341355e4b55ec5400",
            urlAPI: "",
            minutes: minutes,
            hour: hour,
            day: day,
            month: month,
            number: number,
            dataCurrent: [],
            dataWeek: [],
            currentTemp: '',
            currentSky: '',
            currentDesc: '',
            currentHum: '',
            dataDay: [],
            dataMaxWeek: [
                {time: "Jeu.", temp: 23},
                {time: "Ven.", temp: 26},
                {time: "Sam.", temp: 27},
                {time: "Dim.", temp: 30},
                {time: "Lun.", temp: 29},
            ],
            dataMinWeek: [
                {time: "Jeu.", temp: 15},
                {time: "Ven.", temp: 16},
                {time: "Sam.", temp: 15},
                {time: "Dim.", temp: 17},
                {time: "Lun.", temp: 18},
            ],
        };

    }

    componentDidMount() {
        axios.get('http://api.openweathermap.org/data/2.5/weather?q=Lille,fr&units=metric&appid=38ad5d999b2c5b1341355e4b55ec5400')
            .then(res => {
                const dataCurrent = res.data;
                this.setState({dataCurrent: dataCurrent});
                this.setState({currentTemp: Math.round(dataCurrent.main.temp)});
                this.setState({currentDesc: dataCurrent.weather[0].main});
                this.setState({currentHum: dataCurrent.main.humidity});
                this.setState({currentSky: dataCurrent.weather[0].id});
                this.setState({countryCode: dataCurrent.sys.country});

                // console.log(this.state.countryList[0]);
            })

        //    http://api.openweathermap.org/data/2.5/forecast?q=Paris,fr&units=metric&appid=38ad5d999b2c5b1341355e4b55ec5400

        axios.get('http://api.openweathermap.org/data/2.5/forecast?q=Lille,fr&units=metric&appid=38ad5d999b2c5b1341355e4b55ec5400')
            .then(res => {
                const dataWeek = res.data;
                this.setState({dataDay: dataWeek.list});
                // console.log('issou', this.state.dataDay);
                // console.log('issou', this.state.dataDay[0].weather[0].id);
                this.setState({
                    dataDay: [
                        {
                            time: this.state.dataDay[0].dt_txt.slice(11, 16),
                            temp: Math.round(this.state.dataDay[0].main.temp)
                        },
                        {
                            time: this.state.dataDay[1].dt_txt.slice(11, 16),
                            temp: Math.round(this.state.dataDay[1].main.temp)
                        },
                        {
                            time: this.state.dataDay[2].dt_txt.slice(11, 16),
                            temp: Math.round(this.state.dataDay[2].main.temp)
                        },
                        {
                            time: this.state.dataDay[3].dt_txt.slice(11, 16),
                            temp: Math.round(this.state.dataDay[3].main.temp)
                        },
                        {
                            time: this.state.dataDay[4].dt_txt.slice(11, 16),
                            temp: Math.round(this.state.dataDay[4].main.temp)
                        },
                    ],
                });

            })
    }

    renderSky() {
        if (this.state.hour >= 8 && this.state.hour < 19) {
            return "day";
        } else if (this.state.hour >= 19 && this.state.hour < 21) {
            return "sunset";
        } else if (this.state.hour >= 21 || this.state.hour < 6) {
            return "night";
        } else {
            return "sunrise";
        }
    }

    static skyIcon(id) {
        if (id >= 200 && id <= 232) {
            return "storm";
        } else if (id >= 300 && id <= 321) {
            return "drizzle";
        } else if (id >= 500 && id <= 531) {
            return "rain";
        } else if (id >= 600 && id <= 622) {
            return "snow";
        } else if (id === 800) {
            return "sun";
        } else if (id === 801 || id === 802) {
            return "cloud_sun";
        } else if (id === 803 || id === 804 || (id >= 701 && id <= 781)) {
            return "cloud";
        } else {
            return "undefined";
        }
    }

    static changeCity() {
        alert('Fonctionnalité pas encore disponible...')
    }

    render() {
        const monthNames = ["Janv.", "Févr.", "Mars", "Avr.", "Mai", "Juin", "Juill.", "Août", "Sept.", "Oct.", "Nov.", "Déc."];
        const dayNames = ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."];
        let day = this.state.day;
        let month = this.state.month;
        let number = this.state.number;


        return <div className="App">
            <div className={"currentContainer " + this.renderSky()}>
                <p className="location" onClick={App.changeCity}><span
                    className="cityName">{this.state.dataCurrent.name}</span>, {this.state.countryCode}
                </p>
                <div className="currentWeather">
                    <div className="blockDate">
                        <Clock/>
                        <p className="currentDay">{dayNames[day]} {number} {monthNames[month]}</p>
                    </div>
                    <div className="blockWeather">
                        <div className={"currentIcon"}
                             style={{backgroundImage: "url('images/" + App.skyIcon(this.state.currentSky) + ".svg')"}}/>
                        <p className="currentTemperature">{this.state.currentTemp}°c</p>
                        <div className="currentInfos">
                            <p className="currentSky">{this.state.currentDesc}</p>
                            {/*::before goute*/}
                            <p className="currentRain">{this.state.currentHum}%</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dayWeather">
                <h2 className="categorie-name">Aujourd'hui</h2>
                <hr/>
                <VictoryChart
                    domainPadding={{y: 100}}
                    padding={{top: 0, bottom: 160, left: 50, right: 50}}
                    events={[]}
                >
                    <VictoryLine
                        events={[]}
                        style={{
                            data: {stroke: "#5738e8"},
                            axis: {stroke: "none"}
                        }}
                        data={this.state.dataDay}
                        // data accessor for x values
                        x="time"
                        // data accessor for y values
                        y="temp"
                        labels={(datum) => datum.y + '°'}
                        labelComponent={<VictoryLabel renderInPortal dy={-20}/>}
                    />
                    <VictoryAxis style={{axis: {stroke: "none"}}}/>
                </VictoryChart>
                <div className="skyDay">
                    <img src={"images/" + App.skyIcon(800) + ".svg"} alt="icone meteo"/>
                    <img src={"images/" + App.skyIcon(800) + ".svg"} alt="icone meteo"/>
                    <img src={"images/" + App.skyIcon(800) + ".svg"} alt="icone meteo"/>
                    <img src={"images/" + App.skyIcon(800) + ".svg"} alt="icone meteo"/>
                    <img src={"images/" + App.skyIcon(800) + ".svg"} alt="icone meteo"/>
                </div>
            </div>
            <div className="weekWeather">
                <h2 className="categorie-name">Cette semaine</h2>
                <hr/>
                <VictoryChart
                    domainPadding={{y: 100}}
                    padding={{top: 0, bottom: 160, left: 50, right: 50}}
                >
                    <VictoryLine
                        style={{
                            data: {stroke: "#e82e57"},
                            axis: {stroke: "none"}
                        }}
                        data={this.state.dataMaxWeek}
                        // data accessor for x values
                        x="time"
                        // data accessor for y values
                        y="temp"
                        labels={(datum) => datum.y + '°'}
                        labelComponent={<VictoryLabel renderInPortal dy={-20}/>}
                    />
                    <VictoryLine
                        style={{
                            data: {stroke: "#2871fa"},
                            axis: {stroke: "none"}
                        }}
                        data={this.state.dataMinWeek}
                        // data accessor for x values
                        x="time"
                        // data accessor for y values
                        y="temp"
                        labels={(datum) => datum.y + '°'}
                        labelComponent={<VictoryLabel renderInPortal dy={+40}/>}
                    />
                    <VictoryAxis style={{axis: {stroke: "none"}}}/>
                </VictoryChart>
                <div className="skyWeek">
                    <img src={"images/" + App.skyIcon(800) + ".svg"} alt="icone meteo"/>
                    <img src={"images/" + App.skyIcon(802) + ".svg"} alt="icone meteo"/>
                    <img src={"images/" + App.skyIcon(802) + ".svg"} alt="icone meteo"/>
                    <img src={"images/" + App.skyIcon(803) + ".svg"} alt="icone meteo"/>
                    <img src={"images/" + App.skyIcon(200) + ".svg"} alt="icone meteo"/>
                </div>
            </div>
        </div>;
    }
}

export default App;