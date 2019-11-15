var miControlador = miModulo.controller(
    "facturaViewController",
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

            promesasService.ajaxGet('factura', $routeParams.id)
                .then(function (response) {
                    $scope.id = response.data.message.id;
                    $scope.fecha = response.data.message.fecha;
                    $scope.iva = response.data.message.iva;
                    $scope.usuario_id = response.data.message.usuario_id;
                }, function () {
                    $scope.fallo = true;
                })
        }]
)
