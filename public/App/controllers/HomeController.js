/**
 * Created by DMehta on 1/10/2017.
 */

(function(){
    var app=angular.module('myApp');
    app.controller('HomeController',['$rootScope','$scope','ToasterService',function($rootScope,$scope,ToasterService){
        $rootScope.Title="Home";

        $scope.open=function(){
            ToasterService.notify('success');
        }
    }]);
})();



