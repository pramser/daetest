const Moment = require("moment");

/**
 * Result model
 */
module.exports = (sequelize, DataTypes) => {
  let Result = sequelize.define("Result", {
    date: {
      type: DataTypes.DATE,
      get: function() {
        return Moment(this.getDataValue("date")).format("MMMM Do, YYYY");
      }
    },
    content: DataTypes.JSON,
    product: DataTypes.STRING,
    type: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  });

  return Result;
};
