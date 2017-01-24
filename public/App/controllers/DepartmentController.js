/**
 * Created by DMehta on 1/15/2017.
 */
(function(){
    "use strict";

    var app=angular.module('myApp');

    app.controller('DepartmentController',['$scope','ngDialog','DepartmentService',function($scope,ngDialog,DepartmentService){

        $scope.gridOptions={
            enablePagination:true,
            enablePaginationControls:true,
            paginationPageSizes:[10,25,50,75],
            paginationPageSize:10,
            data:DepartmentService.getDepartments(),
            columnDefs:[
                {field:'_id',displayName:'Action',cellTemplate:'<button  class="btn-link" ng-click="grid.appScope.remove(row.entity._id)">delete</button>'},
                {field:'_id',displayName:'ID',cellTemplate:'<button class="btn-link" ng-click="grid.appScope.open(row.entity._id)">{{row.entity._id}}</button>'},
                {name:'Name'}
            ]};

        //callback method to initialize data in grid..
        var initializeDepartments=function(departments){
            if(departments!=null ||departments!=undefined){
                $scope.gridOptions.data=departments;
            }
            else{
                $scope.gridOptions.data=DepartmentService.getDepartments();
            }
        }

        //assign for the first time..
        //initializeDepartments();
        //$scope.departments=DepartmentService.getDepartments();
        $scope.isEdit=false;

        $scope.open=function(ID){
            if(ID==0){
                $scope.formTitle="Add";
                $scope.isEdit=false;
                $scope.department=DepartmentService.createDepartment();
            }
            else{
                $scope.formTitle="Edit";
                $scope.isEdit=true;
                DepartmentService.getDepartmentById(ID,function(department){
                    var dep={};
                    angular.copy(department,dep);
                    $scope.department=dep;
                });
            }
            openDialog();
        }

        var openDialog=function(){
            ngDialog.open({
                template: 'App/Views/Department/Edit.html',
                className: 'ngdialog-theme-default',
                cache:false,
                scope:$scope,
                height:530,
                width:800
            });
        }


        $scope.save=function(){
            if($scope.isEdit){
                DepartmentService.update($scope.department,initializeDepartments);
            }
            else{
                DepartmentService.saveDepartment($scope.department,initializeDepartments);
            }
        }

        $scope.remove=function(ID){
            if(ID!=null)
            {
                $scope.message="you are about to delete a property.are you sure?";
                var confirmdialog=ngDialog.openConfirm({
                    template:'app/views/confirmDialog.html',
                    scope:$scope,
                    controllerAs:'department',
                }).then(function(){
                    DepartmentService.remove(ID,initializeDepartments);
                },function(reason){
                    //at the time of cancellation
                });;


            }

        }



    }]);

})();
