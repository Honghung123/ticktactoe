// Import module
require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const https = require("https");
const handlebar = require("express-handlebars");
const fs = require("fs");

// Delete all uploaded files
const directory = path.join(__dirname, "src_auth/public/uploads");
for (const file of fs.readdirSync(directory)) {
  fs.unlinkSync(path.join(directory, file));
}

// This line is from the Node.js HTTPS documentation.
const credentials = {
  key: fs.readFileSync("mykey.pem", "utf-8"),
  cert: fs.readFileSync("cert.pem", "utf-8"),
};

app.use(express.json());
app.use("/src_auth/public", express.static(path.join(__dirname, "src_auth/public")));
app.use(express.urlencoded({ extended: true }));

app.engine(
  "hbs",
  handlebar.engine({
    extname: "hbs",
  })
);
app.set("views", "./src_auth/views");
app.set("view engine", "hbs");

// Auth route
const authRouter = require("./src_auth/routers/auth.r");
app.use("/", authRouter);

// Middleware
const middleware = require("./src_auth/middlewares/mdw");
app.use(middleware.badRequest);
app.use(middleware.internalServer);

// Connection
const port = process.env.AUTH_PORT;
https.createServer(credentials, app).listen(port, () => {
  console.log("Server Auth is listening on port " + port);
});
