const Moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  let Result = sequelize.define('Result', {
    date: {
      type: DataTypes.DATE,
      get: function() {
        return Moment(this.getDataValue('date')).format('MMMM Do, YYYY');
      }
    },
    product: DataTypes.STRING,
    content: DataTypes.STRING
  });

  return Result;
};
