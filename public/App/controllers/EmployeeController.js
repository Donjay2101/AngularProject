/**
 * Created by DMehta on 1/12/2017.
 */

(function(){
    "ues strict";

    var app=angular.module('myApp');

    app.controller('EmployeeController',['$scope','EmployeeService','ngDialog','DepartmentService','$window',function($scope,EmployeeService,ngDialog,DepartmentService,$window){

        $scope.gridOptions = {
            enablePagination:true,
            enablePaginationControls:true,
            paginationPageSizes: [10,20],
            paginationPageSize: 10,
            data:EmployeeService.getEmployees(),
            columnDefs:[
                {field:'_id',displayName:'Action',cellTemplate:'<button  class="btn-link" ng-click="grid.appScope.remove(row.entity._id)">delete</button>'},
                {field:'_id',displayName:'ID',cellTemplate:'<button class="btn-link" ng-click="grid.appScope.open(row.entity._id)">{{row.entity._id}}</button>'},
                {name:'FirstName'},
                {field:'LastName'},
                {field:'Department.Name',displayName:'Department'}// showing backwards compatibility with 2.x.  you can use field in place of name

            ]};
        var initializeEmployees=function(employees){
            if(employees!=null && employees!=undefined){

                $scope.gridOptions.data=employees;
            }
            else {
                $scope.gridOptions.data=EmployeeService.getEmployees();
            }
        }
        $scope.departments=DepartmentService.getDepartments();
        $scope.isEdit=false;
        $scope.open=function(ID){
            if(ID==0)
            {
                $scope.isEdit=false;
                $scope.formTitle="Add";
                $scope.employee=EmployeeService.createEmployee();
                openDialog();
            }
            else
            {
                EmployeeService.getEmployeeById(ID,function(employee){
                    $scope.isEdit=true;
                    $scope.formTitle="Edit";
                    $window.console.log(employee);
                    $scope.employee=employee;
                    //$window.console.log(employee);
                    openDialog();
                });
            }
        }

        var openDialog=function(){
            ngDialog.open({
                template: 'App/Views/Employee/Edit.html',
                className: 'ngdialog-theme-default',
                cache:false,
                scope:$scope,
                height:530,
                width:800
            });
        }

        $scope.save=function(){
            if($scope.isEdit) {
                EmployeeService.updateEmployee($scope.employee,initializeEmployees);
            }
            else {
                EmployeeService.addEmployee($scope.employee,initializeEmployees);
            }

        }

        $scope.remove=function(ID){
            if(ID!=null)
            {
                $scope.message="you are about to delete a property.are you sure?";
                var confirmdialog=ngDialog.openConfirm({
                    template:'app/views/confirmDialog.html',
                    scope:$scope,
                    controllerAs:'employee',
                }).then(function(){
                    EmployeeService.removeEmployee(ID,initializeEmployees);
                },function(reason){
                    //at the time of cancellation
                });;


            }

        }




    }]);


})();