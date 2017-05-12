(function () {
    'use strict';

    angular
        .module('app')
        .controller('SubpageCtrl', subpageCtrl);

    subpageCtrl.$inject =
        ['$scope', '$routeParams', 'localStorageService', '$http', '$route', '$window'];

    function subpageCtrl($scope, $routeParams, localStorageService, $http, $route, $window) {
        $scope.title = 'SubpageCtrl';
        $scope.isLoading = true;

        const who = $route.current.$$route.who;

        const key = `${who}-${$routeParams.id}`;

        $scope.data = localStorageService.get(key);

        $http.get(`${$scope.serverUrl}/api/${who}/${$routeParams.id}`).then(
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
