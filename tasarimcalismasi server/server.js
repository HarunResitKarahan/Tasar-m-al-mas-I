const express = require('express');
const cors = require('cors');
const knex = require('knex');
const fileUpload = require('express-fileupload');
const bcrypt = require('bcrypt');

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

// GLOBAL VARIABLES
const sameSolvedTestsUser = []
const othersSolvedTests = []

//Giriş yapma isteği alındı
app.post('/signin', function (req, res) {
  //Veri tabanından kullanıcı verileri çekildi. 
  db.select('userID','userNickname','userPassword').from('Users').then(id => {
    console.log(id);
    const usernickname = req.body.nickname;
    const userpassword = req.body.userpassword; //Gelen kullanıcı ad ve şifresi değişkenlere atandı
    const countOfUser = id[id.length-1].userID; //veri tabanındaki veri uzunluğu alındı
    var check = 'Bulunmadı'; //Varsayılan kontrol değişkeni ataması yapıldı

    for (var i= 0; i < countOfUser; i++) { //Veri uzunluğu kadar döngüye girildi
      if (usernickname == id[i].userNickname && bcrypt.compareSync(userpassword, id[i].userPassword)) { //Kayıt bulunduysa değişken değiştirildi
        check = 'Bulundu'
      }
    }
    var issignin = check === 'Bulundu' ? 'Giriş Başarılı' : 'Giriş Başarısız' //Girişin başarılı olup olmadığına dair değişken atandı
    res.json(issignin); //Arayüze giriş ile ilgili değişlen yollandu
  })
});

//Kayıt etme isteği alındı
app.post('/register', function(request, response) {
  //Arayüzden gelen veriler değişkenlere atandı
  const userNickname= request.body.nickname, 
  userName = request.body.username, 
  userSurname = request.body.usersurname, 
  userEmail = request.body.useremail,
  userPassword = request.body.userpassword;

  const saltRounds = 10;
  const hashPassword = bcrypt.hashSync(userPassword, saltRounds);

  //Veri tabanından kullanıcı verileri çekildi. 
  db.select('userID','userNickname', 'userEmail').from('Users').then(id => { 
    console.log(id[id.length-1].userID) //Kullanıcı sayısı ekrana yazdırıldı

    var checkname = 'nickNameBulunmadı', checkemail = 'eMailBulunmadı'; //Varsayılan kontrol değişkeni atamaları yapıldı

    for (var i = 0; i < id[id.length-1].userID; i++ ) { //Veritabanındaki veri uzunluğu kadar döngüye girildi
      // Kullanıcı sistemde mevcutsa değişkenler değiştirildi
      if (userNickname == id[i].userNickname) {
        checkname = 'nickNameBulundu'
      }
      if (userEmail == id[i].userEmail) {
        checkemail = 'eMailBulundu'
      }
    }
    // Eğer kayıt ettirilecek kullanıcı veri tabanında mevcut değilse veri tabanına eklendi
    if ( !(checkname === 'nickNameBulundu') && !(checkemail === 'eMailBulundu')) {
      db('Users').insert({
        userNickname: userNickname,
        userName: userName,
        userSurname: userSurname,
        userEmail: userEmail,
        userPassword: hashPassword,
        userCreateTime: new Date()
      }).then(console.log);
    }
    //serverdan arayüze geri dönüş yapıldı
    response.json(checkname + checkemail)
  }) 
})

app.post('/countOfClick', function (req, res) {
  db.select('testNo', 'countOfClick', 'categoryNo').from('Tests').then(id => {
    var index = parseInt(req.body.indexOfTest);
    console.log(typeof index);
    console.log(parseInt(index));
    console.log(id[parseInt(index) - 1].testNo)
    
    db.where({testNo: index}).update({countOfClick: id[index - 1].countOfClick + 1}).table('Tests').then(data => {
      console.log(data)
    }).catch(err => {
      console.log(err)
    })
    res.json('degisti'); 
  })
});

app.get('/', function (req, res) {
  db.select().from('Tests').then(data => {
    res.json(data)
  }).then(err => {
    console.log(err)
  })
});

app.post('/profileinfo', function (req, res) {
  const userName = req.body.username
  db.select('*').from('Users').where('userNickname', userName).then(data => {
    res.json(data)
  })
})

app.post('/suggestion', function (req, res) {
  const username = req.body.username
  const clickedTestNo = req.body.categoryno
  const testNo = req.body.testno
  const point = req.body.point
  console.log("Adığı puan")
  console.log(point)
  var istestsolved = 0
  var i,j,f,e,o
  db.select('*').from('Users').where('userNickname', username).then(usersData => {
    db.select('*').from('SolvedTests').then(solvedtests => {
      db.select('solvedTests').from('SolvedTests').where('solvedTestbyUsers', usersData[0].userID).then(userSolvedTests => {
        // EĞER TEST DAHA ÖNCE ÇÖZÜLMÜŞMÜ DİYE BAKILDI
        for (o = 0; o < userSolvedTests.length; o++) {
          if (userSolvedTests[o].solvedTests == testNo) {
            istestsolved = 1
          }
        }
        // EĞER TEST DAHA ÖNCE ÇÖZÜLMEMİŞSE ÇÖZÜLEN TESTLERE EKLENDİ
        if (istestsolved == 0) {
          db('SolvedTests').insert({
            solvedTests: testNo,
            solvedTestbyUsers: usersData[0].userID
          }).then(console.log)
        }
        var count = 0
        // Mevcut kullanıcı ile sistemde aynı testleri çözmüş kullanıcılar çekildi
          for (j = 0; j < solvedtests.length; j++) {
            if (testNo == solvedtests[j].solvedTests && solvedtests[j].solvedTestbyUsers != usersData[0].userID) {
                  sameSolvedTestsUser[count] = solvedtests[j].solvedTestbyUsers
                  count++
            }
          }
        var cntt = 0
        for (f = sameSolvedTestsUser.length - 1; f >= 0; f--) {
          cntt = 0
          for (e = 0; e < sameSolvedTestsUser.length; e++) {
            if (sameSolvedTestsUser[f] == sameSolvedTestsUser[e]) {
              cntt++
            }
          }
          if (cntt > 1) {
            sameSolvedTestsUser.splice(f,1)
          }
        }
        console.log('\n' + "KULLANICININ TIKLADIĞI TEST")
        console.log(testNo)
        console.log("AYNI TESTİ ÇÖZMÜŞ KULLANICILAR")
        console.log(sameSolvedTestsUser)
        // Ortak testleri olan diğer kullanıcıların testleri çekildi
        var cnt = 0
        var cnt2 = 0
        var cnt3 = 0
        var k,m,h,g,a,c,d
        var samesolvedtestsuser = []
        var samecategorytests = []
        var suggestiontests = []
        var addsuggestiontests = []
        for (i = 0; i < sameSolvedTestsUser.length; i++) {
          db.select('solvedTests').from('SolvedTests').where('solvedTestbyUsers', sameSolvedTestsUser[i]).then(otherstests => {
            for (j = 0; j< otherstests.length; j++) {
              samesolvedtestsuser[cnt] = otherstests[j].solvedTests
              cnt++
            }
            cnt3++

            if (cnt3 == sameSolvedTestsUser.length) {
              for (k = 0; k < samesolvedtestsuser.length; k++) {
                cnt2 = 0
                // Aynı test farklı kullanıcılarda birden fazla ise teke indirildi
                for (m = 0; m < samesolvedtestsuser.length; m++) {
                  if (samesolvedtestsuser[k] ==  samesolvedtestsuser[m]) {
                    cnt2++
                  }
                }
                if (cnt2 >= 2) {
                  samesolvedtestsuser.splice(k,1)
                }
              }
              console.log("ORTAK TESTE SAHİP DİĞER KULLANICILARIN TESTLERİ")
              console.log(samesolvedtestsuser)
              var cnt5 = 0
              db.select('testNo', 'categoryNo').from('Tests').where({'categoryNo': clickedTestNo}).then(testscategory => {
                console.log("TIKLANILMIŞ TESTİN KATEGORİSİNDEKİ TESTLER")
                console.log(testscategory)
                for (h = 0; h < samesolvedtestsuser.length; h++) {
                  for (g = 0; g < testscategory.length; g++) {
                    if (samesolvedtestsuser[h] == testscategory[g].testNo) {
                      samecategorytests[cnt5] = samesolvedtestsuser[h]
                      cnt5++
                    }
                  }
                }
                var cnt6 = 0
                var cnt7 = 0
                console.log("ORTAK TESTE SAHİP DİĞER KULLANICILARIN AYNI KATEGORİDEKİ TESTLERİ")
                console.log(samecategorytests)
                db.select('solvedTests', 'solvedTestbyUsers').from('SolvedTests').where('solvedTestbyUsers', usersData[0].userID).then(istestsolved => {
                  for (a = 0; a < samecategorytests.length; a++) {
                    cnt6 = 0
                    for (b = 0; b < istestsolved.length; b++) {
                      if (samecategorytests[a] == istestsolved[b].solvedTests) {
                        cnt6++
                      }
                    }
                    if (cnt6 < 1) {
                      suggestiontests[cnt7] = samecategorytests[a]
                      cnt7++
                    }
                  }
                  if (point < 40) {
                    suggestiontests.push(testNo)
                  }
                  db.select('suggestionTests', 'suggestionTestbyUsers').from('SuggestionTests').where('suggestionTestbyUsers', usersData[0].userID).then(userssuggestiontests => {
                    console.log("KULLANICIYA DAHA ÖNCE ÖNERİLMİŞ TESTLER")
                    console.log(userssuggestiontests)
                    console.log("DİĞER KULLANICILARDAN AYNI KATEGORİDE ALINMIŞ TESTLER")
                    console.log(suggestiontests)
                    var cnt8 = 0
                    var cnt9 = 0
                    for (c = 0; c < suggestiontests.length; c++) {
                      cnt8 = 0
                      for (d = 0; d < userssuggestiontests.length; d++) {
                        if (suggestiontests[c] == userssuggestiontests[d].suggestionTests) {
                          cnt8++
                        }
                      }
                      if (cnt8 < 1) {
                        addsuggestiontests[cnt9] = suggestiontests[c]
                        cnt9++
                      }
                    }
                    console.log("DAHA ÖNCE ÖNERİP ÖNERİLMEDİĞİ KONTROL EDİLDİKTEN SONRA ÖNERİLMEYEN TESTLER ÖNERİLECEK")
                    console.log(addsuggestiontests)
                    if (addsuggestiontests[0] != null) {
                      for (c = 0; c < suggestiontests.length; c++) {
                        db('SuggestionTests').insert({
                          suggestionTests: addsuggestiontests[c],
                          suggestionTestbyUsers: usersData[0].userID
                        }).then(console.log)
                      }
                    }
                    res.json(addsuggestiontests)
                  }).then(err => {if(err != null){console.log(err)}})
                  console.log(suggestiontests)
                })
              }).then(err => {if(err != null){console.log(err)}})
            }
          }).then(err => {if(err != null){console.log(err)}})
        }
      }).then(err => {if(err != null){console.log(err)}})
    }).then(err => {if(err != null){console.log(err)}})
  }).then(err => {if(err != null){console.log(err)}})
})

app.post('/getsuggestions', function (req,res) {
  const userName = req.body.username
  var i
  var cnt = 0
  var response = []
  db.select('*').from('Users').where('userNickname', userName).then(usersData => {
    db.select('suggestionTests').from('SuggestionTests').where('suggestionTestbyUsers', usersData[0].userID).then(userssuggestiontests => {
      console.log(userssuggestiontests)
      for (i = 0; i < userssuggestiontests.length; i++) {
        db.select('*').from('Tests').where('testNo', userssuggestiontests[i].suggestionTests).then(data => {
          response.push({
            testNo: data[0].testNo,
            testName: data[0].testName,
            testDiffucilty: data[0].testDiffucilty,
            countOfClick: data[0].countOfClick,
            categoryNo: data[0].categoryNo
          })
          cnt++
          if (cnt == userssuggestiontests.length) {
            res.json(response)
          }
        }).then(err => {if(err != null){console.log(err)}})
      }
      
    }).then(err => {if(err != null){console.log(err)}})
  }).then(err => {if(err != null){console.log(err)}})
})

app.post('/getlastsolved', function (req,res) {
  const userName = req.body.username
  var solvedtests = []
  var cnt = 0
  db.select('*').from('Users').where('userNickname', userName).then(usersData => {
    db.select('*').from('Tests').then(tests => {
      db.select('solvedTests', 'solvedTestbyUsers').from('SolvedTests').where('solvedTestbyUsers', usersData[0].userID).then(userlastsolvedtests => {
        for (var i = 0; i < userlastsolvedtests.length; i++) {
          for (var j = 0; j < tests.length; j++) {
            if (userlastsolvedtests[i].solvedTests == tests[j].testNo) {
              solvedtests[cnt] = tests[j]
              cnt++
            }
          }
        }
        console.log(solvedtests)
        res.json(solvedtests)
      }).then(err => {if(err != null){console.log(err)}})
    }).then(err => {if(err != null){console.log(err)}})
  }).then(err => {if(err != null){console.log(err)}})
})

app.post('/getfavorite', function (req,res) {
  const userName = req.body.username
  var favoritetests = []
  var cnt = 0
  db.select('*').from('Users').where('userNickname', userName).then(usersData => {
    db.select('*').from('Tests').then(tests => {
      db.select('favoriteTests', 'favoriteTestbyUsers').from('FavoriteTests').where('favoriteTestbyUsers', usersData[0].userID).then(userfavoritetests => {
        console.log(userfavoritetests)
        for (var i = 0; i < userfavoritetests.length; i++) {
          for (var j = 0; j < tests.length; j++) {
            if (userfavoritetests[i].favoriteTests == tests[j].testNo) {
              favoritetests[cnt] = tests[j]
              cnt++
            }
          }
        }
        console.log(favoritetests)
        res.json(favoritetests)
      }).then(err => {if(err != null){console.log(err)}})
    }).then(err => {if(err != null){console.log(err)}})
  }).then(err => {if(err != null){console.log(err)}})
})

app.post('/favoritetests', function (req, res) {
  const userName = req.body.username
  const starClick = req.body.starclick
  const testNo = req.body.testno
  console.log(starClick)
  db.select('userID').from('Users').where('userNickname', userName).then(userId => {
    if (starClick == true) {
      db('FavoriteTests').insert({
        favoriteTests: testNo,
        favoriteTestbyUsers: userId[0].userID
      }).then(console.log)
    } else {
      db('FavoriteTests').where({'favoriteTests': testNo, 'favoriteTestbyUsers': userId[0].userID}).del().then(console.log)
    }
  }).then(err => {if(err != null){console.log(err)}})
  
})

app.post('/checkfavorite', function (req, res) {
  const userName = req.body.username
  const testNo = req.body.testno
  var starClick
  db.select('userID').from('Users').where('userNickname', userName).then(userId => {
    db.select('*').from('FavoriteTests').where({'favoriteTests': testNo, 'favoriteTestbyUsers': userId[0].userID}).then(favoritests => {
      console.log("FAVORİ TESTLER")
      console.log(favoritests)
      if (favoritests.length != 0) {
        starClick = true
      } else {
        starClick = false
      }
      console.log("FAVORİLERE EKLENMİŞ Mİ")
      console.log(starClick)
      res.json(starClick)
    })
  }).then(err => {if(err != null){console.log(err)}})
})

app.get('/turkce', function (req, res) {
   
  db.select().from('Tests').where('categoryNo', 1).then(data => {
    res.json(data)
  }).then(err => {
    console.log(err)
  })
});
app.get('/matematik', function (req, res) {
   
  db.select().from('Tests').where('categoryNo', 2).then(data => {
    console.log(data)
    res.json(data)
  }).then(err => {
    console.log(err)
  })
});
app.get('/fen', function (req, res) {
   
  db.select().from('Tests').where('categoryNo', 3).then(data => {
    console.log(data)
    res.json(data)
  }).then(err => {
    console.log(err)
  })
});
app.get('/sosyal', function (req, res) {
   
  db.select().from('Tests').where('categoryNo', 4).then(data => {
    console.log(data)
    res.json(data)
  }).then(err => {
    console.log(err)
  })
});

app.get('/yabanci', function (req, res) {
   
  db.select().from('Tests').where('categoryNo', 5).then(data => {
    console.log(data)
    res.json(data)
  }).then(err => {
    console.log(err)
  })
});


app.post('/tests', function (req, res) {
  console.log(req.body)
  db.select().from('Questions').where('testNo', parseInt(req.body.indexOfTest)).then(data => {
    res.json(data)
  }).then(err => {
    console.log(err)
  })


});
var server = app.listen(8081, function () {
  console.log('Server is running..');
});