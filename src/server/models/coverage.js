// Dependencies
const Moment = require('moment');

/**
 * Coverage model
 */
module.exports = (sequelize, DataTypes) => {
  let Coverage = sequelize.define('Coverage', {
    date: {
      type: DataTypes.DATE,
      get: function() {
        return Moment(this.getDataValue('date')).format('MMMM Do, YYYY');
      }
    },
    product: DataTypes.STRING,
    content: DataTypes.STRING
  });

  return Coverage;
};
