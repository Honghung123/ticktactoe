const db = require("../database/db");
module.exports = class Player {
  constructor(player) {
    this.username = player.username;
    this.fullname = player.profile?.fullname || "No display";
    this.nickname = player.profile?.nickname || "No display";
    this.avatar = player.profile.avatar;
    this.get_img_src = player.profile.get_img_src;
    this.color = player.color;
  }

  static getEntity(player) {
    const entity = {
      username: player.username,
      profile: {
        avatar: player?.avatar || null,
        nickname: player?.nickname || null,
        fullname: player?.fullname || null,
        get_img_src: player.get_img_src,
      },
      color: player?.color || "lime",
    };
    return entity;
  }

  static async getPlayerInfos(username) {
    const data = await db.getPlayerInfos(username);
    if (data) {
      return new Player(data);
    } else {
      return null;
    }
  }

  static async insertPlayerIfNotExists(player) {
    const p = await db.getPlayerInfos(player.username);
    if (!p) {
      const entity = Player.getEntity(player);
      console.log(entity);
      await db.insertPlayer(entity);
    }
  }

  static async insertOrUpdatePlayer(player) {
    const entity = Player.getEntity(player);
    const p = await db.getPlayerInfos(player.username);
    if (p) {
      await db.updatePlayer(entity);
    } else {
      await db.insertPlayer(entity);
    }
  }

  static async insertPlayerToOnlineList(username) {
    await db.insertPlayerToOnlineList(username);
  }

  static async removePlayerFromOnlineList(username) {
    await db.removePlayerFromOnlineList(username);
  }
};
