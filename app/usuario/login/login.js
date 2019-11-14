var miControlador = miModulo.controller(
    "usuarioLoginController",
    ['$scope','$location', 'promesasService', function ($scope, $location, promesasService) {
        $scope.controller = "usuarioLoginController";
        $scope.usuario ="";

        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";


        promesasService.ajaxCheck()
        .then(function (response) {
            if(response.data.status=="200"){
                $scope.session= true;
                $scope.usuario=response.data.message;
            } else {
                $scope.session= false;
            }
        }, function (response) {
            $scope.session= false;
        })

        $scope.login = function () {
            usuario = $scope.user.username;
            password = $scope.user.password;
            if (usuario != "" && password != "") {
                promesasService.ajaxLogin(usuario, password)
                    .then(function (response) {
                        if (response.data.status != 200) {
                            $scope.fallo = true;
                            $scope.falloMensaje = response.data.message;
                        } else {
                            $scope.session = true;
                            $scope.fallo = false;
                            $location.path("/home/10/1");
                        }
                        $scope.hecho = true;
                    }, function (error) {
                        $scope.session = false;
                        $scope.hecho = true;
                        $scope.fallo = true;
                        $scope.falloMensaje = error.message + " " + error.stack;
                    
                    });
            }
        }


    }]
)
