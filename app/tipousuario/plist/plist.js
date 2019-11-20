'use strict';
var miControlador = miModulo.controller('tipousuarioPlistController',
    function ($scope, $http, $location, $routeParams, $anchorScroll) {
        $anchorScroll();
        $anchorScroll();

        $scope.paginaActual = parseInt($routeParams.page);
        $scope.rppActual = parseInt($routeParams.rpp);
        $scope.rppS = [10, 50, 100];
        $scope.controller = "tipousuarioPlistController";
        $scope.colOrder = $routeParams.colOrder;
        $scope.order = $routeParams.order;

        if ($scope.order == null || $scope.colOrder == null) {
            request = "http://localhost:8081/trolleyes/json?ob=tipousuario&op=getpage&rpp=" + $scope.rppActual + "&page=" + $scope.paginaActual;
        } else {
            request = "http://localhost:8081/trolleyes/json?ob=tipousuario&op=getpage&rpp=" + $scope.rppActual + "&page=" + $scope.paginaActual + "&order=" + $scope.colOrder + "," + $scope.order
        }

        promesasService.ajaxGetCount('tipousuario')
            .then(function (response) {
                $scope.status = response.data.status;
                $scope.numRegistros = response.data.message;
                $scope.numPaginas = Math.ceil($scope.numRegistros / $routeParams.rpp);
                $scope.calcPage = [];
                for (const p of $scope.rppS) {
                    const res = $scope.paginaActual / $scope.numPaginas;
                    const next = Math.ceil($scope.numRegistros / p);
                    $scope.calcPage.push(Math.ceil(res * next));
                }
                paginacion(2);
            })

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
        
        $scope.atras = function () {
            window.history.back();
        };
    }

)