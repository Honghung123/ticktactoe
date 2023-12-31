const passport = require("passport");
const { Strategy } = require("passport-strategy");
const Player = require("../model/player.m");

module.exports = class CustomStrategy extends Strategy {
  constructor(verify, options) {
    super();
    this.name = "custom-strategy"; // Set a name for your strategy
    this.verify = verify; // Set the verify function for authentication
    // Any additional options or configuration can be handled here
    passport.strategies[this.name] = this; // Register the strategy with  Passport;

    this.tokenField =
      options && options.token ? options.token : "token";
  }

  async authenticate(req, options) {
    // Implement the authentication logic here
    let username = null;
    if (req.query.hasOwnProperty(this.tokenField)) {
      const token = req.query[this.tokenField];
      // Verify token by getting user from auth server
      const response = await fetch(`https://localhost:3113/get-user-by-token`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json(); 
      if (data) {
        username = data.username;
        await Player.insertOrUpdatePlayer(data);
        await Player.insertPlayerToOnlineList(username);
      }
    }
    // Call this.success(user, info) if authentication is successful
    // Call this.fail(info) if authentication fails
    this.verify(username, (err, result) => {
      console.log("Checked verify");
      if (err) {
        this.fail(`Error to authenticate: ${err}`);
      }
      if (!result) {
        this.fail(`Failed to authenticate:`);
      } else {
        console.log("Verified");
        this.success(result, "Verify successfully!");
      }
    });
  }
};
