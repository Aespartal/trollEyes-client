var miControlador = miModulo.controller(
    "pedidoViewController",
    ['$scope', '$routeParams', 'promesasService',
        function ($scope, $routeParams, promesasService) {

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

            promesasService.ajaxGet('compra', $routeParams.id)
                .then(function (response) {
                    $scope.id = response.data.message.id;
                    $scope.cantidad = response.data.message.cantidad;
                    $scope.producto_id = response.data.message.producto_id;
                    $scope.factura_id = response.data.message.factura_id;
                }, function () {
                    $scope.fallo = true;
                })
        }]
)
