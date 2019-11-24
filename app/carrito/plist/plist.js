var miControlador = miModulo.controller(
    "carritoPlistController",

    function ($scope, promesasService, $window, auth, $location) {
        $scope.controller = "carritoPlistController";
        $scope.authStatus = auth.data.status;
        $scope.authUsername = auth.data.message.login;
        $scope.authLevel = auth.data.message.tipo_usuario_obj;
        $scope.fallo = false;
        $scope.hecho = false;
        total = 0;
        /*List de carrito*/
        function  isEmpty(obj) {
            for(var key in obj) {
                if(obj.hasOwnProperty(key))
                    return false;
            }
            return true;
        };

        promesasService.ajaxListCarrito()
            .then(function successCallback(response) {
                if (response.data.status != 200) {
                    $scope.falloMensaje = response.data.message;
                } else {
                    $scope.status = response.data.status;
                    $scope.pagina = response.data.message;

                    if(isEmpty(response.data.message)){
                        $scope.count=0;
                    } else{
                        $scope.count = Object.keys(response.data.message).length;       
                    }
                    for (i = 0; i < $scope.count; i++) {
                        cantidad = $scope.pagina[i].cantidad;
                        precioUniCant = parseFloat($scope.pagina[i].producto_obj.precio);
                        total += precioUniCant*cantidad;
                        
                    }
                    $scope.total = total.toFixed(2);

                }
            }, function (response) {
                $scope.mensaje = "Ha ocurrido un error";
            });

        /*Metodo buy*/
        $scope.buy = function () {
            promesasService.ajaxBuy()
                .then(function successCallback(response) {
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.hecho = false;
                        $scope.falloMensaje = response.data.message;
                    } else {
                        $scope.fallo = false;
                        $scope.hecho = true;
                        $scope.mensaje = response.data.message;
                        $window.location.reload();
                    }
                }, function (response) {
                    $scope.fallo = true;
                    $scope.hecho = false;
                    $scope.mensaje = "Ha ocurrido un error al realizar la compra";
                });
        }
        /*Metodo Remove*/
        $scope.remove = function (producto) {
            promesasService.ajaxRemoveCarrito(producto)
                .then(function successCallback(response) {
                    if (response.data.status != 200) {
                        $scope.fallo = false;
                        $scope.delete = false;
                        $scope.falloMensaje = response.data.message;
                    } else {
                        $scope.fallo = false;
                        $scope.delete = true;
                        $window.location.reload();
                    }
                }, function (response) {
                    $scope.fallo = true;
                    $scope.delete = false;
                    $scope.mensaje = "Ha ocurrido un error al borrar este producto";
                });
        }
        /*Metodo vaciar*/
        $scope.empty = function () {
            promesasService.ajaxEmptyCarrito()
                .then(function successCallback(response) {
                    if (response.data.status != 200) {
                        $scope.fallo = false;
                        $scope.empty = false;
                        $scope.falloMensaje = response.data.message;
                    } else {
                        $scope.fallo = false;
                        $scope.empty = true;
                        $window.location.reload();
                    }
                }, function (response) {
                    $scope.fallo = true;
                    $scope.empty = false;
                    $scope.mensaje = "Ha ocurrido un error al vaciar el carrito";
                });
        }

       

        $scope.cerrar = function () {
            $location.path('/home/12/1');
        };
    }
)