// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

router.get('/', mainController.index); 
router.get('/search', mainController.search); 

// /*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', mainController.detail); 

module.exports = router;
