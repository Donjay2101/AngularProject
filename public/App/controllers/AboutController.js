/**
 * Created by DMehta on 1/10/2017.
 */

(function(){
    var app=angular.module('myApp');
    app.controller('AboutController',['$rootScope','$scope',function($rootScope,$scope){
        $rootScope.Title="About";
    }]);
})();



