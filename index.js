const express=require('express');
const app=express();
const path=require('path');
const fs=require('fs');


app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',function(req,res){
    fs.readdir(`D:/mynd/files`,function(err,files){
        res.render('index',{files:files});
        
    })
   
})
app.get('/files/:file',function(req,res){
    fs.readFile(`D:/mynd/files/${req.params.file}`,"utf-8",function(err,filedata){
        res.render('show',{file: req.params.file,filedata:filedata});
    })
   
})

app.post('/create',function(req,res){
  
  fs.writeFile(`D:/mynd/files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(){
      res.redirect('/');
  })
  
})
app.listen(3000);