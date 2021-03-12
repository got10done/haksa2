var mysql = require('mysql');
exports.connect=function(){
    db=mysql.createPool({  //createConnection으로도 할 수 있지만 공유할 수 없어서 createPool을 쓴다.
        connectionLimit:100, 
        host:'localhost', 
        user:'web4', 
        password:'pass', 
        database:'webdb4' 
    });
} 
exports.get=function(){  //db.get()을 하면 db를 값으로 리턴한다는 의미~
 return db;
};