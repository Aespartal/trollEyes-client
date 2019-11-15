var miControlador = miModulo.controller(
    "postViewController",

    function ($scope, $routeParams, promesasService,auth) {
      
                    if (auth.data.status != 200) {
                        $location.path('/login');
                    } else {
                        $scope.authStatus = auth.data.status;
                        $scope.authUsername = auth.data.message;
                    }
        
        promesasService.ajaxGet('usuario', $routeParams.id)
            .then(function (response) {
                $scope.id = response.data.message.id;
                $scope.dni = response.data.message.dni;
                $scope.nombre = response.data.message.nombre;
                $scope.apellido1 = response.data.message.apellido1;
                $scope.apellido2 = response.data.message.apellido2;
                $scope.email = response.data.message.email;
                $scope.login = response.data.message.login;
            }, function () {
                $scope.fallo = true;
            })
    }
)