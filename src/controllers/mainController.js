const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// let lastVisit = [];
// let ofert = [];
// for (let i = 0; i < products.length; i++){
// 	if(products[i].category == "visited"){
// 		ofert.push(products);
// 	}else{
// 		lastVisit.push(products);
// 	};
// };

const controller = {
	index: (req, res) => {
		res.render('index',{products});
	},
	search: (req, res) => {
		let buscado = req.query.search;
		let productsNew = [];
		for (let i = 0; i < products.length; i++){
			if(products[i].name.includes(buscado)){
				productsNew.push(products[i]);
			}
		}
		console.log(productsNew);
		res.render('results',{'products':productsNew});
	},
	// Detail - Detail from one product
	detail: (req, res) => {
		let idProduct = req.params.id;
		let product =products.find(product => product.id == idProduct)
		
		res.render('detail',{product});
	}
};

module.exports = controller;
