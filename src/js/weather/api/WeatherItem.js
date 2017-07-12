import axios from 'axios';

export default {
  getTemp: function (location) {
    const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + location + '&APPID=ac56932d2c4724808c282a07b50f6143&units=metric';

    return axios.get(apiUrl).then(
      function(res) {
        if (res.data.cod && res.data.message){
          throw new Error(res.data.message);
        } else {
          return res.data;
        }
      },
      function(res) {
        throw new Error(res.data.message);
      }
    );
  }
}
