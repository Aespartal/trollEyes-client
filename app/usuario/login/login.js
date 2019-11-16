var miControlador = miModulo.controller(
    "login",
<<<<<<< HEAD
    function ($scope, $location, promesasService, auth) {
        $scope.controller = "login";
        $scope.usuario = "";
=======
    function ($scope, $location, promesasService,auth) {

        $scope.controller = "login";
        $scope.usuario ="";

>>>>>>> e27fa1b6571085e149911219f3e6ad59d85d9b0a
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";

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
<<<<<<< HEAD

                    });
            }
        }
=======
                    
                    });
            }
        }


>>>>>>> e27fa1b6571085e149911219f3e6ad59d85d9b0a
    }
)
