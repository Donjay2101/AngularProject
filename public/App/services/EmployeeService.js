/**
 * Created by DMehta on 1/11/2017.
 */

(function(){
"use strict";

    var app=angular.module('myApp');

    function resourceErrorHandler(response) {
        console.log(response);
    }

    app.factory('EmployeeService',['$resource','ToasterService','$window',function($resource,ToasterService,$window){

        var employeeResource=$resource('/api/employees/:param/:By',null,
            {
                'update':{method:'PUT',isArray:true,interceptor : {responseError : resourceErrorHandler}},
                'save':   {method:'POST',isArray:true,interceptor : {responseError : resourceErrorHandler}},
                'delete':   {method:'DELETE',isArray:true,interceptor : {responseError : resourceErrorHandler}},
                'remove': {method:'DELETE',isArray:true,interceptor : {responseError : resourceErrorHandler}},
                'get': {method:'GET',isArray:false,interceptor : {responseError : resourceErrorHandler}},
                'query': {method:'GET',isArray:true,interceptor : {responseError : resourceErrorHandler}}
            });

        var getEmployees=function(){
            return employeeResource.query();
        }

        var getEmployeeByID=function(ID,callback){
            var obj={};
            var employee=employeeResource.get({param:ID,By:'_id'},function(){
               // $window.console.log(employee);
                angular.copy(employee,obj);
                //console.log(obj);
                callback(obj);
            });
        }

        var getEmployeeByFirstName=function(Name,callback){
            var obj={};
            var employee= employeeResource.get({param:Name,By:'FirstName'},function(){
                angular.copy(employee,obj);
                callback(obj);
            });
        }

        var removeEmployee=function(ID,callback){
            employeeResource.remove({param:ID},function(employees){
                callback(employees);
                ToasterService.notify('employee removed successfully.');
            });
        }
        var updateEmployee=function(updatedEmployee,callback){
            employeeResource.update(updatedEmployee,function(employees){
                callback(employees);
                ToasterService.notify('employee updated successfully.');
            });
        }
        var addEmployee=function(employee,callback){
            employeeResource.save(employee,function(employees){
                ToasterService.notify('employee added successfully.');
                callback(employees);
            })
        }

        return{
            getEmployees:function(){
                return getEmployees();
            },
            getEmployeeById:function(ID,callback){
                getEmployeeByID(ID,callback);
            },
            createEmployee:function(){
                var employee={FirstName:"",LastName:"",Department:""};
                return employee;
            },
            getEmployeeByFirstName:function(Name,callback){
                getEmployeeByFirstName(Name,callback);
            },
            addEmployee:function(employee,callback){
                addEmployee(employee,callback);
            },
            updateEmployee:function(employee,callback){
                updateEmployee(employee,callback);
            },
            removeEmployee:function(ID,callback){
                removeEmployee(ID,callback);
            }
        }
    }]);

})();
