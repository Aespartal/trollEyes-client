var miControlador = miModulo.controller(
    "facturaRemoveController",
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
        $scope.controller = "facturaRemoveController";
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";

       

          promesasService.ajaxGet('factura', $routeParams.id)
          .then(function (response) {
              $scope.id = response.data.message.id;
              $scope.fecha = response.data.message.fecha;
              $scope.iva = response.data.message.iva;
              $scope.usuario_id = response.data.message.usuario_id;
          }, function () {
              $scope.fallo = true;
          })

        $scope.remove = function () {

            promesasService.ajaxRemove('factura', $routeParams.id)
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
