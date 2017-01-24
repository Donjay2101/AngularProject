/**
 * Created by DMehta on 1/10/2017.
 */


var app=angular.module('myApp',['ui.router','ngAnimate','toaster','ui.grid','ui.grid.pagination','ngDialog','ngResource','ngRoute']);

app.config(['$provide',function($provide){
    $provide.decorator('$exceptionHandler',['$delegate',function($delegate){
        return function(exception,cause){
            $delegate(exception,cause);
            alert(exception.message);
        }
    }]) ;
}]);

app.config(['$urlRouterProvider','$locationProvider','ngDialogProvider','$routeProvider','$stateProvider',function($urlRouterProvider,$locationProvider,ngDialogProvider,$routeProvider,$stateProvider){

    $urlRouterProvider.otherwise('/home');


    $locationProvider.hashPrefix('');


  /*  $routeProvider.when('/',{templateUrl:'/App/partials/home.html',controller:'HomeController'})
    .when('/about',{templateUrl:'/App/partials/about.html',controller:'AboutController'})
    .when('/contact',{templateUrl:'/App/partials/contact.html',controller:'ContactController'})
    .when('/employee',{templateUrl:'/App/Views/employee/index.html',controller:'EmployeeController'})*/

    //this line is to make the url # free called it history API Url ,
    // right now it will use hashbang url to use this we need to rewrite the url in server side as well
    //so use rewrite Module and uncomment this and enjoy "#" free Urls.
   /* $locationProvider.html5Mode(true);*/
    $stateProvider.
    state('home',{
        url:'/home',
        templateUrl:'App/partials/home.html',
        controller:'HomeController'
    }).
    state('about',{
        url:'/about',
        templateUrl:'./App/partials/about.html',
        controller:'AboutController'
    }).
    state('contact',{
        url:'/contact',
        templateUrl:'App/partials/contact.html',
        controller:'AboutController'
    }).
    state('employee',{
        url:'/employee',
        templateUrl:'App/Views/Employee/index.html',
        controller:'EmployeeController'
    }).
    state('department',{
        url:'/department',
        templateUrl:'App/Views/Department/index.html',
        controller:'DepartmentController'
    });

    ngDialogProvider.setDefaults({
        className: 'ngdialog-theme-default',
        plain: false,
        cache:false,
        showClose: true,
        closeByDocument: false,
        closeByEscape: true,
        appendTo: false,
        preCloseCallback: function () {
            console.log('default pre-close callback');
        }
    });
}]);

/*
app.config('$provide',function($provide){
    $provide.decorator('$exceptionHandler',['$delegate',function(){
        return function(exception,cause){
            $sceDelegate(exception);
            alert(exception.message);
        }
    }]) ;
});

/!*app.config(["$locationProvider", function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);*!/

app.config(function($urlRouterProvider,$stateProvider){

    $stateProvider
        .state('home',{
            url:'/home',
            templateUrl:'/partials/home.html',
            controller: 'HomeController'
        })
        .state('about',{
           url:'/about',
            templateUrl:'/partials/about.html',
            controller: 'HomeController'
        });
    $urlRouterProvider.otherwise('home');
});*/
/*
app.config(['$stateProvider','$urlRouterProvider','$routeProvider','$locationProvider',function($stateProvider,$urlRouterProvider,$routeProvider,$locationProvider){


    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home',{
            url:'/home',
            templateUrl:'./partials/home.html',
            controller:'HomeController'
        })
        .state('about',{
               url:'/about',
                templateUrl:'./partials/about.html',
                controller:'HomeController'
    });
    $locationProvider.html5Mode(
        {
            enabled: true,
            requireBase: false
        });
/!*


        $routeProvider
            .when('/',{templateUrl:'partials/home.html',controller:HomeController})
            .when('/about',{templateUrl:'partials/about.html',
            controller:HomeController});
            *!/

          // $locationProvider.html5Mode(true);

}]);*/
