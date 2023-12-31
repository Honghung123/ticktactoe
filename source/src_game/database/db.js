const fs = require("fs/promises");
const path = require("path");
const data = require("./data.json");

async function saveToFile(data) {
  await fs.writeFile(
    path.join(__dirname, "data.json"),
    JSON.stringify(data, null, 3),
    "utf-8"
  );
}

function getPlayerInfos(username) {
  for (const player of data.player_list) {
    if (player.username == username) {
      return player;
    }
  }
  return null;
}

async function insertPlayer(player) {
  data.player_list.push(player); 
  await saveToFile(data);
  return data;
}

async function updatePlayer(player) {
  let updatedPlayer = null;
  for (let i = 0; i < data.player_list.length; i++){
    if (data.player_list[i].username == player.username) {
      data.player_list[i].color = player.color;
      if (player?.fullname) {
        data.player_list[i].profile.fullname = player.fullname;
      }
      data.player_list[i].profile.nickname = player.nickname;
      data.player_list[i].profile.avatar = player.avatar;
      data.player_list[i].color = player?.color || "lime";
      updatePlayer = data.player_list[i];
    }
  } 
  await saveToFile(data);
  return updatePlayer;
}

async function insertPlayerToOnlineList(username) {
  if (!data.online_list.includes(username)) {
    data.online_list.push(username); 
    await saveToFile(data);
  }
}

async function clearUserOnlineList() {
  data.online_list = [];
  await saveToFile(data);
}

async function removePlayerFromOnlineList(username) {
  const idx = data.online_list.findIndex((p) => {
    return p.username = username;
  });
  if (idx !== -1) { 
    data.online_list.splice(idx,1);
    await saveToFile(data);
  } 
}

function getPlayerOnlineList() { 
  return data.online_list;
}

function getRoomById(id) {
  for (const room of data.room_list) {
    if (room.id == id) {
      return room;
    }
  }
  return null;
}

function getRoomList() {
  return data.room_list;
}

function generateRoomId() {
  let maxId = 1;
  console.log(data.room_list);
  for (const room of data.room_list) { 
    console.log(room);
    if (room.id > maxId) { 
      maxId = room.id;
    }
  }
  return maxId;
}

async function insertRoom(username) {
  const id = generateRoomId(); 
  const insertRoom = {
    id: id + 1,
    firstPlayer: username,
    secondPlayer: null,
    viewers: []
  }
  data.room_list.push(insertRoom);
  await saveToFile(data);
  return insertRoom;
}

function getRoomOfPlayer(username) {
  for (const room of data.room_list) {
    if (room.firstPlayer == username || room.secondPlayer == username) {
      return room;
    }
  }
  return null;
}

module.exports = {
  getPlayerInfos,
  insertPlayer,
  updatePlayer,
  insertPlayerToOnlineList,
  removePlayerFromOnlineList,
  getPlayerOnlineList,
  clearUserOnlineList,

  getRoomById,
  getRoomList,
  insertRoom,
  getRoomOfPlayer,
};
