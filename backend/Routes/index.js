const router = require("express").Router();
const homeController = require('../Controller/home')
const userController = require('../Controller/user')
const surveyController = require('../Controller/survey')
const verifyToken = require("../Config/jwt_middleware")

router.get('/', homeController.home);
router.post('/sign-up', userController.signUp);
router.post('/sign-in', userController.signIn);
router.get('/sign-out', userController.signOut);
router.post('/create-survey', surveyController.createNewSurvey);
router.get('/get-survey', verifyToken, surveyController.getSurvey)


module.exports = router;