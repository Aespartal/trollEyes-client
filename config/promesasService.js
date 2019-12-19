miModulo.factory('promesasService', ['$http',
    function ($http) {
        return {
            ajaxGet: function (object, id) {
                return $http.get(`http://localhost:8081/trolleyes/json?ob=${object}&op=get&id=${id}`);
            },
            ajaxUpdate: function (object, datos) {
                return $http.get(`http://localhost:8081/trolleyes/json?ob=${object}&op=update`, datos);
            },
            ajaxNew: function (object, datos) {
                return $http.get(`http://localhost:8081/trolleyes/json?ob=${object}&op=insert`, datos);
            },
            ajaxGetCount: function (object,id,filter) {
                if(filter != null && id != null) {
                    return $http.get(`http://localhost:8081/trolleyes/json?ob=${object}&op=getcount&filter=${filter}&id=${id}`);
                }
                return $http.get(`http://localhost:8081/trolleyes/json?ob=${object}&op=getcount`);
            },
            ajaxGetPage: function (object, rpp, page, colOrder, order, user, filter) {
                if (colOrder == null && order == null && user == null && filter == null) {
                    url = `http://localhost:8081/trolleyes/json?ob=${object}&op=getpage&page=${page}&rpp=${rpp}`;
                } else if(user != null && filter != null) {
                    url = `http://localhost:8081/trolleyes/json?ob=${object}&op=getpage&page=${page}&rpp=${rpp}&filter=${filter}&id=${user}`;
                } else if(user != null && filter != null && colOrder != null && order != null) {
                    url = `http://localhost:8081/trolleyes/json?ob=${object}&op=getpage&page=${page}&rpp=${rpp}&filter=${filter}&rpp=${rpp}&order=${colOrder}&direccion=${order}`;
                } else {
                    url = `http://localhost:8081/trolleyes/json?ob=${object}&op=getpage&page=${page}&rpp=${rpp}&order=${colOrder}&direccion=${order}`
                }
                return $http.get(url);
            },

            ajaxRemove: function (object, id) {
                return $http.get(`http://localhost:8081/trolleyes/json?ob=${object}&op=remove&id=${id}`);
            },
            ajaxLogin: function (username, password) {
                return $http.get(`http://localhost:8081/trolleyes/json?ob=usuario&op=login&username=${username}&password=` + forge_sha256(password));
            },
            ajaxGoogleLogin: function (googleUser) {
                return $http.get('http://localhost:8081/trolleyes/json?ob=usuario&op=login&token=' + googleUser.getAuthResponse().id_token);
            },
            ajaxSignup: function (email, username, password, dni, nombre, apellido1, apellido2) {
                return $http.get('http://localhost:8081/trolleyes/json?ob=usuario&op=signup&email=' + email + '&username=' + username + '&password=' + forge_sha256(password) + '&dni=' + dni + '&nombre=' + nombre + '&apellido1=' + apellido1 +'&apellido2=' + apellido2);
            },
            ajaxLogout: function () {
                gapi.auth2.getAuthInstance().signOut();
                return $http.get(`http://localhost:8081/trolleyes/json?ob=usuario&op=logout`);
            },
            ajaxCheck: function () {
                return $http.get(`http://localhost:8081/trolleyes/json?ob=usuario&op=check`);
            },
            ajaxSessionLevel: function () {
                return $http.get(`http://localhost:8081/trolleyes/json?ob=usuario&op=sessionlevel`);
            },
            ajaxFill: function (object, number) {
                return $http.get(`http://localhost:8081/trolleyes/json?ob=${object}&op=fill&number=${number}`);
            },
            ajaxSearch: function (object, rpp, page, word) {
                return $http.get(`http://localhost:8081/trolleyes/json?ob=${object}&op=getpage&rpp=${rpp}&page=${page}&word=${word}`);
            },
            ajaxAddCarrito: function (id, cantidad) {
                return $http.get(`http://localhost:8081/trolleyes/json?ob=carrito&op=add&id=${id}&cantidad=${cantidad}`);
            },
            ajaxRemoveCarrito: function (id) {
                return $http.get(`http://localhost:8081/trolleyes/json?ob=carrito&op=remove&id=${id}`);
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