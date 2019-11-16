<<<<<<< HEAD
miModulo.config(['$httpProvider', function ($httpProvider) {
=======
miModulo.config(['$httpProvider', function($httpProvider) {
>>>>>>> e27fa1b6571085e149911219f3e6ad59d85d9b0a
  $httpProvider.defaults.withCredentials = true;
}])

/*
html5Mode

miModulo.config(['$locationProvider', function ($locationProvider) {
  $locationProvider.html5Mode({
      //requireBase: false,
      enabled: true
  });
}]);
/*
datelocale
*/
miModulo.config(function ($mdDateLocaleProvider) {
  // Example of a Spanish localization.
  $mdDateLocaleProvider.months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
<<<<<<< HEAD
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  $mdDateLocaleProvider.shortMonths = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
=======
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  $mdDateLocaleProvider.shortMonths = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
>>>>>>> e27fa1b6571085e149911219f3e6ad59d85d9b0a
  $mdDateLocaleProvider.days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
  $mdDateLocaleProvider.shortDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
  // Can change week display to start on Monday.
  $mdDateLocaleProvider.firstDayOfWeek = 1;
  // Optional.
  //$mdDateLocaleProvider.dates = [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,
  //                               20,21,22,23,24,25,26,27,28,29,30,31];
  // In addition to date display, date components also need localized messages
  // for aria-labels for screen-reader users.
  $mdDateLocaleProvider.weekNumberFormatter = function (weekNumber) {
<<<<<<< HEAD
    return 'Semana ' + weekNumber;
=======
      return 'Semana ' + weekNumber;
>>>>>>> e27fa1b6571085e149911219f3e6ad59d85d9b0a
  };
  $mdDateLocaleProvider.msgCalendar = 'Calendario';
  $mdDateLocaleProvider.msgOpenCalendar = 'Abrir calendario';
  $mdDateLocaleProvider.formatDate = function (date) {
<<<<<<< HEAD
    return moment(date).format('DD-MM-YYYY');
=======
      return moment(date).format('DD-MM-YYYY');
>>>>>>> e27fa1b6571085e149911219f3e6ad59d85d9b0a
  };

})