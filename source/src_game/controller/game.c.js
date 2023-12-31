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
          const playerInfoList = playerOnlineList.map((playerName) => {
            return Player.getPlayerInfos(playerName);
          });
          io.emit("update-player-online-list", playerInfoList);
        });

        client.on("general-chatting", (data) => {
          data.areYou = false;
          if (data.username == req.session.passport.user) {
            data.areYou = true;
          }
          data.nickname = Player.getPlayerInfos(data.username).nickname;
          console.log(data);
          io.emit("general-chatting", data);
        });
      });
      const username = req.session.passport.user;
      res.render("home", {
        navId: 1,
        username,
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
