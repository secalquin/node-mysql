const express = require('express');
const router = express.Router(); //Router, create route for access
const { check, oneOf, validationResult } = require('express-validator'); //Library for validate request.
const mysqlConnection = require('../database'); //DatabaseConexion

router.get('/products', (req,res) =>{

let getProducts = "SELECT PRD.upc as prd_upc,PRD.long_description as prd_longdesc,PRD.short_description as prd_shortdesc,PRD.price as prd_price,PRD.iva as prd_iva,PRD.sku as prd_sku,PRD.name as prd_name,PRD.id as prd_id,WAR.id as war_id,WAR.name as war_name,WAR.stock as war_stockb FROM PRODUCTS PRD LEFT JOIN WAREHOUSE WAR ON WAR.PRODUCTS_ID = PRD.ID";
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
		                long_description: row.prd_longdesc,
		                short_description: row.prd_shortdesc,
		                //iva: row.prd_iva,
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

router.post('/product',[
	/*
	 * Validate Request.
     */
	oneOf([
        check('name')
		.exists().withMessage('name is required')
		.trim().not().isEmpty().withMessage('name cannot be empty')
		.isLength({ min: 10 }).withMessage('must be at least 10 chars long')
		.isLength({ max: 100 }).withMessage('must be at maximum of 100 characters long'),
    ]),

	oneOf([
	       check('sku')
		  .not()
		  .isEmpty()
		  .trim() //trims characters (whitespace by default) at the beginning and at the end of a string
		  .escape() //replaces <, >, &, ', " and / with their corresponding HTML entities
		  .isLength({ min: 5 }).withMessage('must be at least 5 chars long')
		  .isLength({ max: 15 }).withMessage('must be at maximum of 15 characters long')
		  .custom(value => {
				return new Promise((resolve, reject) => {
					let validateBySKU = "SELECT sku FROM PRODUCTS WHERE SKU LIKE ?";
					mysqlConnection.query(validateBySKU,[value],(err,results,fields) =>{
						if (err){
							reject(err);
						}
			             if (results.length>0){
			             	reject(new Error('SKU Already exists'));
			             }else{
			             	resolve();
			             }
					})
			    })
			})
	]),

	oneOf([
	       check('upc')
		  .not()
		  .isEmpty()
		  .trim() //trims characters (whitespace by default) at the beginning and at the end of a string
		  .escape() //replaces <, >, &, ', " and / with their corresponding HTML entities
		  .isLength({ min: 8 }).withMessage('must be at least 8 chars long')
		  .isLength({ max: 11 }).withMessage('must be at maximum of 15 characters long')
		  .custom(value => {
				return new Promise((resolve, reject) => {
					let validateByUPC = "SELECT upc FROM PRODUCTS WHERE UPC LIKE ?";
					mysqlConnection.query(validateByUPC,[value],(err,results,fields) =>{
						if (err){
							reject(err);
						}
			             if (results.length>0){
			             	reject(new Error('UPC Already exists'));
			             }else{
			             	resolve();
			             }
					})
			    })
			})
	]),

	oneOf([
	       check('long_description')
		  .not()
		  .isEmpty()
		  .trim() //trims characters (whitespace by default) at the beginning and at the end of a string
		  .escape() //replaces <, >, &, ', " and / with their corresponding HTML entities
		  .isLength({ min: 1 }).withMessage('must be at least 1 chars long')
		  .isLength({ max: 10000 }).withMessage('must be at maximum of 10000 characters long')
	]),

	oneOf([
	       check('short_description')
		  .not()
		  .isEmpty()
		  .trim() //trims characters (whitespace by default) at the beginning and at the end of a string
		  .escape() //replaces <, >, &, ', " and / with their corresponding HTML entities
		  .isLength({ min: 1 }).withMessage('must be at least 1 chars long')
		  .isLength({ max: 1000 }).withMessage('must be at maximum of 1000 characters long')
	]),

	oneOf([
	       check('price')
		  .not()
		  .isEmpty()
		  .isNumeric().withMessage('must be at number')
		  .isLength({ min: 1 }).withMessage('must be at least 8 chars long')
		  .isLength({ max: 20 }).withMessage('must be at maximum of 15 characters long')
	])

],(req,res) =>{
	const { name, sku, upc, long_description, short_description, price } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
	  return res.status(422).json({ errors: errors.array() });
	}

	//Validate Request.
	mysqlConnection.query("CALL new_product(?,?,?,?,?,?)",[name, sku, upc, long_description, short_description, price],(err,rows,fields) =>{

		if(!err){
			return res.status(201).json({message: "Product was created correctly",status: "201"});
		}else{
			console.log(err);
		}
	});
});


module.exports = router;