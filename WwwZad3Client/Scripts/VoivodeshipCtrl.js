(function () {
    'use strict';

    angular
        .module('app')
        .controller('VoivodeshipCtrl', voivodeshipCtrl);

    voivodeshipCtrl.$inject = ['$scope', '$routeParams', '$rootScope', 'localStorageService', '$http'];

    function voivodeshipCtrl($scope, $routeParams, $rootScope, localStorageService, $http) {
        $scope.title = 'VoivodeshipCtrl';
        $scope.isLoading = true;

        const key = `voivodeship-${$routeParams.name}`;

        $scope.data = localStorageService.get(key);

        $http.get(`${$rootScope.serverUrl}/api/voivodeship/${$routeParams.name}`).then(
            successResponse => {
                localStorageService.set(key, successResponse.data);
                $scope.data = successResponse.data;
                $scope.isLoading = false;
            },
            errorResponse => {
                $window.alert('Ups, wystąpił błąd, spróbuj ponownie później.');
                $scope.isLoading = false;
            });
    }
})();
