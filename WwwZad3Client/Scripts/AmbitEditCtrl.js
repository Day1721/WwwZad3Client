(function () {
    'use strict';

    angular
        .module('app')
        .controller('AmbitEditCtrl', ambitEditCtrl);

    ambitEditCtrl.$inject = ['$scope', '$routeParams', '$location', '$http'];

    function ambitEditCtrl($scope, $routeParams, $location, $http) {
        if (!$scope.isLogged) {
            $location.path('/login');
            $location.replace();
        }

        $scope.title = 'AmbitEditCtrl';
        $scope.result = {};

        const url = `${$scope.serverUrl}/api/ambit/${$routeParams.id}`;

        $http.get(url).then(
            successResponse => {
                $scope.data = successResponse.data;
                $scope.data.forEach(pair => {
                    $scope.result[pair.candidate] = pair.result;
                });
            },
            errorResponse => {
                $location.path('/login');
                $location.replace();
            });

        $scope.push = function() {
            $http({
                method: 'POST',
                url: url,
                data: $scope.result
            }).then(
                successResponse => {
                    $window.history.back();
/*
                    $location.path('/');
                    $location.replace();
*/
                },
                errorResponse => {
                    if (errorResponse.status === 400) {
                        alert('Część danych jes niepoprawna.');
                    }
                    else alert('Wystąpił błąd, spróbuj ponownie później.');
                });
        };
    }
})();
