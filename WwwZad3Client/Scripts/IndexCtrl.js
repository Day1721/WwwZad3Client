(function () {
    'use strict';

    angular
        .module('app')
        .controller('IndexCtrl', indexCtrl);

    indexCtrl.$inject = ['$scope', 'localStorageService', '$window', '$http', '$location'];

    function indexCtrl($scope, localStorageService, $window, $http, $location) {
        $scope.title = 'IndexCtrl';
        $scope.isLoading = true;

        $scope.data = localStorageService.get('home');

        $http.get(`${$scope.serverUrl}/api/home/`).then(
            successResponse => {
                localStorageService.set('home', successResponse.data);
                $scope.data = successResponse.data;
                $scope.isLoading = false;
            },
            errorResponse => {
                console.log(errorResponse);
                $window.alert('Ups, wystąpił błąd, spróbuj ponownie później.');
                $scope.isLoading = false;
            });

        

        const dataTable =
            [['Voivodeship', 'Nazwa']]
                .concat(voivodeships().map(elem => [elem, elem]));

        $scope.map = {
            data: dataTable,
            options: {
                region: 'PL',
                resolution: 'provinces',
                datalessRegionColor: 'transparent',
                backgroundColor: 'transparent'
            },
            type: 'GeoChart'
        };

        $scope.selectHandler = function (selection) {
            console.log(selection);
            const voivodeshipId = selection.row;
            $location.path(`/voivodeship/${voivodeships()[voivodeshipId].toUpperCase()}`);
            $location.replace();
        };


        function voivodeships() {
            return [
                'Dolnośląskie',
                'Kujawsko-pomorskie',
                'Lubelskie',
                'Lubuskie',
                'Łódzkie',
                'Małopolskie',
                'Mazowieckie',
                'Opolskie',
                'Podkarpackie',
                'Podlaskie',
                'Pomorskie',
                'Śląskie',
                'Świętokrzyskie',
                'Warmińsko-mazurskie',
                'Wielkopolskie',
                'Zachodniopomorskie'
            ];
        }
    }
})();
