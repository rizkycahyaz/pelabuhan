var express = require('express');
var router = express.Router();

//var connection = require('../config/database.js');
const Model_alat = require('../model/model_alat_tangkap');

router.get('/',async function (req, res, next) {
        let rows = await Model_alat.getAll();
        res.render('alat_tangkap/index',{
            data: rows
        })
  })

  router.get ('/create', function (req, res, next){
    res.render ('alat_tangkap/create',{
        nama_alat_tangkap : '',
        
    })
  })
  
  router.post ('/store', async function (req, res, next){
    try {
        //let {nama_alat_tangkap} = req.body;
        let data = {
            nama_alat_tangkap: req.body.nama_alat_tangkap,
        };
      await Model_alat.Store(data);
      req.flash('success', 'berhasil mneyimpan data');  
      res.redirect('/alat_tangkap');
    } catch {
        req.flash ('error','terjadi kesalahan pada fungsi');
        res.redirect ('/alat_tangkap'); 
    }
  })
  
  router.get('/edit/(:id)', async function (req, res, next){
    let id = req.params.id;
    let rows = await Model_alat.getId(id);
            res.render('alat_tangkap/edit',{
                id :                  rows[0].id,
                nama_alat_tangkap :             rows[0].nama_alat_tangkap
            })
  })
  
  router.post('/update/(:id)', async function(req, res, next){
    try {
        let id = req.params.id;
        let data = {
            nama_alat_tangkap: req.body.nama_alat_tangkap,
        };
        
        let rows = await Model_alat.Update(id, data);
        req.flash('success', 'Data berhasil diperbarui');
        res.redirect('/alat_tangkap');
    } catch (error) {
        console.error(error); // Output error untuk debug
        req.flash('error', 'Terjadi kesalahan pada fungsi');
        res.redirect('/alat_tangkap'); // Ubah dari res.render menjadi res.redirect
    }
});

  
  router.get('/delete/(:id)', async function(req, res){
    let id = req.params.id;
      await Model_alat.Delete(id);
      req.flash('success','data berhasil dihapus');
      res.redirect('/alat_tangkap');
  })
  
  module.exports = router;