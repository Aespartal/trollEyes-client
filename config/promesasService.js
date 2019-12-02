miModulo.factory('promesasService', ['$http',
    function ($http) {
        return {
            ajaxGet: function (objeto, identificador) {
                return $http.get('http://localhost:8081/trolleyes/json?ob=' + objeto + '&op=get&id=' + identificador);
            },
            ajaxUpdate: function (objeto, datos) {
                return $http.get('http://localhost:8081/trolleyes/json?ob=' + objeto + '&op=update', datos);
            },
            ajaxNew: function (objeto, datos) {
                return $http.get('http://localhost:8081/trolleyes/json?ob=' + objeto + '&op=insert', datos);
            },
            ajaxGetCount: function (objeto) {
                return $http.get('http://localhost:8081/trolleyes/json?ob=' + objeto + '&op=getcount');
            },
            ajaxGetCountFacture: function (id) {
                return $http.get('http://localhost:8081/trolleyes/json?ob=factura&op=getcountfactureuser&id=' + id);
            },
            ajaxGetCountFilter: function (objeto,id,filter) {
                return $http.get('http://localhost:8081/trolleyes/json?ob=' + objeto + '&op=getcount&id=' + id + '&filter=' + filter);
            },
            ajaxGetPage: function (objeto, rpp, page) {
                return $http.get('http://localhost:8081/trolleyes/json?ob=' + objeto + '&op=getpage&rpp=' + rpp + '&page=' + page);
            },
            ajaxGetPageFacture: function (rpp, page, id) {
                return $http.get('http://localhost:8081/trolleyes/json?ob=factura&op=getpagefactureuser&rpp=' + rpp + '&page=' + page + '&id=' + id);
            },
            ajaxRemove: function (objeto, identificador) {
                return $http.get('http://localhost:8081/trolleyes/json?ob=' + objeto + '&op=remove&id=' + identificador);
            },
            ajaxLogin: function (username, password) {
                return $http.get('http://localhost:8081/trolleyes/json?ob=usuario&op=login&username=' + username + '&password=' + forge_sha256(password));
            },
            ajaxLogout: function () {
                return $http.get('http://localhost:8081/trolleyes/json?ob=usuario&op=logout');
            },
            ajaxCheck: function () {
                return $http.get('http://localhost:8081/trolleyes/json?ob=usuario&op=check');
            },
            ajaxSessionLevel: function () {
                return $http.get('http://localhost:8081/trolleyes/json?ob=usuario&op=sessionlevel');
            },
            ajaxFill: function (objeto, number) {
                return $http.get('http://localhost:8081/trolleyes/json?ob=' + objeto + '&op=fill&number=' + number);
            },
            ajaxSearch: function (objeto, rpp, page, word) {
                return $http.get('http://localhost:8081/trolleyes/json?ob=' + objeto + '&op=getpage&rpp=' + rpp + '&page=' + page + '&word=' + word);
            },
            ajaxAddCarrito: function (id, cantidad) {
                return $http.get('http://localhost:8081/trolleyes/json?ob=carrito&op=add&id=' + id + '&cantidad=' + cantidad);
            },
            ajaxRemoveCarrito: function (id) {
                return $http.get('http://localhost:8081/trolleyes/json?ob=carrito&op=remove&id=' + id);
            },
            ajaxListCarrito: function () {
                return $http.get('http://localhost:8081/trolleyes/json?ob=carrito&op=list');
            },
            ajaxEmptyCarrito: function () {
                return $http.get('http://localhost:8081/trolleyes/json?ob=carrito&op=empty');
            },
            ajaxBuy: function () {
                return $http.get('http://localhost:8081/trolleyes/json?ob=carrito&op=buy');
            }
        }
    }])