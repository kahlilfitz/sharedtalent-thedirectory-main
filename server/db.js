// Import path module
const path = require("path");

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, "db/database.sqlite.db");

// Create connection to SQLite database
const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
});

const userTable = "User";

// Create a table in the database called "users"
knex.schema
  // Make sure no "users" table exists
  // before trying to create new
  .hasTable(userTable)
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable(userTable, (table) => {
          // add fields here
        })
        .then(() => {
          // Log success message
          console.log("Table 'User' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    // Log success message
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

// Just for debugging purposes:
// Log all data in "users" table
// knex
//   .select("*")
//   .from(userTable)
//   .then((data) => console.log("data:", data))
//   .catch((err) => console.log(err));

// Export the database
module.exports = knex;
