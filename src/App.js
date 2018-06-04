import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    
    constructor() {
        super();
        let CurrentDay = new Date(),
            day = CurrentDay.getDay();
        let CurrentMonth = new Date(),
            month = CurrentMonth.getMonth();
        let NumberDay = new Date(),
            number = NumberDay.getDate()
        this.state = {
            day: day,
            month: month,
            number: number,
        };

    }  
    render() {
        const monthNames = ["jan.", "fev.", "mar.", "avr.", "mai.","juin.","juil.", "aout.", "sep.", "oct.", "nov.","dec."];
        const dayNames = ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."];
        let day=this.state.day;
        let month=this.state.month;
        let number= this.state.number;
        return (
            
            <div className="App">
                <div className="currentContainer">
                    <p className="city"><span className="cityName">Paris</span>, France</p>
                    <div className="currentWeather">
                        <div className="blockDate">
                            <p className="currentTime">10:00</p>
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
                <div className="dayWeather"></div>
                <div className="weekWeather"></div>
            </div>
        );
    }
}

export default App;
