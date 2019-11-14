var miControlador = miModulo.controller(
    "productoViewController",
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

            promesasService.ajaxGet('producto', $routeParams.id)
                .then(function (response) {
                    $scope.id = response.data.message.id;
                    $scope.codigo = response.data.message.codigo;
                    $scope.existencias = response.data.message.existencias;
                    $scope.precio = response.data.message.precio;
                    $scope.imagen = response.data.message.imagen;
                    $scope.tipo_producto_id = response.data.message.tipo_producto_id;   
                }, function () {
                    $scope.fallo = true;
                })
        }]
)
