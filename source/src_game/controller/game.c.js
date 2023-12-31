const Player = require("../model/player.m");

module.exports = function (io) {
  const playerController = {
    // Login - Register
    loginRegisterPage: (req, res, next) => {
      res.render("login_register");
    },

    homePage: (req, res, next) => {
      io.on("connection", (client) => {
        client.on("player-has-online", () => {
          const playerOnlineList = Player.getPlayerOnlineList();
          console.log(playerOnlineList); 
          const playerInfoList = playerOnlineList.map( playerName => { 
            return Player.getPlayerInfos(playerName);
          })
          console.log(playerInfoList);
          io.emit("update-player-online-list", playerInfoList);
        }); 
      });
      res.render("home", {
        navId: 1,
      });
    },

    createPage: (req, res, next) => {
      res.render("create", {
        navId: 2,
      });
    },
    rankPage: (req, res, next) => {
      res.render("rank", {
        navId: 3,
      });
    },
    logOut: async (req, res, next) => {
      if (req.session.hasOwnProperty("passport")) {
        if (req.session.passport.hasOwnProperty("user")) {
          const username = req.session.passport.user;
          await Player.removePlayerFromOnlineList(username);
        }
      }

      req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/login");
      });
    },
  };
  return playerController;
};

// module.exports = {
//   // GET
//   loginRegisterPage,
//   homePage,
//   createPage,
//   rankPage,
//   logOut,
// };
