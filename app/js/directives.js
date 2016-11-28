define(function (require) {
    //创建指令模块
    var directives = angular.module('guthub.directives', []);
    //创建指令,区别于创建服务
    directives.directive('butterbar', function ($rootScope) {
        return {
            link: function (scope, element, attrs) {
                element.addClass('hide');
                //路由改变之前
                $rootScope.$on('routeChangeStart', function () {
                   element.remove('hide');
                });
                 //路由改变之后
                $rootScope.$on('routeChangeSuccess', function () {
                    element.addClass('hide');
                })
            }
        }
    });

    directives.directive('focus', function ($rootScope) {
        return {
            link: function (scope, element, attrs) {
                element[0].focus();
            }
        }
    });


});