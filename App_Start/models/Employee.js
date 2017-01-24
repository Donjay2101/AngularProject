
var mongoose=require('mongoose');
var  autoIncrement = require('mongoose-auto-increment');


var employeesSchema=new mongoose.Schema(
    {
        _id:{type:Number,default:1,unique:true},
        FirstName:String,
        LastName:String,
        Department:{
            type:Number,
            ref: 'departments'
        }
    }
);

var propertiesArray=[];


var employees=mongoose.model('employees',employeesSchema);



employeesSchema.plugin(autoIncrement.plugin,{model:'employees',field:'_id',startAt:1,incrementBy:1});

employees.schema.eachPath(function(path){
    propertiesArray.push(path);
});


module.exports.Employees=employees;
module.exports.Employee_Properties=propertiesArray;


