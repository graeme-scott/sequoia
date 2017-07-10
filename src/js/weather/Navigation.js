import React from 'react';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: undefined,
    };

    this._openHero = this._openHero.bind(this);
  }

  _openHero() {
    document.querySelector('.hero').classList.toggle('close-hero');
  }

  render() {
    const temp = Math.round(this.props.temp);

    return (
      <nav className="main-navigation">
        <a href="#" className="logo">
          <i className="fa fa-tree"></i>
        </a>

        <a href="#" className="weather-icon" onClick={(e) => this._openHero()}>
          <i className={this.props.weatherIcon}></i>

          {temp}
          <span>&deg;C</span>
        </a>
      </nav>
    );
  }
}

export default Navigation;
