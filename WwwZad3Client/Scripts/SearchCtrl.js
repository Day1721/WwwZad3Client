(function () {
    'use strict';

    angular
        .module('app')
        .controller('SearchCtrl', searchCtrl);

    searchCtrl.$inject = ['$scope', '$http'];

    function searchCtrl($scope, $http) {
        $scope.title = 'SearchCtrl';

        $scope.search = function () {
            if (!$scope.communeName) return;

            $scope.isLoading = true;
            $http({
                method: 'POST',
                url: `${$scope.serverUrl}/api/search/`,
                data: {
                    value: $scope.communeName
                }
            }).then(
                successResponse => {
                    $scope.list = successResponse.data;
                    console.log($scope.list.length);
                    $scope.isLoading = false;
                },
                errorResponse => {
                    console.log(errorResponse);
                    alert('Ups, wystąpił błąd, spróbuj ponownie później.');
                    $scope.isLoading = false;
                });
        };
    }
})();
