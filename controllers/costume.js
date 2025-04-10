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
  try {
    const result = await Costume.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send({ message: "Costume not found" });
    }
    res.json({ message: "Costume deleted successfully", result });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Handle Costume update on PUT
exports.costume_update_put = async function(req, res) {
  try {
    const updatedCostume = await Costume.findByIdAndUpdate(
      req.params.id,
      {
        costume_type: req.body.costume_type,
        size: req.body.size,
        cost: req.body.cost
      },
      { new: true, runValidators: true }
    );

    if (!updatedCostume) {
      return res.status(404).send({ message: "Costume not found" });
    }

    res.json(updatedCostume);
  } catch (err) {
    res.status(500).send({ error: err.message });
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

