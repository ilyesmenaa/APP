const express=require('express');
const sqlite3=require('sqlite3').verbose();
const app = express();
const path=require('path');
const morgan=require('morgan');
var cookieParser = require('cookie-parser');
const db_name = path.join(__dirname, "data", "app.db");
const {addOrdre,EditOrdre,dellOrdre,add_agent,edit_agent,dell_agent} = require('./server/player');
const bodyparser = require("body-parser");
//db connexion
const db = new sqlite3.Database(db_name, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connexion réussie à la base de données 'app.db'");
  });

//log requests
app.use(morgan('tiny'))
//parse request to body-parser
app.use(bodyparser.json({limit: '25mb'}));
app.use(bodyparser.urlencoded({limit: '25mb', extended: true}));
app.use(bodyparser.json());
//set view engine 
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.set("view engine","ejs");
//load assets
app.use(express.static(path.join(__dirname, 'assets')));

// app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
// app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
// app.use('/js',express.static(path.resolve(__dirname,"assets/js")));

app.post('/add_ordre', addOrdre);
app.post('/edit_ordre', EditOrdre);
app.post('/dell_ordre', dellOrdre);
app.post('/add_agent', add_agent);
app.post('/edit_agent', edit_agent);
app.post('/dell_agent', dell_agent);

app.get('/get-all',(req,res)=>{
  const sql='SELECT * FROM ordre';
  db.all(sql,{},(err,rows)=>{
  if(err) return console.error(err.message)
  res.setHeader('Content-Type','application/json')
  res.send(JSON.stringify(rows));
  //db.close();
  console.log(rows)
  
});
})
app.get('/get-all2',(req,res)=>{
  const sql2='SELECT * FROM agent';
  db.all(sql2,{},(err,rows)=>{
  if(err) return console.error(err.message)
  res.setHeader('Content-Type','application/json')
  res.send(JSON.stringify(rows));
 // db.close();
  console.log("this",rows)
});
})

app.get('/',(req,res)=>{
    res.render('_show')
})
app.get('/add-user',(req,res)=>{
  res.render('add_user')
})



app.listen(3000,()=>{console.log('server is running on http://localhost:3000')})
global.db = db;