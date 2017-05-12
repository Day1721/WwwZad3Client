﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('LogoutCtrl', logoutCtrl);

    logoutCtrl.$inject = ['$scope', '$rootScope', '$cookies', '$location'];

    function logoutCtrl($scope, $rootScope, $cookies, $location) {
        $scope.title = 'LogoutCtrl';

        $rootScope.isLogged = false;
        $rootScope.username = '';

        $cookies.remove('token');
        $cookies.remove('username');

        $location.path('/');
        $location.replace();
    }
})();
