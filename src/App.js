import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import {VictoryTheme, VictoryChart, VictoryLine, VictoryLabel, VictoryAxis} from 'victory';
import Clock from "./Clock";

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
                            {/*::before soleil*/}
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
                    >
                        <VictoryLine
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
                        <img src="images/sun.svg"/>
                        <img src="images/cloud_sun.svg"/>
                        <img src="images/cloud_sun.svg"/>
                        <img src="images/sun.svg"/>
                        <img src="images/sun.svg"/>
                        <img src="images/sun.svg"/>
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
                                data: {stroke: "#5738e8"},
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
                        <img src="images/sun.svg"/>
                        <img src="images/sun.svg"/>
                        <img src="images/cloud_sun.svg"/>
                        <img src="images/storm.svg"/>
                        <img src="images/cloud.svg"/>
                        <img src="images/sun.svg"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;