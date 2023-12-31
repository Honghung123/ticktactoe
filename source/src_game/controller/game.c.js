const Player = require("../model/player.m");
const Room = require("../model/room.m");
const path = require("path");
const fs = require("fs");

module.exports = function (io) {
  io.on("connection", (client) => {
    client.on("player-has-online", async (username) => {
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
      io.emit("general-chatting", data);
    });

    client.on("room-list-update", data => {
      const roomList = Room.getRoomList(); 
      const response = roomList.map(room => {
        room.player1 = Player.getPlayerInfos(room.firstPlayer);
        if (room.secondPlayer != "") {
          room.player2 = Player.getPlayerInfos(room.secondPlayer);
        }
        return room;
      });
      console.log(response);
      io.emit("room-list-update", response);
    })

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
    profilePage: async (req, res, next) => { 
      const playerObj = Player.getPlayerInfos(req.session.passport.user);
      res.render("profile", {
        navId: 4,
        profile: {
          username: playerObj.username,
          fullname: playerObj.fullname,
          nickname: playerObj.nickname,
          avatar: playerObj.avatar,
          color: playerObj.color
        },
      });
    }
    ,
    updateProfilePage: async (req, res, next) => {
      const playerObj = Player.getPlayerInfos(req.session.passport.user);
      let imageFromServer = [];
      if (playerObj.get_img_src) {
        const response = await fetch(
          `https://localhost:3113/get-image-src`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            }, 
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        imageFromServer = await response.json();
        console.log(imageFromServer);
      }
      let filenameArr = [];
      const directory = path.join(__dirname, "./../public/uploads");
      for (const filename of fs.readdirSync(directory)) {
        filenameArr.push(`./src_game/public/uploads/${filename}`);
      } 
      filenameArr = filenameArr.concat(imageFromServer);
      res.render("update_profile", {
        navId: 4,
        profile:  {
          username: playerObj.username,
          fullname: playerObj.fullname,
          nickname: playerObj.nickname,
          get_img_src: playerObj.get_img_src ? "true" : "false",
          avatar: playerObj.avatar,
          color: playerObj.color,
          images: filenameArr
        },
      });
    },
    updateProfile: async (req, res, next) => {
      const getImgSrc = req.body.get_img_src;
      if (getImgSrc == "true") {
        req.body.get_img_src = true;
      } else {
        req.body.get_img_src == false;
      }
      console.log(req.body);
      const player = await Player.updateProfile(req.body);
      await fetch(`https://localhost:3113/update-user`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: player.username,
          fullname: player.fullname == "" ? null : player.fullname,
          nickname: player.nickname != player.username ? player.nickname : null,
          avatar: player.avatar
        })
      });
      res.redirect("/profile" );
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
