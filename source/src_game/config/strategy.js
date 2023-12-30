const passport = require("passport");
const { Strategy } = require("passport-strategy");

module.exports = class MyStrategy extends Strategy {
  constructor(verify, options) {
    super();
    this.name = "myStrategy"; // Set a name for your strategy
    this.verify = verify; // Set the verify function for authentication
    // Any additional options or configuration can be handled here
    passport.strategies[this.name] = this; // Register the strategy with  Passport;

    this.usernameField =
      options && options.username ? options.username : "username";
    this.passwordField =
      options && options.password ? options.password : "password";
  }

  authenticate(req, options) {
    // Implement the authentication logic here
    const username = req.body[this.usernameField];
    const password = req.body[this.passwordField]; 
    // Call this.success(user, info) if authentication is successful
    // Call this.fail(info) if authentication fails
    this.verify(username, password, (err, result) => {
      if (err) {
        this.fail(`Error to authenticate: ${err}`);
      }
      if (!result) {
        this.fail(`Failed to authenticate:`);
      } else {
        this.success(result, "Verify successfully!");
      }
    });
  }
};
