import React from 'react';
import ReactDOM from 'react-dom';
import WeatherApp from './weather/WeatherApp';
import TaskManagerApp from './taskManager/TaskManagerApp';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(WeatherApp),
    document.getElementById('heroContainer')
  );
});
