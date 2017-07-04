import React from 'react';
import ReactDOM from 'react-dom';
import WeatherApp from './weather/WeatherApp';
import TodoApp from './todo/TodoApp';
 
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(WeatherApp),
    document.getElementById('heroContainer')
  );
});