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
  for (let i = 0; i < data.player_list.length; i++){
    if (data.player_list[i].username == player.username) {
      data.player_list[i] = player;
    }
  } 
  await saveToFile(data);
  return data;
}

async function insertPlayerToOnlineList(username) {
  if (!data.online_list.includes(username)) {
    data.online_list.push(username); 
    await saveToFile(data);
  }
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

module.exports = {
  getPlayerInfos,
  insertPlayer,
  updatePlayer,
  insertPlayerToOnlineList,
  removePlayerFromOnlineList,
  getPlayerOnlineList,
};
