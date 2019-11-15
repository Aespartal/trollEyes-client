var miControlador = miModulo.controller(
    "pedidoEditController",
    ['$scope', '$http', '$routeParams', 'promesasService',
    function ($scope, $http, $routeParams, promesasService) {
        
         promesasService.ajaxCheck()
         .then(function (response) {
             if(response.data.status=="200"){
                 $scope.session= true;
                 $scope.usuario=response.data.message;
             } else {
                 $scope.session= false;
             }
         }, function (response) {
             $scope.session= false;
         })

        $scope.id = $routeParams.id;
        $scope.controller = "pedidoEditController";
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";
        $scope.fecha = new Date();
        

        promesasService.ajaxGet('compra', $routeParams.id)
            .then(function (response) {
                $scope.id = response.data.message.id;
                $scope.cantidad = response.data.message.cantidad;
                $scope.producto_id = response.data.message.producto_id;
                $scope.factura_id = response.data.message.factura_id;
            }, function () {
                $scope.fallo = true;
            })

        $scope.modificar = function () {

            const datos = {
                id: $routeParams.id,
                cantidad: $scope.cantidad,
                producto_id: $scope.producto_id,
                factura_id: $scope.factura_id,
            }
            var jsonToSend = {
                data: JSON.stringify(datos)
            };

            $http.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
            promesasService.ajaxUpdate('compra', { params: jsonToSend })
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
        };

        $scope.volver = function () {
            window.history.back();
        };

        $scope.reset = function () {
            promesasService.ajaxGet('compra', $routeParams.id)
                .then(function (response) {
                    $scope.id = response.data.message.id;
                    $scope.cantidad = response.data.message.cantidad;
                    $scope.producto_id = response.data.message.producto_id;
                    $scope.factura_id = response.data.message.factura_id;
                }, function (error) {
                    $scope.fallo = true;
                });
        }

        $scope.cerrar = function () {
            $location.path('/home/10/1');
        };

        $scope.reset();

    }]

)