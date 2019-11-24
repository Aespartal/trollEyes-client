var miControlador = miModulo.controller(
    "carritoNewController",

    function ($scope, $http,$location, promesasService,auth) {
        
   
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message;

        $scope.controller = "carritoNewController";
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";

        $scope.add = function () {
            const datos = {
                titulo: $scope.codigo,
                cuerpo: $scope.cuerpo,
                etiquetas: $scope.etiquetas, 
                fecha: $scope.fecha
            }
            var jsonToSend = {
                data: JSON.stringify(datos)
            };
            $http.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
            promesasService.ajaxNew('post', { params: jsonToSend })
                .then(function successCallback(response) {
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.falloMensaje = response.data.response;
                    } else {
                        $scope.fallo = false;
                        $scope.hecho = true;
                    }
                    $scope.hecho = true;
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
            $location.path('/home/12/1');
        };
    }
)