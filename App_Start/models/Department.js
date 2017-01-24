/**
 * Created by DMehta on 1/15/2017.
 */
var mongoose=require('mongoose');
var autoIncrement=require('mongoose-auto-increment');

var departmentSchema=new mongoose.Schema({
    '_id':{type:Number,default:1,unique:true},
    'Name':String
});


var propertiesArray=[];
var departments=mongoose.model('departments',departmentSchema);
departmentSchema.plugin(autoIncrement.plugin,{model:'departments',field:'_id',startAt:1,incrementBy:1});
departments.schema.eachPath(function(path){
    propertiesArray.push(path);
});

module.exports.departments=departments;
module.exports.department_Properties=propertiesArray;





