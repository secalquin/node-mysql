const express = require('express');
const mysqlconnection = require('../database'); //databaseconexion
const router = express.Router(); //router, create route for access
const { check, oneOf } = require('express-validator'); //library for validate request.

const productcontroller = require('../controllers/productController');



router.get('/products', productcontroller.list);
router.get('/test', productcontroller.test);
router.get('/products/:id', [
	oneOf([
		check('id')
			.custom(value => {
				return new Promise((resolve, reject) => {
					//reject(new error('id already exists ' + value));
					let validateexitsid = "select id from products where id like ?";
					mysqlconnection.query(validateexitsid, [value], (err, results, fields) => {
						if (err) {
							reject(err);
						}
						if (results.length > 0) {
							resolve();
						} else {
							reject(new error('id does not exist'));
						}
					})
				})
			})
	])
], productcontroller.find);

router.post('/product/:id', [
	oneOf([
		check('id')
			.custom(value => {
				return new Promise((resolve, reject) => {
					//reject(new error('id already exists ' + value));
					let validateexitsid = "select id from products where id like ?";
					mysqlconnection.query(validateexitsid, [value], (err, results, fields) => {
						if (err) {
							reject(err);
						}
						if (results.length > 0) {
							resolve();
						} else {
							reject(new error('id does not exist'));
						}
					})
				})
			})
	])

], productcontroller.update);





router.post('/product', [
	/*
	 * validate request.
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
			.escape() //replaces <, >, &, ', " and / with their corresponding html entities
			.isLength({ min: 5 }).withMessage('must be at least 5 chars long')
			.isLength({ max: 15 }).withMessage('must be at maximum of 15 characters long')
			.custom(value => {
				return new Promise((resolve, reject) => {
					let validatebysku = "select sku from products where sku like ?";
					mysqlconnection.query(validatebysku, [value], (err, results, fields) => {
						if (err) {
							reject(err);
						}
						if (results.length > 0) {
							reject(new error('sku already exists'));
						} else {
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
			.escape() //replaces <, >, &, ', " and / with their corresponding html entities
			.isLength({ min: 8 }).withMessage('must be at least 8 chars long')
			.isLength({ max: 11 }).withMessage('must be at maximum of 15 characters long')
			.custom(value => {
				return new Promise((resolve, reject) => {
					let validatebyupc = "select upc from products where upc like ?";
					mysqlconnection.query(validatebyupc, [value], (err, results, fields) => {
						if (err) {
							reject(err);
						}
						if (results.length > 0) {
							reject(new error('upc already exists'));
						} else {
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
			.escape() //replaces <, >, &, ', " and / with their corresponding html entities
			.isLength({ min: 1 }).withMessage('must be at least 1 chars long')
			.isLength({ max: 10000 }).withMessage('must be at maximum of 10000 characters long')
	]),

	oneOf([
		check('short_description')
			.not()
			.isEmpty()
			.trim() //trims characters (whitespace by default) at the beginning and at the end of a string
			.escape() //replaces <, >, &, ', " and / with their corresponding html entities
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

], productcontroller.save);


module.exports = router;