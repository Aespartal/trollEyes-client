var miControlador = miModulo.controller(
    "homeController",
    function ($scope, $routeParams, $window, promesasService, auth) {
        $scope.authStatus = auth.data.status;
        $scope.authUsername = auth.data.message.login;
        $scope.authLevel = auth.data.message.tipo_usuario_obj;
        $scope.authid = auth.data.message.id;
        $scope.controller = "homeController";

        if ($routeParams.page === undefined && $routeParams.rpp === undefined) {
            $scope.paginaActual = 1;
            $scope.rppActual = 12;
        } else {
            $scope.paginaActual = parseInt($routeParams.page);
            $scope.rppActual = parseInt($routeParams.rpp);
        }

        promesasService.ajaxGetPage('producto', $scope.rppActual, $scope.paginaActual)
            .then(function (response) {
                $scope.status = response.data.status;
                $scope.pagina = response.data.message;
            })

        promesasService.ajaxGetCount('producto')
            .then(function (response) {
                $scope.status = response.data.status;
                $scope.numRegistros = response.data.message;
                $scope.numPaginas = Math.ceil($scope.numRegistros / $scope.rppActual);

                paginacion(2);
                if ($scope.paginaActual > $scope.numPaginas && $scope.numPaginas != 0) {
                    $window.location.href = `./${$scope.rppActual}/${$scope.numPaginas}`;
                } else if ($routeParams.page < 1) {
                    $window.location.href = `./${$scope.rppActual}/1`;
                }
            })

        /*Paginacion*/
        function paginacion(vecindad) {
            vecindad++;
            $scope.botonera = [];
            for (i = 1; i <= $scope.numPaginas; i++) {
                if (i == 1) {
                    $scope.botonera.push(i);
                } else if (i > ($scope.paginaActual - vecindad) && i < ($scope.paginaActual + vecindad)) {
                    $scope.botonera.push(i);
                } else if (i == $scope.numPaginas) {
                    $scope.botonera.push(i);
                } else if (i == ($scope.paginaActual - vecindad) || i == ($scope.paginaActual + vecindad)) {
                    $scope.botonera.push('...');
                }
            }
        }
        /*Lista de carrito*/
        promesasService.ajaxListCarrito()
            .then(function successCallback(response) {
                if (response.data.status != 200) {
                    $scope.falloMensaje = response.data.message;
                } else {
                    $scope.status = response.data.status;
                    $scope.pagina = response.data.message;
                    if (response.data.message) {
                        if (response.data.message.length == 0) {
                            $scope.count = 0;
                        } else {
                            $scope.count = response.data.message.length;
                        }
                    } else {
                        $scope.count = 0;
                    }
                }
            }, function (response) {
                $scope.mensaje = "Ha ocurrido un error";
            });

        /*Add carrito*/
        $scope.add = function (id) {
            promesasService.ajaxAddCarrito(id, 1)
                .then(function successCallback(response) {
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.falloMensaje = response.data.response;
                    } else {
                        $scope.fallo = false;
                        $scope.hecho = true;
                        promesasService.ajaxListCarrito()
                            .then(function successCallback(response) {
                                if (response.data.status != 200) {
                                    $scope.falloMensaje = response.data.message;
                                } else {
                                    if (response.data.message) {
                                        if (response.data.message.length == 0) {
                                            $scope.count = 0;
                                        } else {
                                            $scope.count = response.data.message.length;
                                        }
                                    } else {
                                        $scope.count = 0;
                                    }
                                }
                            }, function (response) {
                                $scope.mensaje = "Ha ocurrido un error";
                            });
                    }
                    $scope.hecho = true;
                })
        }
    }
)