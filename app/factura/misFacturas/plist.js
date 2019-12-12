var miControlador = miModulo.controller(
    "misFacturasController",
    //-----------------------------lISTA DE FACTURAS---------------------------------
    function ($scope, $routeParams, $http, promesasService, $window, auth,$location) {
        $scope.object = 'factura';
        if (auth.data.status != 200) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message.login;
            $scope.authLevel =  auth.data.message.tipo_usuario_obj;
            $scope.client = auth.data.message.tipo_usuario_obj["descripcion"];
        }  
          
        $scope.controller = "misFacturasController";
        $scope.paginaActual = parseInt($routeParams.page);
        $scope.rppActual = parseInt($routeParams.rpp);
        $scope.rppS = [10, 50, 100];
        // $scope.user_id = $routeParams.id;
        // $scope.filter = $routeParams.filter;
        $scope.colOrder = $routeParams.colOrder;
        $scope.order = $routeParams.order;

        if ( $scope.colOrder == null && $scope.order == null && $scope.user_id == null && $scope.filter == null) {
            request = "http://localhost:8081/trolleyes/json?ob=" + $scope.object + "&op=getpage&page="+ $scope.paginaActual +"&rpp="+ $scope.rppActual;
        } else if($scope.user_id != null &&  $scope.filter != null) {
            request = "http://localhost:8081/trolleyes/json?ob=" + $scope.object + "&op=getpage&page="+ $scope.paginaActual +"&rpp="+ $scope.rppActual +"&filter="+ $scope.filter + "&id=" + $scope.user_id;
        } else if($scope.user_id != null &&  $scope.filter != null && $scope.colOrder != null && $scope.order != null) {
            request = "http://localhost:8081/trolleyes/json?ob=" + $scope.object + "&op=getpage&page="+ $scope.paginaActual +"&rpp="+ $scope.rppActual +
            "&filter="+ $scope.filter + "&id=" + $scope.user_id + "&order=" + $scope.colOrder + "&direccion="+$scope.order;
        } else {
            request = "http://localhost:8081/trolleyes/json?ob=" + $scope.object + "&op=getpage&page="+ $scope.paginaActual +"&rpp="+ $scope.rppActual +
            "&order=" + $scope.colOrder + "&direccion="+$scope.order;
        }

        $http({
            method: "GET",
            withCredentials: true,
            url: request
        }).then(function (response) {
            $scope.status = response.data.status;
            $scope.pagina = response.data.message;        
        });

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

        $scope.search = function () {
            promesasService.ajaxSearch($scope.object, $scope.rppActual, $scope.paginaActual, $scope.word)
                .then(function (response) {
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.falloMensaje = response.data.message;

                    } else {
                        $scope.fallo = false;
                        $scope.hecho = true;
                        $scope.pagina = response.data.message;

                    }
                }, function (error) {
                    $scope.hecho = true;
                    $scope.fallo = true;
                    $scope.falloMensaje = error.message + " " + error.stack;
                });
        }
        if($scope.user_id == null && $scope.filter == null){
            promesasService.ajaxGetCount($scope.object)
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
                if ($scope.paginaActual > $scope.numPaginas) {
                    $window.location.href = `./${$scope.object}/${$scope.rppActual}/${$scope.numPaginas}`;
                } else if ($routeParams.page < 1) {
                    $window.location.href = `./${$scope.object}/${$scope.rppActual}/1`;
                }
            })
        } else {
            promesasService.ajaxGetCount($scope.object,$scope.user_id, $scope.filter )
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
                if ($scope.paginaActual > $scope.numPaginas) {
                    $window.location.href = `./${$scope.object}/${$scope.rppActual}/${$scope.numPaginas}/${$scope.user_id}/${$scope.filter}`;
                } else if ($routeParams.page < 1) {
                    $window.location.href = `./${$scope.object}/${$scope.rppActual}/1/${$scope.user_id}/${$scope.filter}`;
                }
            })
        }
        
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

        /* PDFs */
        $scope.download = function (factura) {
            promesasService.ajaxGetPage("compra", 200, 1, null, null, factura.id, "factura").then((response) => {
                let nombre_completo = `${factura.usuario_obj.nombre} ${factura.usuario_obj.apellido1} ${factura.usuario_obj.apellido2}`;
                let compras = response.data.message;
                const doc = new jsPDF();
                const logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAARK0lEQVRo3sWZ2XMbV3bGf/d2owEQIACCCyiS4r7IJLUv1uaybGokz0SxU65KXlKpSt6m8jKvyUP+ialMpbK8ZpIHe+bBZUleZM3IUizZWihql0WRIgkSBEmQBLF39715aIiiNmuUmolP1S02UV3n3u8s3znntuBPISbQAmwCLiEx6aWGg0T5MwwiOFxC8wlJvvtjbPXa8l71r1FVUATGTZiJQPk/gA+pZY4O8nTSQiMDtDNAH5vpZxGTM2SYJ/Yy/XV1oDWYJgQCIAQo5S0AKcFxoFx+JYB6wA+4gF39LcMcCAfCAQjVAWVwCuBWwOIfibKbNqIcwuIABj30Uc+bBDlAgIfY3EWSp5V5fIAD6KesakKlQth1qalUkIBwXVAKIQQYBihFCaj8nzxgeUY45IO3JIQFpIBFAW/oMF3sIco+WuihiQg1hPERRRIDVvGxhQg2rYzTDMwDlWe2MICDwFtALeATAikEJuADlBBcA+69BMAgXgCfMYB4VWEJyAq2KMFdox76NsHRPVBfCyuPFJnfleh6WKI5K7AKrVj2rur2TztVsJ8wZYYYZTcVfk/2KQDm2hrxeJzdiQQndu4kGo97AB5HreOgxsbounyZhy8BsCbAXwMHN0FgCAiAuwj6e0gvlTBCu3CbhqD1Q2iMQudDhVtfhK/XkNcLGEkf2OEXRqVgDyHus4MISQpcI8vyhjcCwOZ4nN7+frqPH6emvR2hlOd2KRH5PHp5me1XrtD7EgAJAxiBnhPw3hYIBSG9CN9dhfk7LmZ+F27fNqiPgxUAesCo0xAuwkQGkhVAvEB1ANiEJESCMB1Igs9GqBAkenqoa23FPz8P9+7hfv89lEoYWiMcB3dqilXTZMGsblMLxKrPJow3wqHj0Pw+RJsgIqBShsAmk0CPRCwJ6A1CYMHLCbSXja4qoworaHsJgwzGcwAEHh9IwsRpI08/sArkAAVEgLDfj69SQY2OoqanGb9xg9u5HCXXRQuBa1mkAgEyjwF0CMG+arKEwO6A4EGtow1ejq0BayaU201ERKHzDyARAmR1OaCnwbnkUJlZRtv38FNfBaCfAyBYwoefVoqMACFg2lNDxHFomJ3FWl1FpVKQzXKpVOKXPh/JQMBjLSFQWqMFIEyTE8DPhSAuJZaUZhg2J7RORCGA40gcxwbSjsGCHWLFbUVZDZ7xEVXTrYKTFqj5GjQtmOsAnhUNZIBFiiyTBNIbPOADwrEYmyMRmsplcBz+eWmJf+ruJpfNVu0gvJwwq+pqTJPN8Th9ra0EOjoc5fNNCK0nAYHjaCoVjRdeXu1QeMVGbjhXTGB2aNCuVxRch5fLZqCdoBb0ak3vxkIFXqHKZmFuDspldG0tlYcPn1djArguy6EQE4ODNB87RuDDD5G1tU98r7VGa15LXud9xwHb9lb1PDx6BOfOwa9/DZkMsnrWZ+uFB0BrtGHghkLo+npoawO/f6O//39Fa6+dSKfBskApAkAYrxapje8+jgC/YRCxLHw+3xNL/FgihAegqQl8PsAj3wg8n1OPAYQNg0Q0SjAW85LjxxbLglDI63vwyCLEC3q3x0cNak08EsFXV/fjA9DaywPbXk9sxQuavo0ATK0JWBZGMOi58MeWhQWYngbbxgUKeMXoOV57DMAVgkqphC4UXo9B/hSiNdy4ARcu4BaLZIVgwTDI4PX1T4kJIAQLts3tsTECmzYRa2+HzZv/+KGUzcLKirdyOSgUoFTyBhPX9ZgvGPT2/ewz+OYbirkc3wG3fD6vjXgZgIlcjjMXLxIRgq2bN2Pt2oVoavKUWpaXTK8KLaW8gzjOk2Xb3gGzWUgmYWYGPTuLTqUQmQyiUIBKxdMdDEJNjfd89Sr2nTvMaM1nWjNaKj1Nn49FAEhJWEq6tOZv6ur4WXs7W4aHMXbvhu3boa8Pmptf7ZF83uPu2VlvTU/D5CRqZga5uAjFItg2tm1TyGbxuy7+eBza2xGJhOeNVMorYgsLPMzlOAP8K3AHb3J9sQeAnNbck5KTi4usLS6yN52me2aG5ps3qW9rg0QCamu9GdXnezKnViqehctlLzQymfVVTKdZmZpiIZlkuVTCARrxBqRQeztieBiGh6Gz09N37hxMT1OYnWW6XOYMcBL4Hi+JXyjrQWGaCCEwbJsGIRgKBDgsJQe0ZkAIYj4fRKOoaBRqahCGAbaNzmZhbQ1RKCAqFYTWOFJSkJKU1jwql5lwHGaEwPH52CEle6JRBk6coObDDz0Paw1XrqB/+Uucc+d4oDWfKcXHrsslXkKfLwKAEGDbSLyq1wQk8Cb7ZqBZSmLBIGGfD0tKpOvilsvkSyWKVSstA0vVlcVjjWZgl2GwNxqlddcuGt97j7rDhzF7erywOXMGPvoIe3SUh7OzfC4l/6k1d12X1VcRwwvTUognYSIlFIvE8IbkOF5PYuGVdQfIVw+fAxY3HLwF6AP2NjYy0t7OwYEB/G+/jT5+HBmJwMwMnD8Pp06R++ILxkslzloWp4GzrkvFdXml/OCtRLm8/pitHlRuAC2qrl13r2EglSIM9ASD/FRKRoSgZ3iYuhMn8I2MQFeXV3tu3IDPP0d//DH2xAR3HYeTUvJbrbkrBH9wN/ZCAFp7yblBFDxPY4/vaKSESoVGpdirNXuA7XV1DGzdStuePUR374atW2HTJo+dvvwSLlyAGzdYnZjg94UCXwBfC8E4XsfJH2L9l4bQD4mU6xdPJt4s3YgXXv3RKG/FYuxraKBvaAj51luod95BNjR4DPXwIVy6hPrsM9Zu3WJ+YYFR4LfA/xgGU0q9fhfwOhdb4vFSCgkkTJOtpsmI47DPsuhpayN4+DD+48cRg4PQ2Ig0DLh/H86eRZ0+jb5zh9VKhe/LZX4LnMabhXOuu27M14Lwgx6QUmCaBpWKAx4r9RkG3YZBq23TFg7T0d1NT3c3m3t7CW/ZAkND0N3tFbX79+HyZbh9GyYmWLt7l8uZDJeAq1IyqhTzVS/WVLfMASvBYLDoOA72HzCYrHtAiCcXqQWvbIS01hGl3BjQAHQAe1yXHVrTozWNgD8eR+/fDyMj3gDiOPDgAYyNoS9epHz2LIvJJBkpmXRdTgPfAUtKUQscBtqqIBSwAqRKpdKMEGKh+n/ptUKoUEBULTIkhDgspXzHMHSn66owEBKCoNb4AZ9SUCgYYm1NMzuruHIFPTqKvnIFvbREpVRianmZLx2Hr6XkhlKsSim7hBB/p5R6U2vdjUfJUgiB1toVQuR8Pt+U1vq0UupL4OEPgRBAT9UCTVVL1z+2uM9nDkSjkcHOzs5IX98AiUQzoVANWmtWV1dJpaaZn79NTc0ssViBdBo1NUVmYoKHWvMIrw24AdwHCkLInYYh3woGg/v7+/v7e3t7Q4lEglAohNaabDbL7Ows4+PjazMzM2PLy8uXgAvAo2p4mUAZr97kAVsIwd8aBi1+P4PRKN2uy+ZsVjQpZVr19fUMDQ1z5Mg7jIyM0N/fTywWw3EcUqkUo6OjnD59im++ucj4+LguFPLKdd3papiMATN4N8lSCJkwDOPPY7G6Hf39/dZPfvITc2RkRAwMDBCPx3Fdl4WFBa5fv66/+uorfe7cOXnv3r2lQiF/3nWdW4bBglIElCIDXNea74GMYRj8QyjEzpYW9hw4wOa2NmJra5YvEmlk3779/Pznf8+xY8fo6OigtrbWa5gMg1AoRHNzM1u3biMQqCGVSolcLidsu+w3TRqlZIuU7JWSQ1JyyDTN/YFAsPvgwYOhX/ziF8axY8dEV1cXkUgEKSWGYRAMBkkkEmJwcFCEw2FKpZJ/cXEp4TjF/nCYHUKwT2s6qlSbAuZNKWlqbKR5YIDmbdtgcRGuXYPh4Z188MFfcPDgQerq6p5PHtOkrq6Ouro6jh+3yefX+K//+m/h96/U7NlDTWurN5SXSnD1Kty962Pbtp0cO3aMQ4cOvVRnLBYjFouhlMJxHGNyciIeDmfivb0ay4LlZeru3iW3ssJlYMwUwuv1BwdRiQQykxHYtsWOHW9y/PhPqa2t5VXS19fH+++/z4ULl/D77/GznynefVfT2grz8/CrX8GjRwGOHBlhZGSEUCj0Sp29vb28/fbbfPHFaXK5aXbvLtDRoXn4kPCjR7yxskICMKRSDPj9NMViiJkZSCb9NDe30d6+mXg8jmm+utZZlkVzczNdXe2EQg1MTkoWFryxcWLCG3JqamoYGOijs7MTy7JeqVNKSV1dnKGhrQSDXUxO+rAsiEYxbZvGKunETCHILy7iv3YNkcnA6qpFLNZILBbFMJ6/m83lciSTSVKpFEopurq6SCQSWJZFU1MjWtdx8eIy+bxLc7MH4NYtgd8fpL6+jpqaGiqVClNTUywsLOD3+2lubqalpeWFhmlpaeXmzUZu3x7H74dcDlEoUAu0A1tMw+DM/fv03b/PTqUIRCKGb/t2yzQM+cIqPTc3xyeffMK5c+dwHIcPPviAo0ePEovFsCyLfN5SDx4I+/JlbClRrouhlPD19JiWlALXdZmbm+PUqVN8++23xGIx3n33Xd577z0CgYD3Fe8xxwuBaZrYtqEmJ3EePKCiNU6lggsEgW5TCP69WCQKtAK7CgX7zaWlzLZisfjUByKtNUopJicnOXXqFNevX1/3SCgU4vjx42SzWZaXV9Olkh6tTlMpoBP0oWKxuL9SqZjJZJJPP/2UkydPMjY2RjgcxjRN2tvb6e/vfyrnXNdheXlZ53KFFdvmTrnMp8ADvH4pCSyYWnPVNMFxkMCjSqVkzc+n3pidnSWbzRIOh5Ebpvl8Pk8ymWRpaQnLskilUqRSKRYWFkgmkywvZxaFUGeBT4EpoBd0qFAo7J2enjZra2tJJpPMzc0xOzuLaZokk0nW1tZwN/TQjwvb+Pi4SKfn01q7F4GP8YriE+bamDfApOu648vLy/bdu3f17du3xdDQEOFweJ3/6+vr6e7uJpfLUVNTw4EDB4hEIty4cYPJyUmVz+czWuvrwBxetXwATNq2nb9y5YplGIbo7Oykp6eHZDKJlHI9B4JB73OZUop8Ps/ExARjY2Nqamoq6TjOdbxq/JQYjrN+/6iBihAiDPSVSqVosVgMtre309DQsJ7QoVCIzs5ODh48yJEjR9i1axfz8/OcPHnSvnXr1uza2trXVeunefKFPCqEqF9dXW1wXTe0bds2BgcH2b9/P0ePHuXIkSMMDAysAyiVSnz11Vd89NFHzujoaC6bzZ7FmxtSPHO9+CzNOKZpIqW00ul0bGVlpT4YDPq01sJ1XSqVCj6fj9bWVtra2giHw2QyGc6fP++eOnUqnclkzkkpPzcM45pSqrxBr+s4TmVpaanJdd2GxsZGf2trK4ODgwwPD7Np0yZc12VlZYXp6WmuXbvGb37zG/Xll18ura6uXlFKnTRN8/wzOr1Ef/YH0zQtvAnrr/1+/19GIpHeN954I7R37176+/vF474lmUzqmzdv8u2336rp6enFfD5/1XXdfwN+B2Qdx9k4glpAkxDirwKBwPuxWGxvf39/cPv27WpoaEg2NDQIpRTpdJqbN2/qixcvOslkMp/L5a46jvMvjuOcF0KkXddVrwRgGAau60qfzzds2/Y+YHc8Hh9sb2/vjMfj9YFAIKC1VrlcLrewsDA/Pj7+vW3bY4ZhXBZCXJJSzsViMdLp9LOGMZRSA0qpXcD++vr6wZaWls7GxsaGQCAQVErpYrFYSKfT8w8ePHhg2/ZNwzC+U0pd0FqneMmk9kKuNwwDKSW2bceAw4ZhvCOEOKS17tZaRwHXMIy0EOKW4zhfKaV+B4yapuk6zou/7D1mMqVUHNhpmuZRIcRbWutepVRMa61M01wC7jiO83ut9efAKPzwDcX/At0GogE2wW3mAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTEyLTEwVDA5OjIwOjM2KzAwOjAwcMFqCwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0xMi0xMFQwOToyMDozNiswMDowMAGc0rcAAAAASUVORK5CYII=\n";
    
                function header(table_active) {
                    doc.setFillColor(240, 240, 240);
                    doc.rect(10, 10, 130, 34, 'F'); // Primera fila, caja izquierda
                    doc.rect(144, 10, 57, 16, 'F'); // Primera fila, caja derecha arriba
                    doc.rect(144, 28, 57, 16, 'F'); // Primera fila, caja derecha abajo
                    if (table_active) doc.rect(10, 48, 191, 14, 'F'); // Segunda fila, caja completa
                    /* Contenido primera fila, caja izquierda */
                    doc.addImage(logo, 'PNG', 12, 12, 30, 30); // Logo
                    doc.setFontSize(16);
                    doc.setFontType('bold');
                    doc.text('TrollEyes', 48, 20);
                    doc.setFontSize(12);
                    doc.setFontType('bolditalic');
                    doc.text('Lo que buscas al mejor precio', 48, 26);
                    doc.setFontType('normal');
                    doc.text('C/Paraiso fiscal, s/n. 46026 Valencia', 48, 32);
                    doc.text('NIF: 23454358V', 48, 38);
                    /* Contenido primera fila, caja derecha arriba */
                    doc.setFontSize(12);
                    doc.text(148, 17, `Nº de Factura: ${factura.id}`);
                    doc.text(148, 23, `Fecha: ${moment(new Date(factura.fecha)).format('MM/DD/YYYY')}`);
                    /* Contenido primera fila, caja derecha abajo */
                    doc.setFontSize(12);
                    doc.setFontType('bold');
                    doc.text(148, 34, 'Para:');
                    doc.setFontType('normal');
                    doc.text(148, 40, nombre_completo);
                    /* Contenido segunda fila, caja completa */
                    if (table_active) {
                        doc.setFontSize(11);
                        doc.setFontType('bold');
                        doc.text('Concepto', 14, 56);
                        doc.text('Precio', 88, 56);
                        doc.text('Unidades', 112, 56);
                        doc.text('Subtotal', 141, 56);
                        doc.text('IVA', 167, 56);
                        doc.text('Total', 182, 56);
                    }
                }
    
                function footer(p) {
                    /* Caja footer */
                    doc.setFillColor(240, 240, 240);
                    doc.rect(10, 274, 191, 14, 'F');
                    /* Contenido */
                    doc.setFontType('normal');
                    doc.text('TrollEyes', 14, 282);
                    doc.setFontType('bold');
                    doc.text(`Página ${p}`, 97, 282);
                    doc.setFontType('normal');
                    doc.text(moment().format('DD/MM/YYYY'), 177, 282);
                }
    
                let pos_rect = 62;
                let pos_text = 70;
                let page = 1;
                let compras_length = compras.length;
                let total = 0;
                let subtotal = 0;
                header(true);
                footer(page);
                for (let x = 0; x < compras_length; x++) {
                    if (x % 14 === 0 && x !== 0) {
                        doc.addPage();
                        header(true);
                        page++;
                        footer(page);
                        pos_rect = 62;
                        pos_text = 70;
                    }
                    /* Filas tabla */
                    x % 2 === 0 ? doc.setFillColor(250, 250, 250) : doc.setFillColor(245, 245, 245);
                    doc.rect(10, pos_rect, 191, 14, 'F');
                    pos_rect += 14;
    
                    /* Contenido tabla */
                    doc.setFontSize(10);
                    doc.setFontType('normal');
                    doc.text(String(compras[x].producto_obj.descripcion), 14, pos_text);
                    doc.text(String(compras[x].producto_obj.precio) + '€', 88, pos_text);
                    doc.text(String(compras[x].cantidad), 112, pos_text);
    
                    let item_subtotal = Math.round((compras[x].producto_obj.precio * compras[x].cantidad) * 100) / 100;
                    let item_total = Math.round(((1 + (factura.iva / 100)) * item_subtotal) * 100) / 100;
    
                    subtotal += item_subtotal;
                    total += item_total;
    
                    doc.text(String(item_subtotal) + '€', 141, pos_text);
                    doc.text(String(factura.iva) + '%', 167, pos_text);
                    doc.text(String(item_total) + '€', 182, pos_text);
    
                    pos_text += 14;
                    if (x + 1 === compras_length) {
                        if (compras_length > 10) {
                            doc.addPage();
                            header(false);
                            page++;
                            footer(page);
                            pos_rect = 37;
                            pos_text = 45;
                        }
                        doc.setFillColor(245, 245, 245);
                        doc.rect(compras_length > 10 ? 10 : 105, pos_rect + 18, compras_length > 10 ? 191 : 95.5, 14, 'F');
                        doc.setFillColor(250, 250, 250);
                        doc.rect(compras_length > 10 ? 10 : 105, pos_rect + 32, compras_length > 10 ? 191 : 95.5, 14, 'F');
                        doc.setFillColor(245, 245, 245);
                        doc.rect(compras_length > 10 ? 10 : 105, pos_rect + 46, compras_length > 10 ? 191 : 95.5, 14, 'F');
                        doc.setFontType('bold');
                        doc.text('Base imponible', 138, pos_text + 18);
                        doc.text('IVA 21%', 150, pos_text + 32);
                        doc.text('Total', 155, pos_text + 46);
                        doc.setFontType('normal');
                        doc.text(`${Math.round(subtotal * 100) / 100}€`, 175, pos_text + 18);
                        doc.text(`${Math.round((total - subtotal) * 100) / 100}€`, 175, pos_text + 32);
                        doc.text(`${Math.round(total * 100) / 100}€`, 175, pos_text + 46);
                    }
                }
                doc.save('test.pdf');
            });
        }
        
    }
)