miModulo.config(['$routeProvider',
    function ($routeProvider) {
        //---------Producto-----------------
        $routeProvider.when('/producto/plist/:rpp/:page', {
            templateUrl: 'app/producto/plist/plist.html', controller: 'productoPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/producto/plist/:rpp/:page/:colOrder?/:order?', {
            templateUrl: 'app/producto/plist/plist.html', controller: 'productoPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/producto/plist/:rpp/:page/:filter', {
            templateUrl: 'app/producto/plist/plist.html', controller: 'productoPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/producto/remove/:id', {
            templateUrl: 'app/producto/remove/remove.html', controller: 'productoRemoveController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/producto/view/:id', {
            templateUrl: 'app/producto/view/view.html', controller: 'productoViewController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/producto/edit/:id', {
            templateUrl: 'app/producto/edit/edit.html', controller: 'productoEditController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/producto/new', {
            templateUrl: 'app/producto/new/new.html', controller: 'productoNewController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/producto/fill', {
            templateUrl: 'app/producto/fill/fill.html', controller: 'productoFillController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        //-------usuario------------------------
        $routeProvider.when('/usuario/plist/:rpp/:page', {
            templateUrl: 'app/usuario/plist/plist.html', controller: 'usuarioPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/usuario/plist/:rpp/:page/:colOrder?/:order?', {
            templateUrl: 'app/usuario/plist/plist.html', controller: 'usuarioPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/usuario/plist/:rpp/:page/:filter', {
            templateUrl: 'app/usuario/plist/plist.html', controller: 'usuarioPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/usuario/remove/:id', {
            templateUrl: 'app/usuario/remove/remove.html', controller: 'usuarioRemoveController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/usuario/view/:id', {
            templateUrl: 'app/usuario/view/view.html', controller: 'usuarioViewController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/usuario/edit/:id', {
            templateUrl: 'app/usuario/edit/edit.html', controller: 'usuarioEditController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/usuario/new', {
            templateUrl: 'app/usuario/new/new.html', controller: 'usuarioNewController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/usuario/fill', {
            templateUrl: 'app/usuario/fill/fill.html', controller: 'usuarioFillController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        //-------factura------------------------
        $routeProvider.when('/factura/plist/:rpp/:page', {
            templateUrl: 'app/factura/plist/plist.html', controller: 'facturaPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/factura/plist/:rpp/:page/:colOrder?/:order?', {
            templateUrl: 'app/factura/plist/plist.html', controller: 'facturaPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/factura/plist/:rpp/:page/:filter', {
            templateUrl: 'app/factura/plist/plist.html', controller: 'facturaPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/factura/remove/:id', {
            templateUrl: 'app/factura/remove/remove.html', controller: 'facturaRemoveController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/factura/view/:id', {
            templateUrl: 'app/factura/view/view.html', controller: 'facturaViewController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/factura/edit/:id', {
            templateUrl: 'app/factura/edit/edit.html', controller: 'facturaEditController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/factura/new', {
            templateUrl: 'app/factura/new/new.html', controller: 'facturaNewController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/factura/fill', {
            templateUrl: 'app/factura/fill/fill.html', controller: 'facturaFillController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })

        //-------pedido------------------------
        $routeProvider.when('/pedido/plist/:rpp/:page', {
            templateUrl: 'app/pedido/plist/plist.html', controller: 'pedidoPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/pedido/plist/:rpp/:page/:colOrder?/:order?', {
            templateUrl: 'app/pedido/plist/plist.html', controller: 'pedidoPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/pedido/plist/:rpp/:page/:filter', {
            templateUrl: 'app/pedido/plist/plist.html', controller: 'pedidoPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/pedido/remove/:id', {
            templateUrl: 'app/pedido/remove/remove.html', controller: 'pedidoRemoveController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/pedido/view/:id', {
            templateUrl: 'app/pedido/view/view.html', controller: 'pedidoViewController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/pedido/edit/:id', {
            templateUrl: 'app/pedido/edit/edit.html', controller: 'pedidoEditController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/pedido/new', {
            templateUrl: 'app/pedido/new/new.html', controller: 'pedidoNewController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        //-------Carrito---------------------------
        $routeProvider.when('/carrito/plist/:rpp/:page', {
            templateUrl: 'app/carrito/plist/plist.html', controller: 'carritoPlistController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/carrito/remove/:id', {
            templateUrl: 'app/carrito/remove/remove.html', controller: 'carritoRemoveController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/carrito/empty/:rpp/:page', {
            templateUrl: 'app/carrito/empty/empty.html', controller: 'carritoEmptyController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/carrito/add/:id', {
            templateUrl: 'app/carrito/add/add.html', controller: 'carritoAddController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        //-------Home---------------------------
        $routeProvider.when('/home/:rpp/:page', {
            templateUrl: 'app/homeTemplate.html', controller: 'homeController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        //----------------------------------------------
        $routeProvider.when('/login', {
            templateUrl: 'app/usuario/login/login.html', controller: 'usuarioLoginController', css: 'app/usuario/login/login.css',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        $routeProvider.when('/logout', {
            templateUrl: 'app/usuario/logout/logout.html', controller: 'usuarioLogoutController',
            resolve: {
                auth: function (promesasService) {
                    return promesasService.ajaxCheck();
                }
            }
        })
        //----------------------------------------------

        $routeProvider.otherwise({
            redirectTo: '/home/10/1'
        })
    }])