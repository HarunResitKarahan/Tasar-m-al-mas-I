const express = require('express');
const cors = require('cors');
const knex = require('knex');
const fileUpload = require('express-fileupload');

const db = knex({
    client: 'mssql',
    connection: {
    host : '127.0.0.1',
    user : 'newsuser',
    password : '38887030636h',
    database : 'TEST'
  }
});


const app = express();
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use(fileUpload());


app.post('/register', function(request, response) {
  const userNickname= request.body.nickname, 
  userName = request.body.username, 
  userSurname = request.body.usersurname, 
  userEmail = request.body.useremail, 
  userPassword = request.body.userpassword;
  db('Users').insert({
    userNickname: userNickname,
    userName: userName,
    userSurname: userSurname,
    userEmail: userEmail,
    userPassword: userPassword,
    userCreateTime: new Date()
  }).then(console.log);
  response.send(request.body)
})

app.get('/', function (req, res) {
   
  var sql = require("mssql");
  var config = {
      user: 'newsuser',
      password: '38887030636h',
      server: 'localhost', 
      database: 'NEWS' 
  };
  sql.connect(config, function (err) {
      var request = new sql.Request();
      request.query('use TEST select TOP 15 * from dbo.Tests', function (err, recordset) {
          res.json(recordset);  
      });
  });
});
app.get('/tests', function (req, res) {
   
  var sql = require("mssql");

  // config for your database
  var config = {
      user: 'newsuser',
      password: '38887030636h',
      server: 'localhost', 
      database: 'NEWS' 
  };

  // connect to your database
  sql.connect(config, function (err) {

      // create Request object
      var request = new sql.Request();
         
      // query to the database and get the records
      request.query('use TEST select TOP 20 * from dbo.Questions', function (err, recordset) {

          res.json(recordset);
          
      });
  });
});
var server = app.listen(8081, function () {
  console.log('Server is running..');
});