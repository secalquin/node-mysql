const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');


router.get('/products', (req,res) =>{

let getProducts = "SELECT PRD.upc as prd_upc,PRD.long_description as prd_longdesc,PRD.short_description as prd_shortdesc,PRD.price as prd_price,PRD.iva as prd_iva,PRD.sku as prd_sku,PRD.name as prd_name,PRD.id as prd_id,WAR.id as war_id,WAR.name as war_name,WAR.stock as war_stock FROM PRODUCTS PRD LEFT JOIN WAREHOUSE WAR ON WAR.PRODUCTS_ID = PRD.ID";
	mysqlConnection.query(getProducts,(err,rowsPrd,fields) =>{
		var result = [], index = {};
		if(!err){
			//res.json(rowsPrd);

			rowsPrd.forEach(function (row) {
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
		        index[row.prd_id].werehouse.push({
		            id: row.war_id,
		            name: row.war_name,
		            stock: row.war_stockb
		        });
		    });
		    res.json(result);
		}else{
			console.log(err);
		}
	});
});


router.get('/products/:id', (req,res) =>{
const { id } = req.params;
let getProduct = "SELECT PRD.upc as prd_upc,PRD.long_description as prd_longdesc,PRD.short_description as prd_shortdesc,PRD.price as prd_price,PRD.iva as prd_iva,PRD.sku as prd_sku,PRD.name as prd_name,PRD.id as prd_id,WAR.id as war_id,WAR.name as war_name,WAR.stock as war_stock FROM PRODUCTS PRD RIGHT JOIN WAREHOUSE WAR ON WAR.PRODUCTS_ID = PRD.ID WHERE PRD.ID = ?";
	mysqlConnection.query(getProduct,[id],(err,rowsPrd,fields) =>{
		var result = [], index = {};
		if(!err){
			//res.json(rowsPrd);

			rowsPrd.forEach(function (row) {
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
		        index[row.prd_id].werehouse.push({
		            id: row.war_id,
		            name: row.war_name,
		            stock: row.war_stock
		        });
		    });
		    res.json(result[0]);
		}else{
			console.log(err);
		}
	});
});

router.post('/product',(req,res) =>{
	const { name, sku, upc, price, iva } = req.body;
	//Validate Request.


});


module.exports = router;