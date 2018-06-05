import React, {Component} from 'react';
import './App.css';
// import ReactDOM from 'react-dom';
import {VictoryChart, VictoryLine, VictoryLabel, VictoryAxis} from 'victory';
import Clock from "./components/Clock";

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
            minutes: minutes,
            hour: hour,
            day: day,
            month: month,
            number: number,
            dataDay: [
                {time: '02:00', temp: 13},
                {time: '06:00', temp: 15},
                {time: '10:00', temp: 21},
                {time: '14:00', temp: 25},
                {time: '18:00', temp: 24},
                {time: '22:00', temp: 19}
            ],
            skyDay: [
                {time: '02:00', temp: 13},
                {time: '06:00', temp: 15},
                {time: '10:00', temp: 21},
                {time: '14:00', temp: 25},
                {time: '18:00', temp: 24},
                {time: '22:00', temp: 19}
            ],
            dataMaxWeek: [
                {time: 'Lun.', temp: 23},
                {time: 'Mar.', temp: 24},
                {time: 'Mer.', temp: 22},
                {time: 'Jeu.', temp: 23},
                {time: 'Ven.', temp: 26},
                {time: 'Sam.', temp: 25}
            ],
            dataMinWeek: [
                {time: 'Lun.', temp: 15},
                {time: 'Mar.', temp: 15},
                {time: 'Mer.', temp: 13},
                {time: 'Jeu.', temp: 14},
                {time: 'Ven.', temp: 16},
                {time: 'Sam.', temp: 15}
            ],
            skyWeek: [
                {time: 'Lun.', temp: 23},
                {time: 'Mar.', temp: 24},
                {time: 'Mer.', temp: 22},
                {time: 'Jeu.', temp: 23},
                {time: 'Ven.', temp: 26},
                {time: 'Sam.', temp: 25}
            ],
        };

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

    skyIcon(id) {
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
        } else if (id === 803 || id === 804) {
            return "cloud";
        } else {
            return "undefined";
        }
    }

    render() {
        const monthNames = ["Janv.", "Févr.", "Mars", "Avr.", "Mai", "Juin", "Juill.", "Août", "Sept.", "Oct.", "Nov.", "Déc."];
        const dayNames = ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."];
        let day = this.state.day;
        let month = this.state.month;
        let number = this.state.number;

        return (

            <div className="App">
                <div className={"currentContainer " + this.renderSky()}>
                    <p className="city"><span className="cityName">Paris</span>, France</p>
                    <div className="currentWeather">
                        <div className="blockDate">
                            <Clock/>
                            <p className="currentDay">{dayNames[day]} {number} {monthNames[month]}</p>
                        </div>
                        <div className="blockWeather">
                            <div className="currentIcon"
                                 style={{backgroundImage: "url('images/" + this.skyIcon(802) + ".svg')"}}></div>
                            <p className="currentTemperature">19°c</p>
                            <div className="currentInfos">
                                <p className="currentSky">Ensoleillé</p>
                                {/*::before goute*/}
                                <p className="currentRain">5%</p>
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
                        <img src={"images/" + this.skyIcon(802) + ".svg"} alt="icone meteo"/>
                        <img src={"images/" + this.skyIcon(800) + ".svg"} alt="icone meteo"/>
                        <img src={"images/" + this.skyIcon(800) + ".svg"} alt="icone meteo"/>
                        <img src={"images/" + this.skyIcon(800) + ".svg"} alt="icone meteo"/>
                        <img src={"images/" + this.skyIcon(802) + ".svg"} alt="icone meteo"/>
                        <img src={"images/" + this.skyIcon(804) + ".svg"} alt="icone meteo"/>
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
                        <img src={"images/" + this.skyIcon(800) + ".svg"} alt="icone meteo"/>
                        <img src={"images/" + this.skyIcon(802) + ".svg"} alt="icone meteo"/>
                        <img src={"images/" + this.skyIcon(802) + ".svg"} alt="icone meteo"/>
                        <img src={"images/" + this.skyIcon(803) + ".svg"} alt="icone meteo"/>
                        <img src={"images/" + this.skyIcon(200) + ".svg"} alt="icone meteo"/>
                        <img src={"images/" + this.skyIcon(800) + ".svg"} alt="icone meteo"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;