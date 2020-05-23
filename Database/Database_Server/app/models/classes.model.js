module.exports = (sequelize, Sequelize) => {
    const Classes = sequelize.define("classes", {
    cid: {
        type: Sequelize.INTEGER
        },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return Classes;
  };