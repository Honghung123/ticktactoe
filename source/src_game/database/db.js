const fs = require("fs/promises");
const path = require("path");
const data = require("./data.json");

async function saveToFile(data) {
  await fs.writeFile(
    path.join(__dirname, "data.json"),
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}

function getUserInfos(username) {
  for (const user of data.user_list) {
    if (user.username == username) {
      return user;
    }
  }
  return null;
}

async function insertPlayer(user) {
  data.user_list.push(user);
  const dataJSON = JSON.stringify(data);
  await saveToFile(dataJSON);
  return null;
}

async function insertPlayerToOnlineList(username) {
  if (!data.online_list.includes(username)) {
    data.online_list.push(user);
    const dataJSON = JSON.stringify(data);
    await saveToFile(dataJSON);
  }
}

module.exports = {
  getUserInfos,
  insertPlayer,
  insertPlayerToOnlineList,
};
