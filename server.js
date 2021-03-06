const express = require("express");
const app = express();
const http = require("http").createServer(app);
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const dotenv = require("dotenv");
const io = require("socket.io")(http);
const Chat = require("./models/ChatModel");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;
const CORS_ORIGIN =
  process.env.NODE_ENV === "production"
    ? "https://af-issue-tracker.herokuapp.com/"
    : "localhost:3000";

//Using .env variables for dev
dotenv.config();

app.use(cors({ credentials: true, origin: CORS_ORIGIN }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static());
app.use(
  session({
    secret: process.env.session_secret,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Setting up mongoDB
const connect = mongoose
  .connect(process.env.mongoURI, {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Successfully connected to the database"))
  .catch((err) => console.log("Error occured when connecting to the database"));

//Serve static assests if in production
app.use("/images", express.static("images"));
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));
}

//Routes
app.use("/api", require("./routes/UserRoutes"));

app.get("/*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "client", "build", "index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

//Socket IO

io.on("connection", (socket) => {
  socket.on("Team Chat Message", (data) => {
    console.log("Message data");
    console.log(data);
    connect.then((db) => {
      try {
        let chat = new Chat({
          message: data.message,
          sender: data.userId,
          teamId: data.teamId,
        });

        chat.save((err, doc) => {
          if (err) {
            return res.status(500).json({ success: false });
          }

          // io.emit('Output Chat Message', doc);
          // socket.broadcast.emit('Output Chat Message', doc);

          Chat.findById(doc._id)
            .populate("sender")
            .exec(function (err, chat) {
              return io.emit("Output Chat Message", chat);
            });
        });
      } catch (err) {
        console.err(err);
        return res.status(500).json({ success: false });
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("User has left");
  });
});

http.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
