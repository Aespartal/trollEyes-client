var miControlador = miModulo.controller(
    "facturaEditController",

<<<<<<< HEAD
    function ($scope, $http, $routeParams, promesasService, auth) {

=======
    function ($scope, $http, $routeParams, promesasService,auth) {
        
>>>>>>> e27fa1b6571085e149911219f3e6ad59d85d9b0a
        if (auth.data.status != 200) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message;
        }

        $scope.id = $routeParams.id;
        $scope.controller = "facturaEditController";
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";
        $scope.fecha = new Date();
<<<<<<< HEAD

=======
        
>>>>>>> e27fa1b6571085e149911219f3e6ad59d85d9b0a

        promesasService.ajaxGet('factura', $routeParams.id)
            .then(function (response) {
                $scope.id = response.data.message.id;
                $scope.fecha = moment(response.data.message.fecha, 'DD/MM/YYYY HH:mm').toDate();
                $scope.iva = response.data.message.iva;
                $scope.usuario_id = response.data.message.usuario_id;
            }, function () {
                $scope.fallo = true;
            })

        $scope.modificar = function () {

            const datos = {
                id: $routeParams.id,
                fecha: $scope.fecha,
                iva: $scope.iva,
                usuario_id: $scope.usuario_id,
            }
            var jsonToSend = {
                data: JSON.stringify(datos)
            };

            $http.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
            promesasService.ajaxUpdate('factura', { params: jsonToSend })
                .then(function (response) {
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.falloMensaje = response.data.message;
                    } else {
                        $scope.fallo = false;
<<<<<<< HEAD
                        $scope.hecho = true;
=======
                        $scope.hecho=true;
>>>>>>> e27fa1b6571085e149911219f3e6ad59d85d9b0a
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
            promesasService.ajaxGet('factura', $routeParams.id)
                .then(function (response) {
                    const respuesta = response.data.message;
                    $scope.id = response.data.message.id;
                    $scope.fecha = moment(response.data.message.fecha, 'DD/MM/YYYY HH:mm').toDate();
                    $scope.iva = response.data.message.iva;
                    $scope.usuario_obj = response.data.message.usuario_obj;
                }, function (error) {
                    $scope.fallo = true;
                });
        }

        $scope.cerrar = function () {
            $location.path('/home/10/1');
        };

        $scope.reset();

    }

)