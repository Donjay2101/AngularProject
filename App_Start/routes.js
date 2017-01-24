/**
 * Created by DMehta on 1/9/2017.
 */

var employee=require('./models/Employee');
var department=require('./models/Department');
var bodyparser=require('body-parser');
var path=require('path');
var mongoose=require('mongoose');
var parser=bodyparser.urlencoded({extended:false});

var getBy=function(module,property){


    var prop="";
    if(module.toUpperCase()=="EMPLOYEE"){
        employee.Employee_Properties.forEach(function(val){
            if(val.toUpperCase()== property.toUpperCase())
            {
                prop=val;
            }
        });
    }
    else {
        department.department_Properties.forEach(function(val){
            if(val.toUpperCase()== property.toUpperCase())
            {
                prop=val;
            }
        });
    }
    return prop;
}
var getAll=function(module,callback){
    if(module.toUpperCase()=="EMPLOYEE") {
        employee.Employees.find({}).populate('Department').exec(function(err,employees){
            //console.log('emp');
            callback(err,employees);
            //console.log(employees);
            //res.json(employees);
        });
    }
    else{
        department.departments.find({},function(err,departments){
           // console.log('dep');
            callback(err,departments);
            //console.log(employees);
            //res.json(employees);
        });
    }

}

module.exports=function(app){

    //---------------------------------------------Employee------------------------------------//
    //get all <%ModelName%>
    app.get('/api/employees',function(req,res){
         getAll('EMPLOYEE',function(err,employees){
             if(err)
             res.send(err);
         res.json(employees);
         });
    });

    //save <%ModelName%> to database
    app.post('/api/employees',parser,function(req,res){
        console.log(req.body);
        employee.Employees.create({
            FirstName:req.body.FirstName,
            LastName:req.body.LastName,
            Department:req.body.Department._id
        },function(err,employee){
            if(err)
            {
                console.log(err);
                res.send(err);
            }
            else{
                getAll('EMPLOYEE',function(err,employees){
                    if(err)
                    {
                        res.send(err);
                    }

                    res.json(employees);
                });
            }
        });
    });

    app.get('/api/employees/:param/:By',function(req,res){
        var value=req.params.param;
        var by=req.params.By;

        var query={};
        var prop=getBy('EMPLOYEE',by);
        query[prop]=value;

        //console.log(query);
        employee.Employees.findOne(query).populate('Department').exec(function(err,docs){
            console.log(docs);
            console.log("sd"+docs.Department.Name);
            res.json(docs);
        });

        /*   employee.Employees.findOne(query,function(err,employee){
         if(err)
                res.send(err);
            else
            //console.log(employee)
                res.json(employee);
        });*/
    });


    app.put('/api/employees',parser,function(req,res){

        var oldEmployee=req.body;

        var newEmployee={
            FirstName:oldEmployee.FirstName,
            LastName:oldEmployee.LastName
        };

        employee.Employees.findOneAndUpdate({_id:oldEmployee._id},newEmployee,function(err){
            if(err)
                res.send(err);
            else
                getAll('EMPLOYEE',function(err,employees){
                    if(err)
                    res.json(err);

                    res.json(employees);
                })
        })
    });

    app.delete('/api/employees/:param',function(req,res){
        var ID=req.params.param;

        employee.Employees.remove({_id:ID},function(err){
            if(err)
                res.send(err);
            getAll('EMPLOYEE',function(err,employees){
                if(err)
                res.json(err);

                res.json(employees);
            });
        });
    });

    //---------------------------------------------Employee------------------------------------//


    //---------------------------------------------Departments------------------------------------//
    app.get('/api/departments',function(req,res){

        getAll('DEPARTMENTS',function(err,departments){
            if(err){
                console.log(err);
                res.send(err);
            }

           // console.log(departments);
            res.json(departments);
        });
    });

    app.post('/api/departments',parser,function(req,res){
        console.log(req.body);
        department.departments.create({
            Name:req.body.Name
        },function(err,departments) {
                if(err){
                    res.send(err);
                }
            else {
                    getAll('DEPARTMENT',function(err,departments){
                        if(err){
                            res.send(err);
                        }
                       // console.log(departments);
                        res.json(departments);
                    });
                }



        });


    });

    app.get('/api/departments/:param/:By',function(req,res){

        var param=req.params.param;
        var By=req.params.By;
        var property=getBy('DEPARTMENT',By);
        ///console.log(property);
        var query={};
        query[property]=param;
       // console.log(query);
        department.departments.findOne(query,function(err,department){
            if(err)
            res.send(err);

           // console.log(department);
            res.json(department);
        });

    });

    app.put('/api/departments',parser,function(req,res){

        var olddeprtment=req.body;
        var new_deprtment={
                Name:olddeprtment.Name
        }
        department.departments.findOneAndUpdate({_id:olddeprtment._id},new_deprtment,function(err){
                if(err)
                res.send(err);
            getAll('DEPARTMENT',function(err,departments){
                    if(err)
                    res.send(err);
                res.json(departments);
            });
        });
    });

    app.delete('/api/departments/:param',function(req,res){
        var ID=req.params.param;

        department.departments.remove({_id:ID},function(err){
            if(err)
                res.send(err);
            getAll('DEPARTMENT',function(err,departments){
                if(err)
                    res.send(err);

                res.json(departments);
            });
        });
    });

    //---------------------------------------------Departments------------------------------------//

    app.get('/', function(req, res) {
        console.log(req);
        res.sendfile('.public/index.html');
        // res.sendFile('index.html',{root: __dirname}); // load the single view file (angular will handle the page changes on the front-end)
    });
};






