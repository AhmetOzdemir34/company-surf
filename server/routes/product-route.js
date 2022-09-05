const express = require('express');
const router = express.Router();
const productCTRL = require('../controllers/product-controllers');
const premium = require('../middlewares/premium');
// create
router.route('/').post(premium, productCTRL.create);
// read
router.route('/:id').get(productCTRL.searchByID);
// findAll
router.route('/').get(productCTRL.getAll);
// update
router.route('/:id').put(premium, productCTRL.update);
// delete
router.route('/:id').delete(premium, productCTRL.deleteOne);

// sort by price
router.route('/name/asc').get(productCTRL.nameASC);
// filter by category
router.route('/name/desc').get(productCTRL.nameDESC);
// filter by company
router.route('/amount/asc').get(productCTRL.amountASC);

router.route('/amount/desc').get(productCTRL.nameDESC);

router.route('/category').post(productCTRL.filterByCategory);

module.exports = router;