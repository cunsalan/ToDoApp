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

var itemOne = Todo({item:"Get Flowers"}).save(function(err){
    if(err) throw err;
    console.log('Item Saved');

});



var data = [{item:'Get data'},{item:'Get service'},{item:"Get Milk"}]

module.exports = function(app){

    app.get('/todo',function(req,res){
        console.log('TodoContoller Get ');
        res.render('todo',{todos:data})
    });

    app.post('/todo',urlencodedParser,function(req,res){
        console.log('TodoContoller Post');
        data.push(req.body);
        res.json(data);
    });

    app.delete('/todo/:item',function(req,res){
        console.log('TodoContoller Delete ');
        data = data.filter(function(todo){
            return todo.item.replace(/ /g,'-') !==req.params.item;
        }) 
        res.json(data);
    });

    app.put('/todo',function(req,res){

    });

};