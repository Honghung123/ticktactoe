// Import module
require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const handlebar = require("express-handlebars");

// Delete all uploaded files
// const fs = require("fs");
// const directory = path.join(__dirname, "src_game/public/uploads");
// for (const file of fs.readdirSync(directory)) {
//   fs.unlinkSync(path.join(directory, file));
// }

// Session - Cookie
const secretKey = process.env.SECRET_KEY2;
app.use(cookieParser(secretKey));
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 15 * 60 * 1000,
    },
  })
);

app.use(express.json());
app.use("/src_game/public", express.static(path.join(__dirname, "src_game/public")));
app.use(express.urlencoded({ extended: true }));

app.engine(
  "hbs",
  handlebar.engine({
    extname: "hbs" 
  })
);
app.set("views", "./src_game/views");
app.set("view engine", "hbs");

require("./src_game/config/passport")(app);

// Login
const loginRegistration = require("./src_game/routers/authorization.r");
app.use("/", loginRegistration);

// Socket io
// const io = new Server(server);
// io.on("connection", (client) => {
//   client.on("chanel1", (data) => {
//     console.log(
//       `Client(${data.username}) sent to server with message: ${data.message}`
//     );
//     io.emit("chanel1", data);
//   });
//   client.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });
 
const authorization = require("./src_game/middlewares/authorization");
app.use(authorization.authorize);

// Routing
const gameRouter = require("./src_game/routers/game.r");
app.use("/", gameRouter);

// Middleware
const middleware = require("./src_game/middlewares/mdw");
app.use(middleware.badRequest);
app.use(middleware.internalServer);

// Connection
const port = process.env.GAME_PORT;
server.listen(port, () => {
  console.log(`Server Game is running at ${port}`);
});
