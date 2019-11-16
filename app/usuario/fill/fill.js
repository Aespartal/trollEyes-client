var miControlador = miModulo.controller(
    "usuarioFillController",

<<<<<<< HEAD
    function ($scope, promesasService, auth) {
=======
    function ($scope, promesasService,auth) {

>>>>>>> e27fa1b6571085e149911219f3e6ad59d85d9b0a
        if (auth.data.status != 200) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message;
<<<<<<< HEAD
            $scope.controller = "usuarioFillController";
        }
        //--
        $scope.mensaje = "";
        $scope.fallo = false;
        $scope.hecho = false;
        //--
        $scope.crear = function (numero) {
            promesasService.ajaxFill('post', numero).then(function (response) {
                if (response.data.status == 200) {
                    $scope.fallo = false;
                    $scope.hecho = true;
                    $scope.mensaje = "Se han insertado todos los registros.";
                } else {
                    $scope.fallo = true;
                    $scope.hecho = true;
                    $scope.mensaje = "No se ha podido realizar la operación.";
                }
            }, function () {
                $scope.fallo = true;
                $scope.hecho = true;
                $scope.mensaje = "No se ha podido realizar la operación.";
            });
        }
        //--
        $scope.volver = function () {
            window.history.back();
        };
        $scope.cerrar = function () {
            $location.path('/home/10/1');
        };
    }
=======
        }

       //--
       $scope.controller = "usuarioFillController";
       //--
       $scope.mensaje = "";
       $scope.fallo = false;
       $scope.hecho = false;
       //--
       $scope.crear = function (numero) {
        promesasService.ajaxFill('post', numero).then(function (response) {
            if (response.data.status == 200) {
                $scope.fallo = false;
                $scope.hecho = true;
                $scope.mensaje = "Se han insertado todos los registros.";
            } else {
                $scope.fallo = true;
                $scope.hecho = true;
                $scope.mensaje = "No se ha podido realizar la operación.";
            }
        }, function () {
            $scope.fallo = true;
            $scope.hecho = true;
            $scope.mensaje = "No se ha podido realizar la operación.";
        });
    }
    //--
    $scope.volver = function () {
        window.history.back();
    };
    $scope.cerrar = function () {
        $location.path('/home/10/1');
    };


    }

>>>>>>> e27fa1b6571085e149911219f3e6ad59d85d9b0a
)