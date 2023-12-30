const db = require("./../database/db");
module.exports = class User {
  constructor(user) {
    this.username = user.username;
    this.password = user.password;
    this.nickname = user.profile.nickname;
    this.fullname = user.profile.fullname; 
    this.avatar = user.profile.avatar;
  }

  static createEntity(user) {
    const entity = {
      username: user.username,
      password: user.password,
      profile: {
        nickname: user.nickname, 
        fullname: user.fullname || "Anonymous player",
        avatar: "https://localhost:3113/src_auth/public/uploads/3.png",
      },
    }; 
    return entity;
  }

  static async findUserByUsername(username) {
    const data = await db.findUserByUsername(username);
    if (data) {
      return new User(data);
    }
    return null;
  }

  static async insertUser(user) {
    const entity = User.createEntity(user);
    const data = await db.insertUser(entity);
    if (data) {
      return new User(data);
    }
    return null;
  }
};
