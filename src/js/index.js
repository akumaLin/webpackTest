/**
 * Created by lyx on 2017/2/22.
 */
var $=require("jquery");
/*var stuJson=require("./stu.json");*/
require("../css/index.css");
require("../css/tab.css");


/*txt="my name  hahah my name  hahah " + stuJson.name;*/
$("#welcome").html('hello world');


define(["./stu.json"],function(stuJson){
    console.log(stuJson);
    return $("#welcome").append(stuJson.name)


})