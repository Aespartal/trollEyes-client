var miControlador = miModulo.controller(
    "usuarioLogoutController",
    ['$scope','$location','promesasService', function ($scope,$location,promesasService) {
        $scope.controller="usuarioLogoutController";

            promesasService.ajaxLogout()
            .then(function (response){
                $scope.session= false;
                $location.path("/login");
            }, function(response){
                $scope.session= true;
                $scope.falloMensaje ="No se ha podido cerrar sesion.";
            })
       
    }]
)
