var miControlador = miModulo.controller(
    "facturaViewController",
    function ($scope, $routeParams, promesasService, auth, $location) {
        if (auth.data.status != 200) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message.login;
            $scope.authLevel = auth.data.message.tipo_usuario_obj;
        }

        $scope.controller = "facturaViewController";

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
            /*Notifis mediante lista de carrito*/
        promesasService.ajaxListCarrito()
        .then(function successCallback(response) {
            if (response.data.status != 200) {
                $scope.falloMensaje = response.data.message;
            } else {
                $scope.count = Object.keys(response.data.message).length;
            }
        }, function (response) {
            $scope.mensaje = "Ha ocurrido un error";
        });
    }
)
