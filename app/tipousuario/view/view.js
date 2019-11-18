'use strict';
var miControlador = miModulo.controller('tipousuarioViewController',
    function ($scope, $http, $routeParams, $anchorScroll) {
        $anchorScroll();

        if (!$routeParams.id) {
            $scope.id = 1;
        } else {
            $scope.id = $routeParams.id;
        }

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=tipo_usuario&op=get&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.data = response.data.message;
        }, function (response) {
            $scope.status = response.status;
            $scope.data = response.data.message || 'Request failed';
        });

        $scope.volver = function () {
            window.history.back();
        };
    }
);