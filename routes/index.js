var express = require('express');
var router = express.Router();
var fs=require('fs');
/* GET home page. */

router.get('/', function(req, res) {
  fs.readdir('./upload',function(err,files){
    res.render('index',{files:files ,action:''})
  })
});
router.get('/fileclosed', function(req, res) {
  fs.readdir('./upload',function(err,files){
    res.render('index',{files:files , action:'file closed'})
  })
});
router.get('/openfile/:filename',function(req,res){
    fs.readdir('./upload',function(err,files){
      var fileaddress=`./upload/${req.params.filename}`;
      fs.readFile(fileaddress,'utf8',function(err,filedata){
        console.log(err);
        res.render('fileopen',{files:files,filedata:filedata,filename:req.params.filename,action:`${req.params.filename} is open`})
      })
  })
});
router.post('/savefile/:filename',function(req,res){
  var fileaddress= `./upload/${req.params.filename}`;
  fs.writeFile(fileaddress,req.body.filedata,function(err){
    fs.readdir('./upload',function(err,files){
      res.render('index',{files:files ,action:`${req.params.filename} is saved`})
    }) 
  })
});

router.post('/filecreation', function(req, res) {
  var filename=`./upload/${req.body.filename}`
  fs.writeFile(filename,'',function(err)
  {
    fs.readdir('./upload',function(err,files){
      res.render('index',{files:files, action:'file created !' })
    })
  })
});
module.exports = router;