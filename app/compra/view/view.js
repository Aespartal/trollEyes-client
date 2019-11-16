var miControlador = miModulo.controller(
    "compraViewController",

<<<<<<< HEAD
    function ($scope, $routeParams, promesasService, auth) {
        if (auth.data.status != 200) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message;
            $scope.controller = "compraViewController";
        }

        promesasService.ajaxGet('compra', $routeParams.id)
            .then(function (response) {
                $scope.id = response.data.message.id;
                $scope.cantidad = response.data.message.cantidad;
                $scope.producto_obj = response.data.message.producto_obj.descripcion;
                $scope.factura_obj = response.data.message.factura_obj.id;
            }, function () {
                $scope.fallo = true;
            })
    }
=======
        function ($scope, $routeParams, promesasService,auth) {

            if (auth.data.status != 200) {
                $location.path('/login');
            } else {
                $scope.authStatus = auth.data.status;
                $scope.authUsername = auth.data.message;
            }

            promesasService.ajaxGet('compra', $routeParams.id)
                .then(function (response) {
                    $scope.id = response.data.message.id;
                    $scope.cantidad = response.data.message.cantidad;
                    $scope.producto_obj = response.data.message.producto_obj.descripcion;
                    $scope.factura_obj = response.data.message.factura_obj.id;
                }, function () {
                    $scope.fallo = true;
                })
        }
>>>>>>> e27fa1b6571085e149911219f3e6ad59d85d9b0a
)
