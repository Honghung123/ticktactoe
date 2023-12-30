const db = require("../database/db");
module.exports = class Player {
  constructor(player) {
    this.username = player.username;
    this.fullname = player.fullname;
    this.nickname = player.nickname;
    this.avatar = player.avatar;
    this.permissions = player.permissions;
    this.color = player?.color || "yellow";
  }

  static getEntity(player) {}

  static async getPlayerInfos(username) {
    const data = await db.getPlayerInfos(username);
    return data;
  }

  static async insertPlayerIfNotExists(player) {
    const p = await Player.getUserInfos(player.username);
    if (p) {
      return;
    }
    const entity = Player.getEntity(player);
    const p2 = await db.insertPlayer(entity);
    return p2;
  }

  static async insertPlayerToOnlineList(username) {
    await db.insertUserToOnlineList(username);
  }
};
