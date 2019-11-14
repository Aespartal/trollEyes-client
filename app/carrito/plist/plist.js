var miControlador = miModulo.controller(
    "postPlistController",
    ['$scope', '$routeParams','$http', 'promesasService', '$window', function ($scope, $routeParams,$http, promesasService, $window) {
          
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

        $scope.paginaActual = parseInt($routeParams.page);
        $scope.rppActual = parseInt($routeParams.rpp);
        $scope.rppS = [10, 50, 100];
        $scope.controller = "postPlistController";
        $scope.colOrder = $routeParams.colOrder;
        $scope.order = $routeParams.order;

            if ($scope.order == null || $scope.colOrder == null) {
                request = "http://localhost:8081/blogbuster/json?ob=post&op=getpage&rpp=" + $scope.rppActual + "&page=" + $scope.paginaActual;
            } else {
                request = "http://localhost:8081/blogbuster/json?ob=post&op=getpage&rpp=" + $scope.rppActual + "&page=" + $scope.paginaActual + "&order=" + $scope.colOrder + "," + $scope.order
            }


            $http({
                method: "GET",
                withCredentials: true,
                url: request
            }).then(function (response) {
                $scope.status = response.data.status;
                $scope.pagina = response.data.message;
            });
    
            $scope.showSelectValue = function (mySelect) {
                $window.location.href = `/blogBuster-client/#!/post/plist/`+mySelect+`/1`;
            }

        $scope.search = function(){
            promesasService.ajaxSearch('post',$scope.rppActual,$scope.paginaActual,$scope.word)
            .then(function (response) {
                if (response.data.status != 200) {
                    $scope.fallo = true;
                    $scope.falloMensaje = response.data.message;
                  
                } else {
                    $scope.fallo = false;
                    $scope.hecho=true;
                    $scope.pagina = response.data.message;
                    
                }
            }, function (error) {
                $scope.hecho = true;
                $scope.fallo = true;
                $scope.falloMensaje = error.message + " " + error.stack;
            });
        }
        promesasService.ajaxGetCount('post')
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
        
       

    }]
)