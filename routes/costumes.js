var express = require('express');
const costume_controlers= require('../controllers/costume');
var router = express.Router();
/* GET costumes */
router.get('/', costume_controlers.costume_view_all_Page );
router.get('/detail', costume_controlers.costume_view_one_Page);
router.get('/create', costume_controlers.costume_create_Page);

module.exports = router;
