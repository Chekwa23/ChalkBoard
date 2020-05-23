module.exports = app => {
    const classes = require("../controllers/classes.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", classes.create);
  
    // Retrieve all Tutorials
    router.get("/", classes.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:cid", classes.findOne);
  
    // Update a Tutorial with id
    router.put("/:cid", classes.update);
  
    // Delete a Tutorial with id
    router.delete("/:cid", classes.delete);
  
    // Create a new Tutorial
    router.delete("/", classes.deleteAll);
  
    app.use('/api/classes', router);
  };