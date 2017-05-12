(function () {
    'use strict';

    angular
        .module('app')
        .controller('SearchCtrl', searchCtrl);

    searchCtrl.$inject = ['$scope', '$http'];

    function searchCtrl($scope, $http) {
        $scope.title = 'SearchCtrl';

        $scope.search = function() {
            $http({
                method: 'POST',
                url: `${$scope.serverUrl}/api/search/`,
                data: {
                    value: $scope.communeName
                }
            }).then(
                successResponse => {
                    $scope.list = successResponse.data;
                },
                errorResponse => {
                    //TODO WTFISWH
                });
        };
    }
})();
