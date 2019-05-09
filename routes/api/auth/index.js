const router = require('express').Router();
const controller = require('./auth.controller');
const oAuthController = require('./oauth.controller');
const authMiddleware = require('../../../middlewares/auth');
const passport = require('passport');

router.get('/oauth/github', passport.authenticate('github'));
router.get('/oauth/github/callback', passport.authenticate('github', {failureRedirect: '/login'}), oAuthController.github);
router.get('/oauth/google', passport.authenticate('google'));
router.get('/oauth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), oAuthController.google);
router.get('/oauth/facebook', passport.authenticate('facebook'));
router.get('/oauth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login'}), oAuthController.facebook);

router.post('/register', controller.register);
router.post('/login', controller.login);

router.use('/check', authMiddleware);
router.get('/check', controller.check);

module.exports = router;