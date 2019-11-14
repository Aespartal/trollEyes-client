var miControlador = miModulo.controller(
    "productoEditController",
    ['$scope', '$http', '$routeParams', 'promesasService',
    function ($scope, $http, $routeParams, promesasService) {
        
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
        $scope.controller = "productoEditController";
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";
        //$scope.fecha = new Date();
        

        promesasService.ajaxGet('producto', $routeParams.id)
            .then(function (response) {
                $scope.id = response.data.message.id;
                $scope.codigo = response.data.message.codigo;
                $scope.existencias = response.data.message.existencias;
                $scope.precio = response.data.message.precio;
                $scope.imagen = response.data.message.imagen;
                $scope.tipo_producto_id = response.data.message.tipo_producto_id;
                //$scope.fecha = moment(response.data.message.fecha, 'DD/MM/YYYY HH:mm').toDate();
            }, function () {
                $scope.fallo = true;
            })

        $scope.modificar = function () {

            const datos = {
                id: $routeParams.id,
                codigo: $scope.codigo,
                existencias: $scope.existencias,
                precio: $scope.precio,
                tipo_producto_id: $scope.tipo_producto_id
            }
            var jsonToSend = {
                data: JSON.stringify(datos)
            };

            $http.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
            promesasService.ajaxUpdate('producto', { params: jsonToSend })
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
        };

        $scope.volver = function () {
            window.history.back();
        };

        $scope.reset = function () {
            promesasService.ajaxGet('producto', $routeParams.id)
                .then(function (response) {
                    const respuesta = response.data.message;
                    $scope.id = response.data.message.id;
                    $scope.codigo = response.data.message.codigo;
                    $scope.existencias = response.data.message.existencias;
                    $scope.precio = response.data.message.precio;
                    $scope.imagen = response.data.message.imagen;
                    $scope.tipo_producto_id = response.data.message.tipo_producto_id;
                    // $scope.fecha = moment(response.data.message.fecha, 'DD/MM/YYYY HH:mm').toDate();
                }, function (error) {
                    $scope.fallo = true;
                });
        }

        $scope.cerrar = function () {
            $location.path('/home/10/1');
        };

        $scope.reset();

    }]

)