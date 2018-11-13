// Dependencies
require("dotenv").config({ silent: true });

// .env supports overriding defaults
module.exports = {
  port: process.env.PORT || 3001,
  env: process.env.ENV || "development",

  // Environment-dependent settings
  development: {
    db: {
      dialect: "sqlite",
      storage: ":memory:"
    }
  },
  production: {
    db: {
      dialect: "sqlite",
      storage: "db/database.sqlite"
    }
  }
};
