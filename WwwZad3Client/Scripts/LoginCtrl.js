(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', loginCtrl);

    loginCtrl.$inject = ['$scope', '$cookies', '$http', '$rootScope', '$window'];

    function loginCtrl($scope, $cookies, $http, $rootScope, $window) {
        $scope.title = 'LoginCtrl';

        $rootScope.isLogged = false;
        $rootScope.username = '';

        $cookies.remove('token');
        $cookies.remove('username');

        $scope.login = function() {
            $http({
                method: 'POST',
                url: `${$rootScope.serverUrl}/rest-auth/login/`,
                data: {
                    'username': $scope.username,
                    'password': $scope.password
                }
            }).then(
                successResponse => {
                    $cookies.put('token', successResponse.data.key);
                    $cookies.put('username', $scope.username);
                    $rootScope.username = $scope.username;
                    $rootScope.isLogged = true;

                    $window.history.back();
                },
                errorResponse => {
                    if (errorResponse.status === 400)
                        alert('Niepoprawne dane logowania, proszę spróbować ponownie');
                    else if (errorResponse.status === 500)
                        alert('Serwer jest nieosiągalny, proszę spróbować później');
                });
        };
    }
})();
