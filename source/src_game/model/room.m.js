const db = require("../database/db");
module.exports = class Room {
  constructor(room) {
    this.id = user.id;
    this.firstUser = room.firstUser;
    this.secondUser = room.secondUser;
      this.viewers = room.viewers;
      
  }

  static async getRoom(username) {
    const data = await db.getUserByUsername(User.tableName, username);
    return data;
  }

  static async insertUser(user) {
    // const data = await db.add(User.tableName, user.Username);
    const data = null;
    return data;
  }
};
