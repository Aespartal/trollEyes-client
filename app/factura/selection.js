'use strict';
moduleComponent.component('facturaSelection', {
    templateUrl: 'app/factura/selection.html',
    controllerAs: 'c',
    controller: cController,
    bindings: {
        obj: '=',
        onFacturaSet: '&'
    }
});

function cController($http) {
    var self = this;
    self.ob = "factura";
    self.rpp = 5;
    self.page = 1;
    self.totalPages = 1;

    $http({
        method: 'GET',
        url: 'http://localhost:8081/trolleyes/json?ob=' + self.ob + '&op=getcount'
    }).then(function (response) {
        self.status = response.status;
        self.ajaxDataProductoNumber = response.data.message;
        self.totalPages = Math.ceil(self.ajaxDataProductoNumber / self.rpp);
        if (self.page > self.totalPages) {
            self.page = self.totalPages;
        }
        pagination();
    }, function (response) {
        self.ajaxDataProductoNumber = response.data.message || 'Request failed';
        self.status = response.status;
    });

    $http({
        method: 'GET',
        url: 'http://localhost:8081/trolleyes/json?ob=' + self.ob + '&op=getpage&rpp=' + self.rpp + '&page=' + self.page
    }).then(function (response) {
        self.status = response.status;
        self.data = response.data.message;
    }, function (response) {
        self.status = response.status;
        self.data = response.data.message || 'Request failed';
    });


    self.save = function (id, fecha) {
        self.obj = {id: id,fecha: fecha}
        self.onFacturaSet();
    };
    

    self.update = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=' + self.ob + '&op=getcount'
        }).then(function (response) {
            self.status = response.status;
            self.ajaxDataProductoNumber = response.data.message;
            self.totalPages = Math.ceil(self.ajaxDataProductoNumber / self.rpp);
            if (self.page > self.totalPages) {
                self.page = self.totalPages;
            }
            pagination();
        }, function (response) {
            self.ajaxDataProductoNumber = response.data.message || 'Request failed';
            self.status = response.status;
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=' + self.ob + '&op=getpage&rpp=' + self.rpp + '&page=' + self.page
        }).then(function (response) {
            self.status = response.status;
            self.data = response.data.message;
        }, function (response) {
            self.status = response.status;
            self.data = response.data.message || 'Request failed';
        });
    };


    self.cambiarPagina = function (pagina) {
        self.page = pagina;
        
        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=' + self.ob + '&op=getcount'
        }).then(function (response) {
            self.status = response.status;
            self.ajaxDataProductosNumber = response.data.message;
            self.totalPages = Math.ceil(self.ajaxDataProductosNumber / self.rpp);
            if (self.page > self.totalPages) {
                self.page = self.totalPages;
            }
            pagination();
        }, function (response) {
            self.ajaxDataProductosNumber = response.data.message || 'Request failed';
            self.status = response.status;
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=' + self.ob + '&op=getpage&rpp=' + self.rpp + '&page=' + self.page
        }).then(function (response) {
            self.status = response.status;
            self.data = response.data.message;
        }, function (response) {
            self.status = response.status;
            self.data = response.data.message || 'Request failed';
        });
    };

    self.reiniciar = function () {
        self.rpp = 5;
        self.page = 1;

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=' + self.ob + '&op=getpage&rpp=' + self.rpp + '&page=' + self.page
        }).then(function (response) {
            self.status = response.status;
            self.data = response.data.message;
        }, function (response) {
            self.status = response.status;
            self.data = response.data.message || 'Request failed';
        });
    };


    function pagination() {
        self.list = [];
        var valorNeighbourhood = 1;
        var prev_1 = (self.page - valorNeighbourhood);
        var prev_2 = (self.page - valorNeighbourhood - 1);
        var post_1 = (self.page - -valorNeighbourhood);
        var post_2 = (self.page - -valorNeighbourhood + 1);

        for (var i = 2; i <= self.totalPages - 1; i++) {
            if (i >= prev_1 && i <= post_1) {
                self.list.push(i);
            } else if (i === prev_2 || i === post_2) {
                self.list.push("...");
            }
        }
    }

}