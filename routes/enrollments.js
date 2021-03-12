var express = require('express');
var router = express.Router();
var db=require('../db');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('enrollments/list', { title: '수강신청관리' });
});


//수강신청 목록출력
router.get('/list.json',function(req,res){
  var searchType= req.query.searchType;
  var keyword="'%"+req.query.keyword+"%'";
  //var size=req.query.size;
  var page=req.query.page;
  var start=(page-1)*10;
  //console.log(searchType+keyword);
  var sql="select count(*) as cnt from enroll where "+searchType+" like "+keyword;
  var count=0;
  db.get().query(sql,function(err,rows){
    count=rows[0].cnt   //rows의 0번째의 cnt값을 넣어준다.
  });
  var sql="select *, date_format(edate, '%Y-%m-%d') as strEdate from enroll where "+searchType+" like "+keyword+" limit "+start+", 10";

  db.get().query(sql,function(err,rows){
    if(err) res.sendStatus(400);
    res.status(200).send({list:rows, count:count});  //list 부분은 내가 정한 데이터 담을 변수명자리
  });
});
module.exports = router;