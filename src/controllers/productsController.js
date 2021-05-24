const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8', null, 4));

const lastId = () => {
    let ultimo = 0;
    products.forEach(product => {
        if (ultimo < product.id) {
            ultimo = product.id;
        }
    });
    return ultimo;
};

 const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products',{products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let idProduct = req.params.id;
		let product =products.find(product => product.id == idProduct)
		
		res.render('detail',{product});
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {

		let product ={
			id: lastId()+1,
			...req.body,
		}
		
		products.push(product);

		let productsJson = JSON.stringify(products, null, 4);
		fs.writeFileSync(path.resolve(__dirname, '../data/productsDataBase.json'),productsJson);
		
		return res.redirect('/products');
	},

	// Update - Form to edit
	edit: (req, res) => {
		let idProduct = req.params.id;
		let productToEdit =products.find(product => product.id == idProduct);

		res.render('product-edit-form',{productToEdit});
	},

	// Update - Method to update
	update: (req, res) => {

		let idProduct = req.params.id;
		
		products.forEach(product=>{
			if(product.id ==  idProduct){
				product.name = req.body.name;
				product.price = req.body.price;
				product.discount= req.body.discount;
				product.category= req.body.category;
				product.description= req.body.description;
			}
		});
		
		let newListJson = JSON.stringify(products, null, 4);
		fs.writeFileSync(path.resolve(__dirname,'../data/productsDataBase.json'), newListJson);
		
		let product =products.find(product => product.id == idProduct)
		res.render('detail',{product});
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		
		let idProduct = req.params.id;
		
		let newList = products.filter(product =>{ 
			return product.id != idProduct;
		});
		
		let newListJson = JSON.stringify(newList, null, 4);
		fs.writeFileSync(path.resolve(__dirname,'../data/productsDataBase.json'), newListJson);
		
		return res.redirect('/products');
	}
};

module.exports = controller;