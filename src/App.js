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
            // countryList: [
            //     {
            //         'AF': 'Afghanistan',
            //         'ZA': 'Afrique Du Sud',
            //         'AX': 'Åland, Îles',
            //         'AL': 'Albanie',
            //         'DZ': 'Algérie',
            //         'DE': 'Allemagne',
            //         'AD': 'Andorre',
            //         'AO': 'Angola',
            //         'AI': 'Anguilla',
            //         'AQ': 'Antarctique',
            //         'AG': 'Antigua-Et-Barbuda',
            //         'SA': 'Arabie Saoudite',
            //         'AR': 'Argentine',
            //         'AM': 'Arménie',
            //         'AW': 'Aruba',
            //         'AU': 'Australie',
            //         'AT': 'Autriche',
            //         'AZ': 'Azerbaïdjan',
            //         'BS': 'Bahamas',
            //         'BH': 'Bahreïn',
            //         'BD': 'Bangladesh',
            //         'BB': 'Barbade',
            //         'BY': 'Bélarus',
            //         'BE': 'Belgique',
            //         'BZ': 'Belize',
            //         'BJ': 'Bénin',
            //         'BM': 'Bermudes',
            //         'BT': 'Bhoutan',
            //         'BO': 'Bolivie, L\'état Plurinational De',
            //         'BQ': 'Bonaire, Saint-Eustache Et Saba',
            //         'BA': 'Bosnie-Herzégovine',
            //         'BW': 'Botswana',
            //         'BV': 'Bouvet, Île',
            //         'BR': 'Brésil',
            //         'BN': 'Brunei Darussalam',
            //         'BG': 'Bulgarie',
            //         'BF': 'Burkina Faso',
            //         'BI': 'Burundi',
            //         'KY': 'Caïmans, Îles',
            //         'KH': 'Cambodge',
            //         'CM': 'Cameroun',
            //         'CA': 'Canada',
            //         'CV': 'Cap-Vert',
            //         'CF': 'Centrafricaine, République',
            //         'CL': 'Chili',
            //         'CN': 'Chine',
            //         'CX': 'Christmas, Île',
            //         'CY': 'Chypre',
            //         'CC': 'Cocos (Keeling), Îles',
            //         'CO': 'Colombie',
            //         'KM': 'Comores',
            //         'CG': 'Congo',
            //         'CD': 'Congo, La République Démocratique Du',
            //         'CK': 'Cook, Îles',
            //         'KR': 'Corée, République De',
            //         'KP': 'Corée, République Populaire Démocratique De',
            //         'CR': 'Costa Rica',
            //         'CI': 'Côte D\'ivoire',
            //         'HR': 'Croatie',
            //         'CU': 'Cuba',
            //         'CW': 'Curaçao',
            //         'DK': 'Danemark',
            //         'DJ': 'Djibouti',
            //         'DO': 'Dominicaine, République',
            //         'DM': 'Dominique',
            //         'EG': 'Égypte',
            //         'SV': 'El Salvador',
            //         'AE': 'Émirats Arabes Unis',
            //         'EC': 'Équateur',
            //         'ER': 'Érythrée',
            //         'ES': 'Espagne',
            //         'EE': 'Estonie',
            //         'US': 'États-Unis',
            //         'ET': 'Éthiopie',
            //         'FK': 'Falkland, Îles (Malvinas)',
            //         'FO': 'Féroé, Îles',
            //         'FJ': 'Fidji',
            //         'FI': 'Finlande',
            //         'FR': 'France',
            //         'GA': 'Gabon',
            //         'GM': 'Gambie',
            //         'GE': 'Géorgie',
            //         'GS': 'Géorgie Du Sud-Et-Les Îles Sandwich Du Sud',
            //         'GH': 'Ghana',
            //         'GI': 'Gibraltar',
            //         'GR': 'Grèce',
            //         'GD': 'Grenade',
            //         'GL': 'Groenland',
            //         'GP': 'Guadeloupe',
            //         'GU': 'Guam',
            //         'GT': 'Guatemala',
            //         'GG': 'Guernesey',
            //         'GN': 'Guinée',
            //         'GW': 'Guinée-Bissau',
            //         'GQ': 'Guinée Équatoriale',
            //         'GY': 'Guyana',
            //         'GF': 'Guyane Française',
            //         'HT': 'Haïti',
            //         'HM': 'Heard-Et-Îles Macdonald, Île',
            //         'HN': 'Honduras',
            //         'HK': 'Hong Kong',
            //         'HU': 'Hongrie',
            //         'IM': 'Île De Man',
            //         'UM': 'Îles Mineures Éloignées Des États-Unis',
            //         'VG': 'Îles Vierges Britanniques',
            //         'VI': 'Îles Vierges Des États-Unis',
            //         'IN': 'Inde',
            //         'ID': 'Indonésie',
            //         'IR': 'Iran, République Islamique D\'',
            //         'IQ': 'Iraq',
            //         'IE': 'Irlande',
            //         'IS': 'Islande',
            //         'IL': 'Israël',
            //         'IT': 'Italie',
            //         'JM': 'Jamaïque',
            //         'JP': 'Japon',
            //         'JE': 'Jersey',
            //         'JO': 'Jordanie',
            //         'KZ': 'Kazakhstan',
            //         'KE': 'Kenya',
            //         'KG': 'Kirghizistan',
            //         'KI': 'Kiribati',
            //         'KW': 'Koweït',
            //         'LA': 'Lao, République Démocratique Populaire',
            //         'LS': 'Lesotho',
            //         'LV': 'Lettonie',
            //         'LB': 'Liban',
            //         'LR': 'Libéria',
            //         'LY': 'Libye',
            //         'LI': 'Liechtenstein',
            //         'LT': 'Lituanie',
            //         'LU': 'Luxembourg',
            //         'MO': 'Macao',
            //         'MK': 'Macédoine, L\'ex-République Yougoslave De',
            //         'MG': 'Madagascar',
            //         'MY': 'Malaisie',
            //         'MW': 'Malawi',
            //         'MV': 'Maldives',
            //         'ML': 'Mali',
            //         'MT': 'Malte',
            //         'MP': 'Mariannes Du Nord, Îles',
            //         'MA': 'Maroc',
            //         'MH': 'Marshall, Îles',
            //         'MQ': 'Martinique',
            //         'MU': 'Maurice',
            //         'MR': 'Mauritanie',
            //         'YT': 'Mayotte',
            //         'MX': 'Mexique',
            //         'FM': 'Micronésie, États Fédérés De',
            //         'MD': 'Moldova, République De',
            //         'MC': 'Monaco',
            //         'MN': 'Mongolie',
            //         'ME': 'Monténégro',
            //         'MS': 'Montserrat',
            //         'MZ': 'Mozambique',
            //         'MM': 'Myanmar',
            //         'NA': 'Namibie',
            //         'NR': 'Nauru',
            //         'NP': 'Népal',
            //         'NI': 'Nicaragua',
            //         'NE': 'Niger',
            //         'NG': 'Nigéria',
            //         'NU': 'Niué',
            //         'NF': 'Norfolk, Île',
            //         'NO': 'Norvège',
            //         'NC': 'Nouvelle-Calédonie',
            //         'NZ': 'Nouvelle-Zélande',
            //         'IO': 'Océan Indien, Territoire Britannique De L\'',
            //         'OM': 'Oman',
            //         'UG': 'Ouganda',
            //         'UZ': 'Ouzbékistan',
            //         'PK': 'Pakistan',
            //         'PW': 'Palaos',
            //         'PS': 'Palestinien Occupé, Territoire',
            //         'PA': 'Panama',
            //         'PG': 'Papouasie-Nouvelle-Guinée',
            //         'PY': 'Paraguay',
            //         'NL': 'Pays-Bas',
            //         'PE': 'Pérou',
            //         'PH': 'Philippines',
            //         'PN': 'Pitcairn',
            //         'PL': 'Pologne',
            //         'PF': 'Polynésie Française',
            //         'PR': 'Porto Rico',
            //         'PT': 'Portugal',
            //         'QA': 'Qatar',
            //         'RE': 'Réunion',
            //         'RO': 'Roumanie',
            //         'GB': 'Royaume-Uni',
            //         'RU': 'Russie, Fédération De',
            //         'RW': 'Rwanda',
            //         'EH': 'Sahara Occidental',
            //         'BL': 'Saint-Barthélemy',
            //         'SH': 'Sainte-Hélène, Ascension Et Tristan Da Cunha',
            //         'LC': 'Sainte-Lucie',
            //         'KN': 'Saint-Kitts-Et-Nevis',
            //         'SM': 'Saint-Marin',
            //         'MF': 'Saint-Martin(Partie Française)',
            //         'SX': 'Saint-Martin (Partie Néerlandaise)',
            //         'PM': 'Saint-Pierre-Et-Miquelon',
            //         'VA': 'Saint-Siège (État De La Cité Du Vatican)',
            //         'VC': 'Saint-Vincent-Et-Les Grenadines',
            //         'SB': 'Salomon, Îles',
            //         'WS': 'Samoa',
            //         'AS': 'Samoa Américaines',
            //         'ST': 'Sao Tomé-Et-Principe',
            //         'SN': 'Sénégal',
            //         'RS': 'Serbie',
            //         'SC': 'Seychelles',
            //         'SL': 'Sierra Leone',
            //         'SG': 'Singapour',
            //         'SK': 'Slovaquie',
            //         'SI': 'Slovénie',
            //         'SO': 'Somalie',
            //         'SD': 'Soudan',
            //         'SS': 'Soudan Du Sud',
            //         'LK': 'Sri Lanka',
            //         'SE': 'Suède',
            //         'CH': 'Suisse',
            //         'SR': 'Suriname',
            //         'SJ': 'Svalbard Et Île Jan Mayen',
            //         'SZ': 'Swaziland',
            //         'SY': 'Syrienne, République Arabe',
            //         'TJ': 'Tadjikistan',
            //         'TW': 'Taïwan, Province De Chine',
            //         'TZ': 'Tanzanie, République-Unie De',
            //         'TD': 'Tchad',
            //         'CZ': 'Tchèque, République',
            //         'TF': 'Terres Australes Françaises',
            //         'TH': 'Thaïlande',
            //         'TL': 'Timor-Leste',
            //         'TG': 'Togo',
            //         'TK': 'Tokelau',
            //         'TO': 'Tonga',
            //         'TT': 'Trinité-Et-Tobago',
            //         'TN': 'Tunisie',
            //         'TM': 'Turkménistan',
            //         'TC': 'Turks-Et-Caïcos, Îles',
            //         'TR': 'Turquie',
            //         'TV': 'Tuvalu',
            //         'UA': 'Ukraine',
            //         'UY': 'Uruguay',
            //         'VU': 'Vanuatu',
            //         'VE': 'Venezuela, République Bolivarienne Du',
            //         'VN': 'Viet Nam',
            //         'WF': 'Wallis Et Futuna',
            //         'YE': 'Yémen',
            //         'ZM': 'Zambie',
            //         'ZW': 'Zimbabwe',
            //     }
            // ],
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
        axios.get('http://api.openweathermap.org/data/2.5/weather?q=Cuincy,fr&units=metric&appid=38ad5d999b2c5b1341355e4b55ec5400')
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

        axios.get('http://api.openweathermap.org/data/2.5/forecast?q=Cuincy,fr&units=metric&appid=38ad5d999b2c5b1341355e4b55ec5400')
            .then(res => {
                const dataWeek = res.data;
                this.setState({dataDay: dataWeek.list});
                console.log('issou', this.state.dataDay);
                console.log('issou', this.state.dataDay[0].weather[0].id);
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
        alert('issou')
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
                <h2 className="categorie-name">A venir</h2>
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