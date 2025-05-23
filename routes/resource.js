var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var costume_controller = require('../controllers/costume');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// COSTUME ROUTES ///
// POST request for creating a Costume.
router.post('/costumes', costume_controller.costume_create_post);
// DELETE request to delete Costume.
router.delete('/costumes/:id', costume_controller.costume_delete);
// PUT request to update Costume.
router.put('/costumes/:id', costume_controller.costume_update_put);
// GET request for one Costume.
router.get('/costumes/:id', costume_controller.costume_detail);
// GET request for list of all Costume items.
router.get('/costumes', costume_controller.costume_view_all_Page);


module.exports = router;
// API for our resources
exports.api = function(req, res) {
res.write('[');
res.write('{"resource":"costumes", ');
res.write(' "verbs":["GET","PUT", "DELETE"] ');
res.write('}');
res.write(']')
res.send();
};
