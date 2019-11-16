miModulo.controller(
    "logout",

<<<<<<< HEAD
    function ($scope, $location, promesasService, auth) {
        if ($scope.authStatus != 200) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message;
        }
        //--
        $scope.controller = "logout";
        //--
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";
        //--
        promesasService.ajaxLogout()
            .then(function (response) {
                if (response.data.status != 200) {
                    $scope.fallo = true;
                    $scope.falloMensaje = "Error al cerrar la sesión";
                } else {
                    $scope.fallo = false;
                    $scope.authStatus = 500;
                    $scope.authUsername = "No active session";
                }
                $scope.hecho = true;
            }, function (error) {
                $scope.hecho = true;
                $scope.fallo = true;
                $scope.falloMensaje = "Error al cerrar la sesión";
            });
        //--
        $scope.cerrar = function () {
            $location.path('/home/10/1');
        };
    }
)
=======
        function ($scope, $location, promesasService, auth) {
            
            if ($scope.authStatus != 200) {
                $location.path('/login');
            } else {
                $scope.authStatus = auth.data.status;
                $scope.authUsername = auth.data.message;
            }
            //--
            $scope.controller = "logout";
            //--
            $scope.fallo = false;
            $scope.hecho = false;
            $scope.falloMensaje = "";
            //--
            promesasService.ajaxLogout()
                .then(function (response) {
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.falloMensaje = "Error al cerrar la sesión";
                    } else {
                        $scope.fallo = false;
                        $scope.authStatus = 500;
                        $scope.authUsername = "No active session";
                    }
                    $scope.hecho = true;
                }, function (error) {
                    $scope.hecho = true;
                    $scope.fallo = true;
                    $scope.falloMensaje = "Error al cerrar la sesión";
                });
            //--
            $scope.cerrar = function () {
                $location.path('/home/10/1');
            };
        }
    )
>>>>>>> e27fa1b6571085e149911219f3e6ad59d85d9b0a
