const express = require('express');
const router = express.Router();
const authCTRL = require('../controllers/auth-controllers');
const auth = require('../middlewares/auth');

router.route('/sign-up').post(authCTRL.signUp);
router.route('/sign-in').post(authCTRL.signIn);
router.route('/sign-out').get(authCTRL.signOut);
router.route('/is-signed-in').get(authCTRL.isSignedIn);

router.route('/be-premium').get(auth,authCTRL.bePremium);
router.route('/be-normal').get(auth,authCTRL.beNormal);

module.exports = router;