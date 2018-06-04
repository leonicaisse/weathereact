import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="currentContainer">
                    <p className="city"><span className="cityName">Paris</span>, France</p>
                    <div className="currentWeather">
                        <div className="blockDate">
                            <p className="currentTime">10:00</p>
                            <p className="currentDay">lun. 4 juin</p>
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
