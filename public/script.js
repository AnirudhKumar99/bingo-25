const loginScreen = document.querySelector(".login-screen");
const gameScreen = document.querySelector(".game-screen");
// const bingoBoard = document.querySelector(".bingo-board");
const messageArea = document.querySelector(".message-area");
const turn = document.querySelector(".turn");
let letters = [
  document.querySelector("#b-let"),
  document.querySelector("#i-let"),
  document.querySelector("#n-let"),
  document.querySelector("#g-let"),
  document.querySelector("#o-let"),
];
// const signinbtn = document.querySelector(".signin");
// console.log(signinbtn)
// signinbtn.addEventListener("touchstart", (e) => {
//   console.log("here");
//   e.preventDefault();
//   e.target.dispatchEvent(new Event("click"));
// });

// const urlPath = "http://localhost:3000";
const urlPath = window.location.href;
const numbers = [
  [19, 3, 13, 6, 16],
  [11, 17, 20, 15, 5],
  [21, 7, 23, 2, 24],
  [9, 1, 12, 25, 10],
  [8, 4, 18, 14, 22],
];
console.log(numbers);

const changeColor = (cell) => {
  console.log(cell.innerHTML);
  cell.style.backgroundColor = "#59DEE7";
};
const strikeLine = (dir, num) => {
  var cName = "";
  if (dir == "h") cName += ".str-hor" + String(num);
  if (dir == "v") cName += ".str-ver" + String(num);
  if (dir == "d") cName += ".str-dia" + String(num);
  console.log(cName);

  const line = document.querySelector(cName);
  line.style.zIndex = 1;
  line.style.backgroundColor = "#545454";
  line.style.border = "#545454 solid 1px";
  line.style.visibility = "visible";
};
const addNumbersToBoard = (numbers) => {
  const per = [6, 24, 42, 60, 78];
  // const per = [9, 27, 45, 63, 81];
  //   const per = [14, 32, 50, 68, 86];
  const bingoBoard = document.querySelector(".bingo-board");
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.style.position = "absolute";
      cell.style.top = String(per[i]) + "%";
      cell.style.left = String(per[j] - 1) + "%";
      cell.addEventListener("click", (e) => {
        crossNumber(numbers[i][j].num);
      });
      if (numbers[i][j].state == 0) {
        cell.style.backgroundColor = "#50C4E9";
      } else {
        cell.style.backgroundColor = "#59DEE7";
      }
      cell.innerHTML = String(numbers[i][j].num);
      cell.onclick = () => changeColor(cell);
      // console.log(cell.style.left)
      cell.style.fontSize = bingoBoard.appendChild(cell);
    }
  }
};

// addNumbersToBoard(numbers);

const setLoginScreen = () => {
  // logOut();

  document.querySelector(".name").value = "";
  document.querySelector(".passcode").value = "";
  document.location.href = urlPath + "";
  window.localStorage.removeItem("user");
  window.localStorage.removeItem("password");
  loginScreen.style.visibility = "visible";
  gameScreen.style.visibility = "hidden";
  gameScreen.remove();
};
window.onload = () => {
  const user = window.localStorage.getItem("user");
  const password = window.localStorage.getItem("password");
  if (user != null) {
    signIn(user, password);
  }
  console.log(user, password);
  // setLoginScreen();
};
const setGameScreen = (data) => {
  addNumbersToBoard(data);
  loginScreen.style.visibility = "hidden";
  gameScreen.style.visibility = "visible";
};

const signUp = async () => {
  const name = document.querySelector(".name").value;
  const password = document.querySelector(".passcode").value;

  console.log(name, password);

  const response = await fetch(urlPath + "/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
  console.log(messageArea.innerHTML);
  // const json=response.json();
  messageArea.innerHTML = response.message;
};

const signIn = async (uname, upassword) => {
  console.log("signin");
  let name = document.querySelector(".name").value || uname;
  let password = document.querySelector(".passcode").value || upassword;

  console.log(name, password);

  const response = await fetch(urlPath + "/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.status);
      return data;
    })
    .catch((err) => console.log(err));

  console.log(response);
  if (response.status) {
    window.localStorage.setItem("user", name);
    window.localStorage.setItem("password", password);
    if (response.game == undefined)
      window.localStorage.setItem("current", null);
    else window.localStorage.setItem("current", response.game.currentPlayer);
    setGameScreen(response.data);
  } else {
    window.location.href = urlPath + "/";
    messageArea.innerHTML = response.message;
  }

  // const json=response.json();
};
const logOut = async () => {
  const name = window.localStorage.getItem("user");
  console.log("herer");
  const response = await fetch(urlPath + "/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
    }),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
  setLoginScreen();
  window.localStorage.clear()
};

const crossNumber = async (num) => {
  const current = window.localStorage.getItem("current");
  const name = window.localStorage.getItem("user");
  if (current == name) {
    const response = await fetch(urlPath + "/number", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        num: num,
      }),
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
};

const addStrikes = (strikes) => {
  // console.log(strikes.r0);
  if(strikes.r0)strikeLine("h", 1);
  if(strikes.r1)strikeLine("h", 2);
  if(strikes.r2)strikeLine("h", 3);
  if(strikes.r3)strikeLine("h", 4);
  if(strikes.r4)strikeLine("h", 5);
  if(strikes.c0)strikeLine("v", 1);
  if(strikes.c1)strikeLine("v", 2);
  if(strikes.c2)strikeLine("v", 3);
  if(strikes.c3)strikeLine("v", 4);
  if(strikes.c4)strikeLine("v", 5);
  if(strikes.d1)strikeLine("d", 2);
  if(strikes.d2)strikeLine("d", 1);
};

const doSomething = (data) => {
  const name = window.localStorage.getItem("user");
  const current = window.localStorage.getItem("current");
  window.localStorage.setItem("current", data.game.currentPlayer);
  board = data.game.players[name].board;
  addNumbersToBoard(board);

  let players = Object.keys(data.game.players);
  // for(let player of players){
  //   console.log(player+':'+data.game.players[player].score);
  // }
  console.log("current:" + data.game.currentPlayer);
  console.log("score:" + data.game.players[name].score);
  const score = data.game.players[name].score;

  addStrikes(data.game.players[name].strikes);
  for (let i = 0; i < score; i++) {
    console.log("herer");
    // console.log(letters[0].backgroundColor)
    letters[i].style.backgroundColor = "#59DEE7";
  }

  if (data.game.gameOver) {
    window.clearInterval(gameTimer);
    window.localStorage.setItem("current", "gameover");
    console.log("gameover");
    console.log(current);
    turn.innerHTML = current + " Won";
    setTimeout(() => {
      logOut();
    }, 2500);
  } else {
    if (current == "null") turn.innerHTML = "Game not started";
    else if (current == name) turn.innerHTML = "Your Turn";
    else turn.innerHTML = current + "'s Turn";
  }
  // console.log(Object.keys(data.game.players))
};

let gameTimer = setInterval(async () => {
  if (window.localStorage.getItem("user")) {
    const response = await fetch(urlPath + "/data", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => doSomething(data))
      .catch((err) => console.log(err));
  }
}, 2000);
