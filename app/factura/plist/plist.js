var miControlador = miModulo.controller('facturaPlistController', ['$scope', '$location', 'promisesService', '$routeParams', '$window', '$location', 'auth', function ($scope, $location, promisesService, $routeParams, $window, $location, auth) {
    $scope.object = "factura";
    $scope.authStatus = auth.data.status;
    $scope.client = auth.data.message.tipo_usuario_obj["descripcion"];
    $scope.controller = "facturaPlistController";

    if ($scope.authStatus !== 200) {
        $location.path('/login');
    }

    if ($scope.client !== "Administrador") {
        $location.path('/');
    }

    if ($routeParams.user !== undefined) {
        $scope.user_id = $routeParams.user;
        $scope.filter = "usuario";
    } else {
        $scope.user_id = null;
        $scope.filter = null;
    }

    $scope.actually_page = parseInt($routeParams.page);
    $scope.rpp = parseInt($routeParams.rpp);

    $scope.colOrder = $routeParams.colOrder;
    $scope.order = $routeParams.order;

    $scope.full_url = function () {
        let url = $location.absUrl();

        let find_id = url.indexOf("/id");
        let find_fechad = url.indexOf("/fecha");
        let find_iva = url.indexOf("/iva");

        if (find_id !== -1) {
            max_cut_string = find_id;
        } else if (find_fechad !== -1) {
            max_cut_string = find_fechad;
        } else if (find_iva !== -1) {
            max_cut_string = find_iva;
        } else {
            return url;
        }

        return url.substring(0, max_cut_string);
    };

    $scope.get_order = function () {
        if ($scope.order === "desc") {
            return "asc"
        } else {
            return "desc"
        }
    };

    $scope.buildURL = function () {
        if ($scope.colOrder !== undefined && $scope.order !== undefined && $scope.user_id === null) {
            return `/${$scope.colOrder}/${$scope.order}`;
        } else if ($scope.colOrder !== undefined && $scope.order !== undefined && $scope.user_id !== null) {
            return `/${$scope.colOrder}/${$scope.order}?user=${$scope.user_id}`;
        }  else if ($scope.colOrder === undefined && $scope.order === undefined && $scope.user_id !== null) {
            return `?user=${$scope.user_id}`;
        } else {
            return '';
        }
    };


    promisesService.ajaxGetPage($scope.object, $scope.rpp, $scope.actually_page, $scope.colOrder, $scope.order, $scope.user_id, $scope.filter).then(function (response) {
        $scope.facturas = response.data.message;
        if ($scope.user_id !== null) {
            promisesService.ajaxGet("usuario", $scope.user_id).then((response) => {
                user = response.data.message;
                if (user === null) {
                    $window.location.href = `#!/factura/plist/${$scope.rpp}/1`;
                } else {
                    if ($scope.facturas && $scope.facturas.length) {
                        $scope.facturas_empty = false;
                    } else {
                        $scope.facturas_empty = true;
                    }

                    $scope.usuario = user.nombre + " " + user.apellido1 + " " + user.apellido2;
                    $scope.num_facturas = user.link_factura;
                    $scope.pages = promisesService.pagination($scope.num_facturas, $scope.rpp, $scope.actually_page, 2);
                    if ($scope.pages.indexOf($scope.actually_page) === -1) {
                        $window.location.href = `#!/factura/plist/${$scope.rpp}/1?user=${user.id}`;
                    }
                }
            });

        } else {
            promisesService.ajaxGetCount($scope.object).then(function (response) {
                $scope.num_facturas = response.data.message;
                $scope.pages = promisesService.pagination($scope.num_facturas, $scope.rpp, $scope.actually_page, 2);

                if ($scope.pages.indexOf($scope.actually_page) === -1) {
                    $window.location.href = `#!/factura/plist/${$scope.rpp}/1`;
                }
            });
        }
    });
}]);