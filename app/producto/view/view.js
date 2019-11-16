var miControlador = miModulo.controller(
    "productoViewController",

<<<<<<< HEAD
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
=======
        function ($scope, $routeParams, promesasService,auth) {

            if (auth.data.status != 200) {
                $location.path('/login');
            } else {
                $scope.authStatus = auth.data.status;
                $scope.authUsername = auth.data.message;
            }

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
>>>>>>> e27fa1b6571085e149911219f3e6ad59d85d9b0a
)
