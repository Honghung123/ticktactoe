const db = require("../database/db");
module.exports = class Room {
  constructor(room) {
    this.id = room.id;
    this.firstPlayer = room.firstPlayer;
    this.secondPlayer = room.secondPlayer == "" ? "" : room.secondPlayer;
    this.viewers = room.viewers;
      
  }

  static async getRoom(roomId) {
    const room = db.getRoomById(roomId);
    if (room) {
      return new Room(room);
    } else {
      return null;
    }
  }

  static getRoomList() {
    const roomList = db.getRoomList();
    return roomList;
  }

  static async insertRoom(player) {
    const data = await db.insertRoom(player); 
    return new Room(data);
  }
};
