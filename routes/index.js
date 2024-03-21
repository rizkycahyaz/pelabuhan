var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');

var Model_user = require('../model/model_user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next){
  res.render('auth/register');
});

router.get('/login', function(req, res, next){
  res.render('auth/login');
});

router.post('/saveusers', async (req, res) =>{
  let { email, password } = req.body;
  let enkripsi = await bcrypt.hash(password, 10);
  let Data = {
    email,
    password: enkripsi
  }
  await Model_user.Store(Data);
  req.flash('sukses', 'berhasil login');
  res.redirect('/login')
});


router.post('/log', async (req, res) => {
  let { email, password } = req.body;
  try{
    let Data = await Model_user.Login(email);
    if (Data.length > 0){
      let enkripsi = Data[0].password;
      let cek = await bcrypt.compare(password, enkripsi);
      if (cek) {
        req.session.userId = Data[0].id_users;
        req.flash('sukses', 'berhasil login');
        res.redirect('/users');
      } else {
        req.flash('error', 'Email atau Password salah');
        res.redirect('/login');
      }
    }else {
      req.flash('error', 'Akun tidak di temukam');
      res.redirect('/login');
    }
  } catch (err){
    res.redirect('/login');
    req.flash('error', 'error pada fungsi');
  }
});

router.get('/logout', function(req, res){
  req.session.destroy(function(err){
    if(err) {
      console.error(err);
    }else {
      res.redirect('/login');
    }
  });
});

module.exports = router;
