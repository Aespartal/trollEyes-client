miModulo.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
}]);

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
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  $mdDateLocaleProvider.shortMonths = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  $mdDateLocaleProvider.days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
  $mdDateLocaleProvider.shortDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
  // Can change week display to start on Monday.
  $mdDateLocaleProvider.firstDayOfWeek = 1;
  $mdDateLocaleProvider.weekNumberFormatter = function (weekNumber) {
    return 'Semana ' + weekNumber;
  };
  $mdDateLocaleProvider.msgCalendar = 'Calendario';
  $mdDateLocaleProvider.msgOpenCalendar = 'Abrir calendario';
  $mdDateLocaleProvider.formatDate = function (date) {
    return moment(date).format('DD-MM-YYYY');
  };
});

miModulo.config(function ($authProvider){
  $authProvider.httpInterceptor = false;
  $authProvider.google({
    clientId: '797685668265-d6m9g3nr3f0l996p0sjmeo4riaicitks.apps.googleusercontent.com',
    url: 'http://localhost:8081/trolleyes/json',
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
    redirectUri: window.location.origin,
    requiredUrlParams: ['scope'],
    optionalUrlParams: ['display'],
    scope: ['profile', 'email'],
    scopePrefix: 'openid',
    scopeDelimiter: ' ',
    display: 'popup',
    oauthType: '2.0',
    popupOptions: { width: 452, height: 633 }
  });
});