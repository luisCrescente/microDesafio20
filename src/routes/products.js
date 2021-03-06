// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req,file ,cb) => {
        cb(null, path.join(__dirname,'../../public/images/products'));
    },
    filename: (req, file, cb) =>{
        const newFileName = 'product-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName)
    }
});

const upload = multer({storage});

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

// /*** GET ONE PRODUCT ***/ 
 router.get('/detail/:id/', productsController.detail); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/', upload.single('group-image') ,productsController.store); 


// /*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit/', productsController.edit); 
router.put('/edit/:id', productsController.update); 

// /*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 

module.exports = router;


