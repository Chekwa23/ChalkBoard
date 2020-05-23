const db = require("../models");
const Classes = db.classes;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    
    if (!req.body.cid) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    
  
    // Create a class
    const classes = {
      cid: req.body.cid,
      name: req.body.name,
      desciption: req.body.description
    };
  
    // Save Tutorial in the database
    Classes.create(classes)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the class."
        });
      });
};

exports.findAll = (req, res) => {
    const cid = req.query.cid;
    var condition = cid ? { cid: { [Op.like]: `%${cid}%` } } : null;
  
    Classes.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving classes."
        });
      });
  };

  exports.findOne = (req, res) => {
    const cid = req.params.cid;
  
    Classes.findByPk(cid)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving class with cid=" + cid
        });
      });
  };

  exports.update = (req, res) => {
    const cid = req.params.cid;
  
    Classes.update(req.body, {
      where: { cid: cid }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Class was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Class with cid=${cid}. Maybe class was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Class with cid=" + cid
        });
      });
  };

  exports.delete = (req, res) => {
    const cid = req.params.cid;
  
    Classes.destroy({
      where: { cid: cid }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Class was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete class with cid=${cid}. Maybe class was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete class with cid=" + cid
        });
      });
  };

  exports.deleteAll = (req, res) => {
    Classes.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} classes were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all classes."
        });
      });
  };