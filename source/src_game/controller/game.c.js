const Player = require("../model/player.m");

module.exports = function (io){
  io.on("connection", (client) => {
    client.on("player-has-online", async (username) => {
      console.log("Update");
      await Player.insertPlayerToOnlineList(username);
      const playerOnlineList = Player.getPlayerOnlineList();
      const playerInfoList = playerOnlineList.map((playerName) => {
        return Player.getPlayerInfos(playerName);
      });
      io.emit("update-player-online-list", playerInfoList);
    });
  
    client.on("general-chatting", (data) => { 
      const player = Player.getPlayerInfos(data.username);
      data.nickname = player.nickname;
      data.image = player.avatar;
      console.log(data);
      io.emit("general-chatting", data); 
    });

    client.on("onquit", async () => {
      await Player.clearUserOnlineList();
    });
  });
  const playerController = {
    

    homePage: (req, res, next) => {
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
