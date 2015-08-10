var express = require('express');
var router = express.Router();
var mysql  = require('mysql');

function connectDatabase() {
    // 创建一个connection
    var connection = mysql.createConnection({
//        host     : '192.168.1.104',       // 主机
	host:'127.0.0.1',
        user     : 'root',               // MySQL认证用户名
        password : '',        // MySQL认证用户密码
        port: '3306',                   // 端口号
        database: 'nodejs',
    }); 
    // 创建一个connection
    connection.connect(function(err) {
        if (err) {    
            console.log('[query] - :'+err);
            return;
        }    
        console.log('[connection connect]  succeed!');
    });  
    return connection;
}

function closeDatabase(connection) {
    // 关闭connection
    connection.end(function(err) {
        if (err) {    
            return;
        }    
    console.log('[connection end] succeed!');
    });  
}

//function querySqlOrder(sqlOrder,res) {}

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('querySqlOrder');
    var connection = connectDatabase();
    // 执行查找语句
    sqlOrder= "select * from customer";
    connection.query(sqlOrder, function(err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }   
        console.log("query SqlOrder succeed:"+result);
 //       res.json({result: result});
        closeDatabase(connection);
        res.render('index', { title:'pengzhenliu indexpage',result:result });
    }); 
});

router.get('/login',function(req,res,next){
	res.render('login',{title:'pengzhenliu loginpage'});
});
router.get('/logout',function(req,res,next){
	res.render('logout',{title:'pengzhenliu logoutpage'});
});

router.get('/signup',function(req,res,next){
	res.render('signup',{title:'pengzhenliu signuppage'});	
})

/*function authentication(req, res) {
    if (!req.session.user) {
        return res.redirect('/login');
    }
};
router.get('/homepage',function(req,res,next){
	authentication(req,res);	
	res.render('homepage',{title:'pengzhenliu homepage'});
})*/
router.post('/signpage', function(req,res,next){
	console.log("start signup data...");
	var insert_doc= {username:req.body.username,useraddress:req.body.useraddress,userphone:req.body.userphone, password: req.body.password};
	console.log("print the username: "+insert_doc.username);
	console.log("print the useraddress: "+insert_doc.useraddress);
	var connection1 = connectDatabase();
	var sqlinsert= "insert into customer (name,address,phone,password) values ('"+insert_doc.username+"','"+insert_doc.useraddress+"','"+insert_doc.userphone+"','"+insert_doc.password+"')";
	console.log(sqlinsert);
	connection1.query(sqlinsert,function(err,result){
		console.log("print the result"+result);
		var sqlquery1 = "select * from customer where name= '"+insert_doc.username+"'";
		console.log(sqlquery1);
		connection1.query(sqlquery1,function(err,result){
			console.log("hello world....");
			console.log(result);	
			});
		closeDatabase(connection1);
		console.log("signup seccess");
		res.redirect("/login");
//		res.get("/signpage",function(req,res,next){
//		res.render("signpage",{title: "pengzhenliu signpag"});
		});
});

router.post('/homepage', function(req, res,next) {
	console.log("this is homepage test");
	console.log("print req.body userid = "+req.body.userid);
	console.log("print req.body password = "+req.body.password);
       // res.json(req.body);
	console.log("houtai homepage");
        var query_doc = {userid: req.body.userid, password: req.body.password};
	console.log(query_doc)
	var sqlquery = "select * from customer where name= '"+query_doc.userid+"'";
	console.log("post function ...");
	var connection = connectDatabase();
	console.log(sqlquery);
	console.log(query_doc.userid);
	connection.query(sqlquery,function(err,result){
	closeDatabase(connection);
	console.log("print result[0].password:"+result[0].password);
	console.log("query sqlorder homepage succeed:"+result[0].password);
	console.log("print query_doc.password:"+query_doc.password);
	if(query_doc.password == result[0].password)
	{
		console.log(query_doc.userid+":login success in"+new Date());
		res.render('homepage',{title:' pengzhenliu homepage'});
		router.get('/homepage',function(req,res,next){
		res.render('homepage',{title:'pengzhenliu homepage'});
});
	}else
	{
		res.redirect('/');
	}
	});
});

module.exports = router;
