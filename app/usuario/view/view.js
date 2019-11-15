var miControlador = miModulo.controller(
    "postViewController",
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

            promesasService.ajaxGet('post', $routeParams.id)
                .then(function (response) {
                    $scope.id = response.data.message.id;
                    $scope.titulo = response.data.message.titulo;
                    $scope.cuerpo = response.data.message.cuerpo;
                    $scope.etiquetas = response.data.message.etiquetas;
                }, function () {
                    $scope.fallo = true;
                })
        }]
)
