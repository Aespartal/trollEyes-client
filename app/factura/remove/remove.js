var miControlador = miModulo.controller(
    "facturaRemoveController",
<<<<<<< HEAD

    function ($scope, $routeParams, $location, promesasService, auth) {
=======
    
    function ($scope, $routeParams, $location, promesasService,auth) {
        
          
>>>>>>> e27fa1b6571085e149911219f3e6ad59d85d9b0a
        if (auth.data.status != 200) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message;
        }

<<<<<<< HEAD
=======

>>>>>>> e27fa1b6571085e149911219f3e6ad59d85d9b0a
        $scope.id = $routeParams.id;
        $scope.controller = "facturaRemoveController";
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";

<<<<<<< HEAD
        promesasService.ajaxGet('factura', $routeParams.id)
            .then(function (response) {
                $scope.id = response.data.message.id;
                $scope.fecha = moment(response.data.message.fecha, 'DD/MM/YYYY HH:mm').toDate();
                $scope.iva = response.data.message.iva;
                $scope.usuario_obj_nombre = response.data.message.usuario_obj.nombre;
                $scope.usuario_obj_apellido1 = response.data.message.usuario_obj.apellido1;
                $scope.usuario_obj_apellido2 = response.data.message.usuario_obj.apellido2;
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
                        $scope.hecho = true;
                    }
                }, function (error) {
                    $scope.hecho = true;
                    $scope.fallo = true;
                    $scope.falloMensaje = error.message + " " + error.stack;
                });
=======
       

          promesasService.ajaxGet('factura', $routeParams.id)
          .then(function (response) {
              $scope.id = response.data.message.id;
              $scope.fecha = moment(response.data.message.fecha, 'DD/MM/YYYY HH:mm').toDate();
              $scope.iva = response.data.message.iva;
              $scope.usuario_obj_nombre = response.data.message.usuario_obj.nombre;
              $scope.usuario_obj_apellido1 = response.data.message.usuario_obj.apellido1;
              $scope.usuario_obj_apellido2 = response.data.message.usuario_obj.apellido2;
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
>>>>>>> e27fa1b6571085e149911219f3e6ad59d85d9b0a
        }
        $scope.volver = function () {
            window.history.back();
        };

        $scope.cerrar = function () {
            $location.path('/home/10/1');
        };
    }
)
