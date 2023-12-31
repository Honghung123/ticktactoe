const db = require("../database/db");
const default_url_image = "./src_game/public/uploads/main.png";
module.exports = class Player {
  constructor(player) {
    this.username = player.username;
    this.fullname = player.profile?.fullname || "";
    this.nickname = player.profile?.nickname || player.username;
    this.avatar = player.profile?.avatar || default_url_image;
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

  static getPlayerInfos(username) {
    const data = db.getPlayerInfos(username);
    if (data) {
      return new Player(data);
    } else {
      return null;
    }
  }

  static toOject(player) {
    return {
      username: player.username,
      fullname: player.fullname,
      nickname: player.nickname,
      avatar: player.avatar,
      get_img_src: player.get_img_src,
      color: player.color,
    };
  }

  static async insertPlayerIfNotExists(player) {
    const p = await db.getPlayerInfos(player.username);
    if (!p) {
      const entity = Player.getEntity(player);
      await db.insertPlayer(entity);
    }
  }

  static async insertOrUpdatePlayer(player) {
    const p = await db.getPlayerInfos(player.username);
    if (p) {
      await db.updatePlayer(player);
    } else {
      const entity = Player.getEntity(player);
      await db.insertPlayer(entity);
    }
  }

  static async insertPlayerToOnlineList(username) {
    await db.insertPlayerToOnlineList(username);
  }

  static async removePlayerFromOnlineList(username) {
    await db.removePlayerFromOnlineList(username);
  }

  static getPlayerOnlineList() {
    return db.getPlayerOnlineList();
  }

  static async clearUserOnlineList() {
    return await db.clearUserOnlineList();
  }

  static async updateProfile(profile) {
    const data = await db.updatePlayer(profile);
    return new Player(data);
  }

  static getRoomById(id) {
    const room = db.getRoomById(id);
    return {
      id: room.id,
      firstPlayer: room.firstPlayer,
      secondPlayer: room.secondPlayer,
      viewers: room.viewers,
    };
  }

  static getRoomOfPlayer(username) {
    const room = db.getRoomOfPlayer(username);
    return {
      id: room.id,
      firstPlayer: room.firstPlayer,
      secondPlayer: room.secondPlayer,
      viewers: room.viewers,
    };
  }
};
