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
  data.user_list.push(user);
  dataJSON = JSON.stringify(data, null, 3);
  await fs.writeFile(path.join(__dirname, "data.json"), dataJSON, "utf-8");
    return user;
}

async function updateUser(user) {
  const prefix = "https://localhost:3113";
  let updateUser = null;
  for (let i = 0; i < data.user_list.length; i++) { 
    if (data.user_list[i].username == user.username) { 
      updateUser = data.user_list[i];
      if (user?.nickname) {
        data.user_list[i].profile.nickname = user.nickname;
      }
      if (user?.fullname) {
        data.user_list[i].profile.fullname = user.fullname;
      }
      if (user.avatar.startsWith(prefix)) {
        data.user_list[i].profile.avatar = user.avatar.replace(prefix, "")+ ".";
      } else {
        data.user_list[i].profile.avatar = user.avatar;
      }
      break;
    }
  }
  dataJSON = JSON.stringify(data, null, 3);
  await fs.writeFile(path.join(__dirname, "data.json"), dataJSON, "utf-8");
  return updateUser;
}

async function updatePermissions(username, permissions, maxAge) { 
  let result = false;
  for (let i = 0; i < data.user_list.length; i++) {
    if (data.user_list[i].username == username) { 
      data.user_list[i].permissions = permissions;
      data.user_list[i].maxAge = maxAge;
      result = true;
      console.log("Updated Permissions: " + username);
      break;
    }
  }
  dataJSON = JSON.stringify(data, null, 3);
  await fs.writeFile(path.join(__dirname, "data.json"), dataJSON, "utf-8");
  return result;
}

module.exports = {
  findUserByUsername,
  insertUser,
  updateUser,
  updatePermissions,
};
