import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.css';
import registerServiceWorker from './js/registerServiceWorker';
import WeatherApp from './js/weather/WeatherApp';
import TaskManagerApp from './js/taskManager/TaskManagerApp';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(WeatherApp),
    document.getElementById('heroContainer')
  );
});

registerServiceWorker();
