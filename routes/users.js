var express = require('express');
const Model_user = require('../model/model_user');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', async function(req, res, next) {
 try{
  let id = req.session.userId;
  let Data = await Model_user.getId(id);
  if (Data.length > 0) {
    res.render('users/index',{
      title: 'User home',
      email: Data[0].email
    });
  }else {
    res.status(401).json({ error: 'user tidak ada'});
  }
 } catch (error) {
  res.status(501).json('Butuh akses login');
 }
});

module.exports = router;
