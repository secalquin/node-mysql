const express = require('express');
const mysqlconnection = require('../database'); //databaseconexion
const router = express.router(); //router, create route for access
const { check, oneof } = require('express-validator'); //library for validate request.

const productcontroller = require('../controllers/productcontroller');



router.get('/products', productcontroller.list);
router.get('/products/:id', [
	oneof([
		check('id')
			.custom(value => {
				return new promise((resolve, reject) => {
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
	oneof([
		check('id')
			.custom(value => {
				return new promise((resolve, reject) => {
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
	oneof([
		check('name')
			.exists().withmessage('name is required')
			.trim().not().isempty().withmessage('name cannot be empty')
			.islength({ min: 10 }).withmessage('must be at least 10 chars long')
			.islength({ max: 100 }).withmessage('must be at maximum of 100 characters long'),
	]),

	oneof([
		check('sku')
			.not()
			.isempty()
			.trim() //trims characters (whitespace by default) at the beginning and at the end of a string
			.escape() //replaces <, >, &, ', " and / with their corresponding html entities
			.islength({ min: 5 }).withmessage('must be at least 5 chars long')
			.islength({ max: 15 }).withmessage('must be at maximum of 15 characters long')
			.custom(value => {
				return new promise((resolve, reject) => {
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

	oneof([
		check('upc')
			.not()
			.isempty()
			.trim() //trims characters (whitespace by default) at the beginning and at the end of a string
			.escape() //replaces <, >, &, ', " and / with their corresponding html entities
			.islength({ min: 8 }).withmessage('must be at least 8 chars long')
			.islength({ max: 11 }).withmessage('must be at maximum of 15 characters long')
			.custom(value => {
				return new promise((resolve, reject) => {
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

	oneof([
		check('long_description')
			.not()
			.isempty()
			.trim() //trims characters (whitespace by default) at the beginning and at the end of a string
			.escape() //replaces <, >, &, ', " and / with their corresponding html entities
			.islength({ min: 1 }).withmessage('must be at least 1 chars long')
			.islength({ max: 10000 }).withmessage('must be at maximum of 10000 characters long')
	]),

	oneof([
		check('short_description')
			.not()
			.isempty()
			.trim() //trims characters (whitespace by default) at the beginning and at the end of a string
			.escape() //replaces <, >, &, ', " and / with their corresponding html entities
			.islength({ min: 1 }).withmessage('must be at least 1 chars long')
			.islength({ max: 1000 }).withmessage('must be at maximum of 1000 characters long')
	]),

	oneof([
		check('price')
			.not()
			.isempty()
			.isnumeric().withmessage('must be at number')
			.islength({ min: 1 }).withmessage('must be at least 8 chars long')
			.islength({ max: 20 }).withmessage('must be at maximum of 15 characters long')
	])

], productcontroller.save);


module.exports = router;