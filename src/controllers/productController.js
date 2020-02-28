const mysqlconnection = require('../database'); //databaseconexion
const { validationresult } = require('express-validator'); //library for validate request.
const controller = {};

controller.list = (req, res) => {
let getproducts = "select prd.upc as prd_upc,prd.long_description as prd_longdesc,prd.short_description as prd_shortdesc,prd.price as prd_price,prd.iva as prd_iva,prd.sku as prd_sku,prd.name as prd_name,prd.id as prd_id,war.id as war_id,war.name as war_name,war.stock as war_stockb from products prd left join warehouse war on war.products_id = prd.id";
	mysqlconnection.query(getproducts,(err,rowsprd,fields) =>{
		var result = [], index = {};
		if(!err){
			//res.json(rowsprd);
			
			rowsprd.foreach(function (row) {
		        if ( !(row.prd_id in index) ) {
		            index[row.prd_id] = {
		                id: row.prd_id,
		                name: row.prd_name,
		                sku: row.prd_sku,
		                upc: row.prd_upc,
		                price: row.prd_price,
		                long_description: row.prd_longdesc,
		                short_description: row.prd_shortdesc,
		                //iva: row.prd_iva,
		                werehouse: []
		            };
		            result.push(index[row.prd_id]);
		        }
		        if(row.war_id != null){
			        	index[row.prd_id].werehouse.push({
				            id: row.war_id,
				            name: row.war_name,
				            stock: row.war_stockb
		        	});
		        }
		    });
		    res.json(result);
		}else{
			console.log(err);
		}
	});
};

controller.find = (req,res) => {
const { id } = req.params;
const errors = validationresult(req);
	if (!errors.isempty()) {
	  return res.status(422).json({ errors: errors.array() });
	}
	
let getproduct = "select prd.upc as prd_upc,prd.long_description as prd_longdesc,prd.short_description as prd_shortdesc,prd.price as prd_price,prd.iva as prd_iva,prd.sku as prd_sku,prd.name as prd_name,prd.id as prd_id,war.id as war_id,war.name as war_name,war.stock as war_stock from products prd left join warehouse war on war.products_id = prd.id where prd.id = ?";
	mysqlconnection.query(getproduct,[id],(err,rowsprd,fields) =>{
		var result = [], index = {};
		if(!err){
			//res.json(rowsprd);

			rowsprd.foreach(function (row) {
		        if ( !(row.prd_id in index) ) {
		            index[row.prd_id] = {
		                id: row.prd_id,
		                name: row.prd_name,
		                sku: row.prd_sku,
		                upc: row.prd_upc,
		                price: row.prd_price,
		                iva: row.prd_iva,
		                werehouse: []
		            };
		            result.push(index[row.prd_id]);
		        }
		        if(row.war_id != null){
			        	index[row.prd_id].werehouse.push({
				            id: row.war_id,
				            name: row.war_name,
				            stock: row.war_stockb
		        	});
		        }
		    });
		    res.json(result[0]);
		}else{
			console.log(err);
		}
	});
}

controller.save = (req,res) =>{
	const { name, sku, upc, long_description, short_description, price } = req.body;
	const errors = validationresult(req);
	if (!errors.isempty()) {
	  return res.status(422).json({ errors: errors.array() });
	}

	//validate request.
	mysqlconnection.query("call new_product(?,?,?,?,?,?)",[name, sku, upc, long_description, short_description, price],(err,rows,fields) =>{

		if(!err){
			return res.status(201).json({message: "product was created correctly",status: "201"});
		}else{
			console.log(err);
		}
	});
}

controller.update = (req, res) => {

	const { name, sku, upc, long_description, short_description, price } = req.body;
	const errors = validationresult(req);
	if (!errors.isempty()) {
	  return res.status(422).json({ errors: errors.array() });
	}



}



module.exports = controller;