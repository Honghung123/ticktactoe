const db = require("../database/db");
module.exports = class User {
  constructor(user) {
    this.username = user.username;
    this.password = user.password;
    this.name = user.name;
    this.nickname = user.nickname;
  }

  static async getUserByUsername(username) {
    const data = await db.getUserByUsername(User.tableName, username);
    return data;
  }

  static async insertUser(user) {
    // const data = await db.add(User.tableName, user.Username);
    const data = null;
    return data;
  }
};
