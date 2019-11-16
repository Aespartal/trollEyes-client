var miControlador = miModulo.controller(
    "productoNewController",

<<<<<<< HEAD
    function ($scope, $http, $location, promesasService, auth) {

=======
    function ($scope, $http,$location, promesasService,auth) {
        
>>>>>>> e27fa1b6571085e149911219f3e6ad59d85d9b0a
        if (auth.data.status != 200) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message;
        }

        $scope.controller = "productoNewController";
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";

        promesasService.ajaxCheck()
            .then(function (response) {
                if (response.data.status == 200) {
                    $scope.session = true;
                    $scope.usuario = response.data.message;
                } else {
                    $scope.session = false;
                }
            }, function (response) {
                $scope.session = false;
            })

        $scope.new = function () {
            const datos = {
                codigo: $scope.codigo,
                existencias: $scope.existencias,
                precio: $scope.precio,
                tipo_producto_id: $scope.tipo_producto_id
            }
            var jsonToSend = {
                data: JSON.stringify(datos)
            };
            $http.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
            promesasService.ajaxNew('producto', { params: jsonToSend })
                .then(function successCallback(response) {
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.falloMensaje = response.data.response;
                    } else {
                        $scope.fallo = false;
                        $scope.hecho = true;
                    }
                    $scope.hecho = true;
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