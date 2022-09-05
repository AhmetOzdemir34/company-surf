const express = require('express');
const router = express.Router();
const mainCTRL = require('../controllers/main-controllers');
const auth = require('../middlewares/auth');

router.route('/').get(auth, mainCTRL.result);
router.route('/search/country').post(auth, mainCTRL.searchCountry);
router.route('/search/legal').post(auth, mainCTRL.searchLegalNumber);

module.exports = router;