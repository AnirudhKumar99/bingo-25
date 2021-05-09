const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const cors = require("cors");
const dbPath = "./database.json";
const { Game, Player } = require("./game");
let players = [];
let game = new Game();

const fetchUsers = () => {
  let rawData = fs.readFileSync(dbPath);
  let data = JSON.parse(rawData);
  let users = data["users"];
  return users;
};

const addUser = (name, password) => {
  const users = fetchUsers();
  let newUser = { name, password };
  users.push(newUser);
  let database = { users: users };
  let newData = JSON.stringify(database);
  fs.writeFileSync(dbPath, newData);
};

// addUser('Ani','gvak')
// let newUser = { name: "Anirudh Kumar", password: "paaswoord" };
// users.push(newUser);
// // console.log(users)
// let database={"users":users}
// let newData=JSON.stringify(database);
// fs.writeFileSync('database.json',newData)

const userNameExists = (name) => {
  const users = fetchUsers();
  for (let user of users) {
    if (user.name == name) {
      console.log("User exists");
      return true;
    }
  }
  console.log("UserName does not exist");
  return false;
};
const userExists = (name, password) => {
  const users = fetchUsers();

  for (let user of users) {
    if (user.name == name && user.password == password) {
      console.log("User exists");
      return true;
    }
  }
  console.log("User does not exist");
  return false;
};

// userExists("Anirudh","password")

const app = express();
const router = express.Router();
const port = 3000;

app.use(express.static("public"));
app.use(morgan("dev"));
app.use(cors());
// app.use(bodyParser.json())
// app.use(express.urlencoded({extended:false}))
app.use(express.json());

// app.get('/a',(req,res)=>{
//     res.json({
//         "message":"Hello world"
//     })
// })

// const GameChanges = (name) => {
//   if (players.length == 0) {
//     game = new Game();
//     players.push(name);
//     game.addPlayer(name);
//   } else {
//     if (!players.includes(name)) {
//       players.push(name);
//     }
//     game.addPlayer(name);
//   }
//   console.log(game.players);
// };
// const game=new Game();

app.post("/signup", (req, res) => {
  const user = req.body;
  const { name, password } = user;
  const status = userNameExists(name);

  if (status) {
    res.json({
      message: "userName taken",
    });
  } else {
    addUser(name, password);
    res.json({
      message: "User Added signin",
    });
  }
});

app.post("/signin", (req, res) => {
  const user = req.body;
  console.log(user);
  const userExistsStatus = userNameExists(user.name);
  const status = userExists(user.name, user.password);
  console.log("Game:"+game.gameStarted);

  if(game.gameStarted){
    res.json({
      status:false,
      message:"Game started already"
    })
    return;
  }
  else{
  if (userExistsStatus) {
    if (status) {
      if (!players.includes(user.name)) {
        players.push(user.name);
        game.addPlayer(user.name);
      }

      // GameChanges(user.name);
      console.log(players);
      res.json({
        status: status,
        message: "signin successfull",
        data: game.players[user.name].board,
      });
    } else {
      res.json({
        status: status,
        message: "invalid credentials",
      });
    }
  } else {
    res.json({
      status: userExistsStatus,
      message: "Username does not exist. Signup",
    });
  }}
});

app.post("/start",(req,res)=>{
  game.startGame();
  res.json({
    status:true,
    message:"Game Started"
  })
})

app.post("/logout", (req, res) => {
  players = players.filter((player) => player != req.body.name);
  game.removePlayer(req.body.name);
  console.log(game.players);
  res.json({
    status: true,
    message: "Logged out",
  });
  console.log(players);
});

app.get("/data", (req, res) => {
  res.json({
    game,
  });
});

app.post("/number", (req, res) => {
  const status = game.crossNumber(req.body.num);
  game.displayState();
  if (status) {
    res.json({
      status: status,
      message: "number updated",
    });
  } else {
    res.json({
      status: status,
      message: "number not updated",
    });
  }
});

app.listen(port, () =>
  console.log(`app running on port ${port} use http://localhost:${port}`)
);
