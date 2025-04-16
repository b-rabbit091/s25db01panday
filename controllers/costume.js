var Costume = require('../models/costume');

// List of all Costumes
exports.costume_list = async function(req, res) {
    try{
    theCostumes = await Costume.find();
    res.send(theCostumes);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };
    

// For a specific Costume
exports.costume_detail = async function(req, res) {
  console.log("detail" + req.params.id)
  try {
    const result = await Costume.findById(req.params.id);
    if (!result) {
      return res.status(404).send({ message: "Costume not found" });
    }
    res.send(result);
  } catch (err) {
    res.status(500).send(`{ "error": document for id ${req.params.id} not found}`);
  }
};

// Handle Costume create on POST
exports.costume_create_post = async function(req, res) {
  let costume = new Costume({
    costume_type: req.body.costume_type,
    size: req.body.size,
    cost: req.body.cost
  });

  try {
    let result = await costume.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Handle Costume delete on DELETE
exports.costume_delete = async function(req, res) {
  console.log("delete " + req.params.id)
  try {
    const result = await Costume.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send({ message: "Costume not found" });
    }
    console.log("Removed " + result)
    res.json({ message: "Costume deleted successfully", result });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Handle Costume update on PUT
exports.costume_update_put = async function(req, res) {
  console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
  try {
    let toUpdate = await Costume.findById(req.params.id);

    if (!toUpdate) {
      return res.status(404).send({ message: "Costume not found" });
    }

    // Do updates of properties
    if (req.body.costume_type) toUpdate.costume_type = req.body.costume_type;
    if (req.body.cost) toUpdate.cost = req.body.cost;
    if (req.body.size) toUpdate.size = req.body.size;

    let result = await toUpdate.save();
    console.log("Success " + result);
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send({ error: `${err}: Update for id ${req.params.id} failed` });
  }
};


// VIEWS
// Handle a show all view
exports.costume_view_all_Page = async function(req, res) {
try{
theCostumes = await Costume.find();
res.render('costume_list', { title: 'Costume Search Results', results: theCostumes });
}
catch(err){
res.status(500);
res.send(`{"error": ${err}}`);
}
};


// Handle a show one view with id specified by query
exports.costume_view_one_Page = async function(req, res) {
console.log("single view for id " + req.query.id)
try{
result = await Costume.findById( req.query.id)
res.render('costumedetail',
{ title: 'Costume Detail', toShow: result });
}
catch(err){
res.status(500)
res.send(`{'error': '${err}'}`);
}
};

// Handle building the view for creating a costume.
// No body, no in path parameter, no query.
// Does not need to be async
exports.costume_create_Page = function(req, res) {
console.log("create view")
try{
res.render('costumecreate', { title: 'Costume Create'});
}
catch(err){
res.status(500)
res.send(`{'error': '${err}'}`);
}
};

// Handle building the view for updating a costume.
// query provides the id
exports.costume_update_Page = async function(req, res) {
console.log("update view for item "+req.query.id)
try{
let result = await Costume.findById(req.query.id)
res.render('costumeupdate', { title: 'Costume Update', toShow: result });
}
catch(err){
res.status(500)
res.send(`{'error': '${err}'}`);
}
};

