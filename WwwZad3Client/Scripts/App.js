(function () {
    'use strict';

    const app = angular.module('App', ['ngRoute']);

    app.config(configFunc);
    app.run(runFunc);

    runFunc.$inject = ['$rootScope']
})();