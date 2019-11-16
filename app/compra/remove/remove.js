var miControlador = miModulo.controller(
    "compraRemoveController",
<<<<<<< HEAD
    function ($scope, $routeParams, $location, promesasService, auth) {
=======
    function ($scope, $routeParams, $location, promesasService,auth) {
        
          
>>>>>>> e27fa1b6571085e149911219f3e6ad59d85d9b0a
        if (auth.data.status != 200) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message;
        }

<<<<<<< HEAD
=======

>>>>>>> e27fa1b6571085e149911219f3e6ad59d85d9b0a
        $scope.id = $routeParams.id;
        $scope.controller = "compraRemoveController";
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";

<<<<<<< HEAD
        promesasService.ajaxGet('compra', $routeParams.id)
            .then(function (response) {
                $scope.id = response.data.message.id;
                $scope.cantidad = response.data.message.cantidad;
                $scope.producto_obj = response.data.message.producto_obj.descripcion;
                $scope.factura_obj = response.data.message.factura_obj.id;
            }, function () {
                $scope.fallo = true;
            })

        $scope.remove = function () {
            promesasService.ajaxRemove('compra', $routeParams.id)
                .then(function (response) {
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.falloMensaje = response.data.message;
                    } else {
                        $scope.fallo = false;
                        $scope.hecho = true;
                    }
                }, function (error) {
                    $scope.hecho = true;
                    $scope.fallo = true;
                    $scope.falloMensaje = error.message + " " + error.stack;
                });
=======
       

          promesasService.ajaxGet('compra', $routeParams.id)
          .then(function (response) {
              $scope.id = response.data.message.id;
              $scope.cantidad = response.data.message.cantidad;
              $scope.producto_obj = response.data.message.producto_obj.descripcion;
              $scope.factura_obj = response.data.message.factura_obj.id;
          }, function () {
              $scope.fallo = true;
          })

        $scope.remove = function () {

            promesasService.ajaxRemove('compra', $routeParams.id)
            .then(function (response) {
                if (response.data.status != 200) {
                    $scope.fallo = true;
                    $scope.falloMensaje = response.data.message;
                } else {
                    $scope.fallo = false;
                    $scope.hecho=true;
                }
            }, function (error) {
                $scope.hecho = true;
                $scope.fallo = true;
                $scope.falloMensaje = error.message + " " + error.stack;
            });
>>>>>>> e27fa1b6571085e149911219f3e6ad59d85d9b0a
        }
        $scope.volver = function () {
            window.history.back();
        };

        $scope.cerrar = function () {
            $location.path('/home/10/1');
        };
    }
)
