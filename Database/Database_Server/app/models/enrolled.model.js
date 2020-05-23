module.exports = (sequelize, Sequelize) => {
    const Enrolled = sequelize.define("enrolled", {
    uid: {
        type: Sequelize.INTEGER
        },
    cid: {
        type: Sequelize.INTEGER
        },
      gradepoint: {
        type: Sequelize.INTEGER
      }
    });
  
    return Enrolled;
  };