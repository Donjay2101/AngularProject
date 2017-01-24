/**
 * Created by DMehta on 1/15/2017.
 */
(function(){
    "use strict";

    var app=angular.module('myApp');


    function resourceErrorHandler(response) {
        console.log(response);
    }
    app.factory('DepartmentService',['$resource','ToasterService','$window',function($resource,ToasterService,$window){
        var resource=$resource('/api/departments/:param/:By',null,
            {
            'update':{method:'PUT',isArray:true,interceptor : {responseError : resourceErrorHandler}},
            'save':   {method:'POST',isArray:true,interceptor : {responseError : resourceErrorHandler}},
            'delete':   {method:'DELETE',isArray:true,interceptor : {responseError : resourceErrorHandler}},
            'remove': {method:'DELETE',isArray:true,interceptor : {responseError : resourceErrorHandler}},
            'get': {method:'GET',isArray:false,interceptor : {responseError : resourceErrorHandler}},
            'query': {method:'GET',isArray:true,interceptor : {responseError : resourceErrorHandler}}
        });
        var getDepartments=function(){
                    return resource.query();
        }

        var departmentGetById=function(id,callback){
           var dpt=resource.get({param:id,By:'_id'},function(){
               var department={};
               angular.copy(dpt,department);
                    callback(department);
            });
        }

        var departmentByName=function(name,callback){
            var dpt=resource.get({param:name,BY:'Name'},function(){
                var department={};
                angular.copy(dpt,department);
                callback(department);
            });
        }

        var saveDepartment=function(department,callback){
            resource.save(department,function(departments){
                ToasterService.notify('department added successfully.');
                $window.console.log(departments);
                callback(departments);
            })
        }

        var removeDepartment=function(Id,callback){
            resource.delete({param:Id},function(departments){
                ToasterService.notify('department removed successfully.');
                callback(departments);
            });
        }

        var updateDepartment=function(department,callback){
            resource.update(department,function(departments){
                ToasterService.notify('department updated successfully.')
                callback(departments);
            })
        }


        return{
            getDepartments:function(){
                return getDepartments();
            },
            getDepartmentById:function(Id,callback){
                departmentGetById(Id,callback);
            },
            getDepartmentByName:function(name,callback){
                departmentByName(name,callback);
            },
            saveDepartment:function(department,callback){
                saveDepartment(department,callback);
            },
            remove:function(Id,callback){
                removeDepartment(Id,callback);
            },
            update:function(department,callback){
                updateDepartment(department,callback);
            },
            createDepartment:function(){
                var department={
                    Name:""
                };

                return department;
            }
        }

    }]);
})();
