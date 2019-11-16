var miControlador = miModulo.controller(
    "usuarioRemoveController",

    function ($scope, $routeParams, $location, promesasService,auth) {
<<<<<<< HEAD
=======


>>>>>>> e27fa1b6571085e149911219f3e6ad59d85d9b0a
        if (auth.data.status != 200) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message;
        }
<<<<<<< HEAD
=======


>>>>>>> e27fa1b6571085e149911219f3e6ad59d85d9b0a
        $scope.id = $routeParams.id;
        $scope.controller = "usuarioRemoveController";
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";

<<<<<<< HEAD
=======


>>>>>>> e27fa1b6571085e149911219f3e6ad59d85d9b0a
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

        $scope.remove = function () {

            promesasService.ajaxRemove('usuario', $routeParams.id)
                .then(function (response) {
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.falloMensaje = response.data.message;
                    } else {
                        $scope.fallo = false;
                        $scope.hecho = true;
                    }
                }, function (error) {
                    $scope.hecho = true;
                    $scope.fallo = true;
                    $scope.falloMensaje = error.message + " " + error.stack;
                });
        }
        $scope.volver = function () {
            window.history.back();
        };

        $scope.cerrar = function () {
            $location.path('/home/10/1');
        };
    }
)