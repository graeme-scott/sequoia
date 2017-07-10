import React from 'react';
import WeatherItem from './api/WeatherItem';
import LocationSearch from './LocationSearch';
import Navigation from './Navigation';

class WeatherApp extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      errorMessage: undefined,
      location: undefined,
      temp: undefined
    };

    this._handleSearch = this._handleSearch.bind(this);
    this._changeGradient = this._changeGradient.bind(this);
  }

  componentDidMount() {
    this._handleSearch('Victoria');
  }

  _handleSearch(location) {
    this.setState({
      isLoading: true,
      errorMessage: undefined
    });

    this._rotateRefresh();

    WeatherItem.getTemp(location).then(
      (temp) => {
        this.setState({
          location: location,
          temp: temp.main.temp,
          iconClass: 'weather-icon wi-owm-' + temp.weather[0].id,
          isLoading: false
        });

        this._changeGradient(temp.main.temp);
      },
      (e) => {
        this.setState({
          isLoading: false,
          errorMessage: e.message
        });
      }
    );
  }

  _rotateRefresh() {
    const refreshArrow = document.querySelector('.hero-refresh span');
    refreshArrow.classList.add('rotate');

    setTimeout(function() {
      refreshArrow.classList.remove('rotate');
    }, 300);
  }

  _changeGradient(temp) {
    let gradient = '';

    if (temp >= 30) {
      gradient = 'thirty';
    } else if (temp >= 20) {
      gradient = 'twenty';
    } else if (temp >= 15) {
      gradient = 'fifteen';
    } else if (temp >= 10) {
      gradient = 'ten';
    } else if (temp >= 5) {
      gradient = 'five';
    } else {
      gradient = 'zero';
    }

    this.setState({
      heroClass: 'hero ' + gradient + 'Degrees'
    });
  }

  render() {
    let lastUpdated = new Date();
    lastUpdated = "Last Updated: " + lastUpdated.getDate() + "/"
                    + (lastUpdated.getMonth()+1)  + "/"
                    + lastUpdated.getFullYear() + " @ "
                    + ((lastUpdated.getHours() + 24) % 12 || 12) + ":"
                    + ((lastUpdated.getMinutes() < 10) ? '0' : '')
                    + lastUpdated.getMinutes()
                    + ((lastUpdated.getHours() > 12) ? 'PM' : 'AM');

    return (
      <div>
        <Navigation weatherIcon={this.state.iconClass} temp={this.state.temp} />

        <div className={this.state.heroClass}>
          <div className="hero-content">
            <h2 className="location-heading">{this.state.location}</h2>
            <LocationSearch _handleSearch={this._handleSearch} />

            <div className="weather-container">
              <p className={this.state.iconClass}></p>

              <h2 className="hero-heading">
                {this.state.temp}
                <span>&deg;C</span>
              </h2>

              <button className="hero-refresh" onClick={() => this._handleSearch(this.state.location)}>
                {lastUpdated}
                <span>&#8634;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherApp;
