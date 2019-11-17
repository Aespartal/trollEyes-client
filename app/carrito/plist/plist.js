var miControlador = miModulo.controller(
    "carritoPlistController",
 
    function ($scope, $routeParams,$http, promesasService, $window,auth,level) {
        $scope.sessionLevel = level.data.message;
        $scope.controller = "carritoPlistController";
        $scope.authStatus = auth.data.status;
        $scope.authUsername = auth.data.message;


        promesasService.ajaxListCarrito()
        .then(function successCallback(response) {
            if (response.data.status != 200) {
                $scope.fallo = true;
                $scope.falloMensaje = response.data.response;
            } else {
                $scope.fallo = false;
                $scope.hecho = true;
                $scope.status = response.data.status;
                $scope.pagina = response.data.message;
            }
            $scope.hecho = true;
        })
    


        $scope.add = function () {
            const datos = {
                id: $scope.id,
                cantidad: $scope.cantidad,
            }
            var jsonToSend = {
                data: JSON.stringify(datos)
            };
            promesasService.ajaxAddCarrito(id, cantidad)
                .then(function successCallback(response) {
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.falloMensaje = response.data.response;
                    } else {
                        $scope.fallo = false;
                        $scope.hecho = true;
                        $location.path("/carrito/plist");
                    }
                    $scope.hecho = true;
                })
        }
        

    }
)