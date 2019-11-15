var miControlador = miModulo.controller(
    "pedidoRemoveController",
    ['$scope', '$routeParams', '$location', 'promesasService', 
    function ($scope, $routeParams, $location, promesasService) {
        
          
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
        $scope.controller = "pedidoRemoveController";
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";

       

          promesasService.ajaxGet('compra', $routeParams.id)
          .then(function (response) {
              $scope.id = response.data.message.id;
              $scope.cantidad = response.data.message.cantidad;
              $scope.producto_id = response.data.message.producto_id;
              $scope.factura_id = response.data.message.factura_id;
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
        }
        $scope.volver = function () {
            window.history.back();
        };

        $scope.cerrar = function () {
            $location.path('/home/10/1');
        };
    }]
)
