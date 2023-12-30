const db = require("./../database/db");
module.exports = class User {
  constructor(user) {
    this.username = user.username;
    this.password = user.password;
    this.name = user.name;
    this.nickname = user.nickname;
  }

  static async findUserByUsername(username) {
    const data = await db.findUserByUsername(username);
    return data;
  }

  static async insertUser(user) {
    const data = await db.insertUser(user);
    return data;
  }
};
