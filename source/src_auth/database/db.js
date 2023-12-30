const data = require("./data.json");
const path = require("path");
const fs = require("fs/promises");

function findUserByUsername(username) {
  for (const user of data.user_list) {
    if (user.username == username) {
      return user;
    }
  }
  return null;
}

async function insertUser(user) {
  console.log(user);
  data.user_list.push(user);
  dataJSON = JSON.stringify(data, null, 3);
  await fs.writeFile(path.join(__dirname, "data.json"), dataJSON, "utf-8");
    return user;
}

async function updateUser(user) {
  let updateUser = null;
  for (let i = 0; i < data.user_list.length; i++) { 
    if (data.user_list[i].username == user.username) { 
      updateUser = data.user_list[i];
      data.user_list[i].profile.nickname = user.nickname;
      data.user_list[i].profile.fullname = user.fullname;
      data.user_list[i].profile.avatar = user.avatar;
      break;
    }
  }
  dataJSON = JSON.stringify(data, null, 3);
  await fs.writeFile(path.join(__dirname, "data.json"), dataJSON, "utf-8");
  return updateUser;
}

module.exports = {
  findUserByUsername,
  insertUser,
  updateUser,
};
