var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});

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