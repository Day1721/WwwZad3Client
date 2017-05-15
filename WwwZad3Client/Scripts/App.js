(function () {
    'use strict';

    const submodules = ['ngRoute', 'ngCookies', 'LocalStorageModule', 'googlechart'];

    angular
        .module('app', submodules)
        .config(configFunc)
        .run(runFunc);

    runFunc.$inject = ['$rootScope', '$cookies'];

    function runFunc($rootScope, $cookies) {
        $rootScope.serverUrl = 'http://localhost:8001'; //here server url can be changed
        $rootScope.loginPath = '/Views/LoginPartial.html';

        $rootScope.username = $cookies.get('username');
        $rootScope.isLogged = $rootScope.username !== undefined;
    }

    configFunc.$inject = ['$routeProvider', '$locationProvider',
        '$httpProvider', 'localStorageServiceProvider'];

    function configFunc($routeProvider, $locationProvider, $httpProvider, localStorageServiceProvider) {
        $locationProvider.hashPrefix('');

        localStorageServiceProvider
            .setPrefix('Election2000')
            .setNotify(true, true);

        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.interceptors.push(function ($cookies) {
            return {
                'request': function (config) {
                    config.headers['X-CSRFToken'] = $cookies.get('csrftoken');
                    return config;
                }
            };
        });

        $routeProvider
            .when('/',{
                templateUrl: '/Views/Index.html',
                controller: 'IndexCtrl'
            })
            .when('/voivodeship/:id', {
                templateUrl: '/Views/Subpage.html',
                controller: 'SubpageCtrl',
                who: 'voivodeship'
            })
            .when('/district/:id', {
                templateUrl: '/Views/Subpage.html',
                controller: 'SubpageCtrl',
                who: 'district'
            })
            .when('/commune/:id', {
                templateUrl: '/Views/Subpage.html',
                controller: 'SubpageCtrl',
                who: 'commune'
            })
            .when('/ambit-edit/:id', {
                templateUrl: '/Views/Edit.html',
                controller: 'EditCtrl'
            })
            .when('/search', {
                templateUrl: '/Views/Search.html',
                controller: 'SearchCtrl'
            })
            .when('/login', {
                templateUrl: '/Views/Login.html',
                controller: 'LoginCtrl'
            })
            .when('/logout', {
                template: '<h3>Logging out...</h3>',
                controller: 'LogoutCtrl'
            })
            .when('/ambit/:id', {
                templateUrl: '/Views/AmbitEdit.html',
                controller: 'AmbitEditCtrl'
            })
            .otherwise({
                templateUrl: '/Views/NotFound.html'
            });
    }
})();