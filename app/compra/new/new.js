var miControlador = miModulo.controller(
    "compraNewController",

    function ($scope, $http, $location, promesasService, auth,$routeParams) {
        $scope.object = "compra";
        if (auth.data.status != 200 || auth.data.message.tipo_usuario_obj.id == 2) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message.login;
            $scope.authLevel =  auth.data.message.tipo_usuario_obj;
        }

        $scope.controller = "compraNewController";
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";

        promesasService.ajaxCheck()
            .then(function (response) {
                if (response.data.status == 200) {
                    $scope.session = true;
                    $scope.usuario = response.data.message;
                } else {
                    $scope.session = false;
                }
            }, function (response) {
                $scope.session = false;
            })

        $scope.new = function () {
           
            const datos = {
                cantidad: $scope.cantidad,
                producto_id: $scope.producto_obj.id,
                factura_id: $scope.factura_obj.id,
            }
            var jsonToSend = {
                data: JSON.stringify(datos)
            };
            $http.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
            promesasService.ajaxNew($scope.object, { params: jsonToSend })
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

        $scope.productoRefresh = function (f, consultar) {
            var form = f;
            if ($scope.producto_obj.id != null) {
                if (consultar) {
                    promesasService.ajaxGet($scope.object, $scope.producto_obj.id)
                        .then(function (response) {
                            $scope.producto_obj = response.data.message;
                            form.userForm.producto_obj.$setValidity('valid', true);
                        }, function () {
                            form.userForm.producto_obj.$setValidity('valid', false);
                        });
                } else {
                    form.userForm.producto_obj.$setValidity('valid', true);
                }
            } else {
                $scope.producto_obj.descripcion = "";
            }
        };

        $scope.facturaRefresh = function (f, consultar) {
            var form = f;
            if ($scope.factura_obj.id != null) {
                if (consultar) {
                    promesasService.ajaxGet($scope.object, $scope.factura_obj.id)
                        .then(function (response) {
                            $scope.factura_obj = response.data.message;
                            form.userForm.factura_obj.$setValidity('valid', true);
                        }, function () {
                            form.userForm.factura_obj.$setValidity('valid', false);
                        });
                } else {
                    form.userForm.factura_obj.$setValidity('valid', true);
                }
            } else {
                $scope.factura_obj.descripcion = "";
            }
        };

        $scope.volver = function () {
            window.history.back();
        };
        $scope.cerrar = function () {
            $location.path('/');
        };
    }
)