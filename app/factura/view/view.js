var miControlador = miModulo.controller(
    "facturaViewController",

<<<<<<< HEAD
    function ($scope, $routeParams, promesasService, auth) {

        if (auth.data.status != 200) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message;
            $scope.controller = "facturaViewController";
        }

        promesasService.ajaxGet('factura', $routeParams.id)
            .then(function (response) {
                $scope.id = response.data.message.id;
                $scope.fecha = moment(response.data.message.fecha, 'DD/MM/YYYY HH:mm').toDate();
                $scope.iva = response.data.message.iva;
                $scope.usuario_obj_nombre = response.data.message.usuario_obj.nombre;
                $scope.usuario_obj_apellido1 = response.data.message.usuario_obj.apellido1;
                $scope.usuario_obj_apellido2 = response.data.message.usuario_obj.apellido2;
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

            promesasService.ajaxGet('factura', $routeParams.id)
                .then(function (response) {
                    $scope.id = response.data.message.id;
                    $scope.fecha = moment(response.data.message.fecha, 'DD/MM/YYYY HH:mm').toDate();
                    $scope.iva = response.data.message.iva;
                    $scope.usuario_obj_nombre = response.data.message.usuario_obj.nombre;
                    $scope.usuario_obj_apellido1 = response.data.message.usuario_obj.apellido1;
                    $scope.usuario_obj_apellido2 = response.data.message.usuario_obj.apellido2;
                }, function () {
                    $scope.fallo = true;
                })
        }
>>>>>>> e27fa1b6571085e149911219f3e6ad59d85d9b0a
)
