const express = require('express');
const router = express.Router();
const companyCTRL = require('../controllers/company-controllers');
const premium = require('../middlewares/premium');

// create
router.route('/').post(premium, companyCTRL.createCompany);
// read (search legalNumber)
router.route('/search').post(companyCTRL.searchName);
// update
router.route('/:id').put(premium, companyCTRL.update);
// delete
router.route('/:key').delete(premium, companyCTRL.deleteOne);


router.route('/name/asc').get(companyCTRL.nameASC);

router.route('/name/desc').get(companyCTRL.nameDESC);

router.route('/office/asc').get(companyCTRL.officeCountASC);

router.route('/office/desc').get(companyCTRL.officeCountDESC);


module.exports = router;