module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
    uid: {
        type: Sequelize.INTEGER
        },
      lname: {
        type: Sequelize.STRING
      },
      fname: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
  
    return User;
  };