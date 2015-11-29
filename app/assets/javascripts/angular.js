var app = angular.module('WeatherApp', ['ngRoute']);


app.controller('HeaderController', ['$http', function($http){
  var controller = this;
  $http.get('/session').success(function(data){
    controller.current_user = data.current_user;
  });
}]);

//custom filters to convert from kelvin
app.filter('KtoF', function(){
  return function(kelvin){
    return parseFloat((kelvin) - 273.15) * 9/5 + 32;
  };
});


app.controller('WeatherCtrl', ['$http',
function ($http){

    this.getCurrent = function() {
      var ctrl = this;
      $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + this.location + '&APPID=eaf6fe412d32917ff999cc01f8b23979')
      .success(
        function(data) {
          console.log(data);
          console.log(data.main.temp);
          ctrl.temp = data.main.temp;
          ctrl.pressure = data.main.pressure;
          ctrl.humidity = data.main.humidity;
          ctrl.description = data.weather[0].description;
          ctrl.icon = data.weather[0].icon;
          ctrl.img = 'http://openweathermap.org/img/w/'+ ctrl.icon +'.png'

          console.log(ctrl.description);
          console.log(ctrl.icon);
        }
      );
    };

     this.getWeather = function () {


     var ctrl = this;

 // eaf6fe412d32917ff999cc01f8b23979

     $http.get('//api.openweathermap.org/data/2.5/forecast?q='+this.location+'&APPID=eaf6fe412d32917ff999cc01f8b23979')
     .success(

       function(data) {
         console.log(data);
         console.log("-----------------");
         console.log(data.list);
         console.log(data.city.name);
         ctrl.list = data.list;
         ctrl.name = data.city.name;


         var pressures = [];
         var weather = [];
         for(var i = 0; i < data.list.length-24; i++){
           var presh = data.list[i].main.pressure;
          //  console.log(presh);
            pressures.push(presh);
            // console.log(pressures);
         }
         var max = Math.max.apply(Math, pressures);
         var min = Math.min.apply(Math, pressures);
         console.log(max);
         console.log(min);
         ctrl.diff = max - min;
         console.log(ctrl.diff);
        });

    };
  }]);


        //  var kelvin = data.weather.list.temp;
        //  var far = Math.floor((1.8 * (kelvin - 273) +32));
        //  data.main.temp = far;






 // $scope.vehicleList = [];
 //
 // $scope.addVehicle = function(index, vehicle) {
 //  $scope.vehicleList[index].category.push({
 //    name: vehicle
 //  });
 // };




// app.controller('WeatherController', ['$http', function($http){
//   var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
//
//   var controller = this;
//
//   var getDetails = function(){
//     $http.get('/weathers').success(function(data){
//       controller.current_user_weathers = data.weather;
//     });
//   };
//   getDetails();
//   this.createDetails = function(){
//     controller.current_user_weathers.push({
//       zipcode: this.zipcode
//     });
//
//     $http.post('/weathers', {
//       authenticity_token: authenticity_token,
//       weather: {
//         zipcode: this.zipcode
//       }
//     }).success(function(detailData){
//       var weather = detailData.weather;
//     });
//     createDetails();
//   };
// }]);
//
// app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
//   $locationProvider.html5Mode({enabled:true});
//
//     $routeProvider.
//       when('/weathers',
//       { templateUrl:
//         '/angular_templates/weathers.html.erb',
//         controller: 'WeatherController',
//         controllerAs: 'details'
//       }).
//
//       otherwise(
//         {redirectTo: '/'}
//       );
// }]);
