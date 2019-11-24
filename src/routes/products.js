const express = require('express');
const mysqlConnection = require('../database'); //DatabaseConexion
const router = express.Router(); //Router, create route for access
const { check, oneOf } = require('express-validator'); //Library for validate request.

const productController = require('../controllers/productController');



router.get('/products', productController.list);
router.get('/products/:id',[
oneOf([
        check('id')
		.custom(value => {
				return new Promise((resolve, reject) => {
					//reject(new Error('id Already exists ' + value));
					let validateExitsID = "SELECT id FROM PRODUCTS WHERE id LIKE ?";
					mysqlConnection.query(validateExitsID,[value],(err,results,fields) =>{
						if (err){
							reject(err);
						}
			             if (results.length>0){
			             	resolve();
			             }else{
			             	reject(new Error('ID does not exist'));
			             }
					})
			    })
			})	
    ])
],productController.find);

router.post('/product/:id',[
	oneOf([
        check('id')
		.custom(value => {
				return new Promise((resolve, reject) => {
					//reject(new Error('id Already exists ' + value));
					let validateExitsID = "SELECT id FROM PRODUCTS WHERE id LIKE ?";
					mysqlConnection.query(validateExitsID,[value],(err,results,fields) =>{
						if (err){
							reject(err);
						}
			             if (results.length>0){
			             	resolve();
			             }else{
			             	reject(new Error('ID does not exist'));
			             }
					})
			    })
			})	
    ])

],productController.update);





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

],productController.save);


module.exports = router;