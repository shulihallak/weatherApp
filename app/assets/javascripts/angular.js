var app = angular.module('WeatherApp', []);


app.controller('WeatherCtrl', ['$http',
  function($http){
    var ctrl = this;

    this.getLatLong = function (){
      // nJrzCLjwHw0v5EFko5yVfiqxPcZrPuZddrNQc7nTDooJ233q9CmpUMWJZVaOqa2E
      $http.get('https://www.zipcodeapi.com/rest/nJrzCLjwHw0v5EFko5yVfiqxPcZrPuZddrNQc7nTDooJ233q9CmpUMWJZVaOqa2E/info.json/'+ this.zip + '/degrees')
      .success(
        function(data){
          console.log(data);
          console.log(data.city);
          ctrl.lat = data.lat;
          ctrl.lng = data.lng;
          ctrl.city = data.city;
          ctrl.state = data.state;

          ctrl.getWeather();
        })
      .error(
        function(error){
          console.log(error);
        }
      )
    };

  this.getWeather = function(){
    // https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE
    // a90290a0d300fca731a149f574eb74e0
    var api = 'a90290a0d300fca731a149f574eb74e0';
    $http.get('https://api.forecast.io/forecast/'+ api + '/'+ ctrl.lat + ','+ ctrl.lng + ' ')
    .success(
      function(data){
        console.log(data);
        ctrl.summary = data.hourly.summary;
        ctrl.temp = data.currently.apparentTemperature;
        ctrl.humidity = data.currently.humidity;
        ctrl.pressure = data.currently.pressure;
        ctrl.icon = data.currently.icon;
        ctrl.img = '';
        ctrl.daily = data.daily;
        ctrl.hourly = data.hourly;

        var barometer = [];
        for (var i = 0; i < data.hourly.data.length; i++){
          var bars = data.hourly.data[i].pressure;
          barometer.push(bars);
        }
        console.log(data.hourly);
        console.log(data.hourly.data);
        console.log(bars);
        console.log(barometer);

        var max = Math.max.apply(Math, barometer);
        var min = Math.min.apply(Math, barometer);
        console.log(max);
        console.log(min);
        ctrl.diff = max - min;
        console.log(ctrl.diff);
      }
    ).error(
      function(error){
        console.log(error);
      }
    )
  }

  }]);
