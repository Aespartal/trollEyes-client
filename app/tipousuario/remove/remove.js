'use strict';
var miControlador = miModulo.controller('tipousuarioRemoveController',
    function ($scope, $http, $routeParams, $anchorScroll) {
        $anchorScroll();
        
        $scope.botones = true;
        $scope.alerta = false;
        $scope.formulario = true;

        if (!$routeParams.id) {
            $scope.id = 1;
        } else {
            $scope.id = $routeParams.id;
        }

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=tipousuario&op=get&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message;
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message || 'Request failed';
        });

        $scope.volver = function () {
            window.history.back();
        };

        $scope.borrar = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=tipousuario&op=remove&id=' + $scope.id
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxData = response.data.message;
                $scope.formulario = false;
                $scope.botones = false;
                $scope.alerta = true;
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxData = response.data.message || 'Request failed';
            });
        };
    }
);