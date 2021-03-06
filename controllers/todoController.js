var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
var mongoose = require('mongoose');

//connect to mongo db
mongoose.connect('mongodb://sa:1234@ds235180.mlab.com:35180/todoapp');

//create a schema
 var todoSchema = new mongoose.Schema({
     item:String
 })

 var Todo = mongoose.model('Todo',todoSchema);

// var itemOne = Todo({item:"Get Flowers"}).save(function(err){
//     if(err) throw err;
//     console.log('Item Saved');

// });



//var data = [{item:'Get data'},{item:'Get service'},{item:"Get Milk"}]

module.exports = function(app){

    app.get('/todo',function(req,res){
        console.log('get method executed');
        Todo.find({},function(err,data){
            if(err) throw err;
            res.render('todo',{todos:data})
        });
       
    });

    app.post('/todo',urlencodedParser,function(req,res){
        console.log('post method executed');
        var newTodo = Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data);
        });    
    });

    app.delete('/todo/:item',function(req,res){
        console.log('delete method executed');
        // delete the requested item form db
        Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });

    app.put('/todo',function(req,res){

    });

};