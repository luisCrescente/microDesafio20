// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 
router.get('/create', productsController.create); 
router.get('/:id/edit/', productsController.edit); 

/*** CREATE ONE PRODUCT ***/ 
router.post('/', productsController.store); 

// /*** GET ONE PRODUCT ***/ 
 router.get('/detail/:id/', productsController.detail); 

// /*** EDIT ONE PRODUCT ***/ 
router.put('/edit/:id', productsController.update); 

// /*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 

module.exports = router;

