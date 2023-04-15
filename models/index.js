const Note = require("./note");
const User = require("./user");

//define that there is a one-to-many
//relationship connection between the users and notes entries
User.hasMany(Note);
Note.belongsTo(User);
//tables in the database match changes made to the model definitions
//Note: This is no longer required, done w/ sequlize migration file
// Note.sync({ alter: true });
// User.sync({ alter: true });

module.exports = {
  Note,
  User,
};
