var express = require('express');
var router = express.Router();
const sectionController = require('../controllers/sections');

router.get('/getSectionsAndVariables', sectionController.getSectionsAndVariables);

module.exports = router;
