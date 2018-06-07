import React, {Component} from 'react';
import App from '../App.js';

export default class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => {
                this.tick()
            },
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                <p className="currentTime">{this.state.date.toLocaleTimeString().match(/\d{2}:\d{2}|[AMP]+/g).join(' ')}</p>
            </div>
        );
    }
}

