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

module.exports = {
  findUserByUsername,
  insertUser,
};
