var miControlador = miModulo.controller(
    "productoFillController",
    ['$scope', 'promesasService',
    function ($scope, promesasService) {

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

       //--
       $scope.controller = "productoFillController";
       //--
       $scope.mensaje = "";
       $scope.fallo = false;
       $scope.hecho = false;
       //--
       $scope.crear = function (numero) {
        promesasService.ajaxFill('producto', numero).then(function (response) {
            if (response.data.status == 200) {
                $scope.fallo = false;
                $scope.hecho = true;
                $scope.mensaje = "Se han insertado todos los registros.";
            } else {
                $scope.fallo = true;
                $scope.hecho = true;
                $scope.mensaje = "No se ha podido realizar la operación.";
            }
        }, function () {
            $scope.fallo = true;
            $scope.hecho = true;
            $scope.mensaje = "No se ha podido realizar la operación.";
        });
    }
    //--
    $scope.volver = function () {
        window.history.back();
    };
    $scope.cerrar = function () {
        $location.path('/home/10/1');
    };


    }]

)