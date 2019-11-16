var miControlador = miModulo.controller(
    "productoViewController",

    function ($scope, $routeParams, promesasService, auth) {
        $scope.authStatus = auth.data.status;
        $scope.authUsername = auth.data.message;
        $scope.controller = "productoViewController";

        promesasService.ajaxGet('producto', $routeParams.id)
            .then(function (response) {
                $scope.id = response.data.message.id;
                $scope.codigo = response.data.message.codigo;
                $scope.existencias = response.data.message.existencias;
                $scope.precio = response.data.message.precio;
                $scope.imagen = response.data.message.imagen;
                $scope.tipo_producto_obj = response.data.message.tipo_producto_obj;
            }, function () {
                $scope.fallo = true;
            })
    }
)
