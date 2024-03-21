var express = require('express');
var router = express.Router();

//var connection = require('../config/database.js');
const Model_Dpi = require('../model/model_dpi');

router.get('/',async function (req, res, next) {
        let rows = await Model_Dpi.getAll();
        res.render('dpi/index',{
            data: rows
        })
  })

  router.get ('/create', function (req, res, next){
    res.render ('dpi/create',{
        nama_dpi : '',
        luas : ''
    })
  })
  
  router.post ('/store', async function (req, res, next){
    try {
        //let {nama_dpi} = req.body;
        let data = {
            nama_dpi: req.body.nama_dpi,
            luas: req.body.luas
        };
      await Model_Dpi.Store(data);
      req.flash('success', 'berhasil mneyimpan data');  
      res.redirect('/dpi');
    } catch {
        req.flash ('error','terjadi kesalahan pada fungsi');
        res.redirect ('/dpi'); 
    }
  })
  
  router.get('/edit/(:id)', async function (req, res, next){
    let id = req.params.id;
    let rows = await Model_Dpi.getId(id);
            res.render('dpi/edit',{
                id :                  id,
                nama_dpi :             rows[0].nama_dpi,
                luas :                 rows[0].luas
            })
  })
  
  router.post('/update/(:id)', async function(req, res, next){
    try {
        let id = req.params.id;
        let data = {
            nama_dpi: req.body.nama_dpi,
            luas: req.body.luas
        }
        
        let rows = await Model_Dpi.Update(id, data);
        req.flash('success', 'Data berhasil diperbarui');
        res.redirect('/dpi');
    } catch (error) {
        console.error(error); 
        req.flash('error', 'Terjadi kesalahan pada fungsi');
        res.redirect('/dpi'); 
    }
});

  
  router.get('/delete/(:id)', async function(req, res){
    let id = req.params.id;
      await Model_Dpi.Delete(id);
      req.flash('success','data berhasil dihapus');
      res.redirect('/dpi');
  })
  
  module.exports = router;