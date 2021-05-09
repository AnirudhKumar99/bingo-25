class Game {
  constructor() {
    this.players = {};
    this.currentPlayer = null;
    this.numOfPlayers = 0;
    this.gameStarted = false;
    this.gameOver=false;
    // this.startGame();
  }
  addPlayer(name) {
    if (!this.gameStarted) {
      const player = new Player(name);
      this.players[player.name] = player;
      this.currentPlayer = null;
    } else {
      return false;
    }
  }
  startGame() {
    this.gameStarted = true;
    this.gameNumbers = Array(25)
      .fill()
      .map((_, id) => {
        return { num: id + 1, state: 0 };
      });
    console.log("start game:", this.numbers);
    this.currentId = 0;
    this.currentPlayer = Object.keys(this.players)[this.currentId];
    this.numOfPlayers = Object.keys(this.players).length;
  }
  displayState() {
    for (let player of Object.keys(this.players)) {
      console.table(this.players[player].board);
    }
  }
  removePlayer(name) {
    delete this.players[name];
  }
  crossNumber(num) {
    console.log(this.gameNumbers);
    if (this.gameStarted && this.gameNumbers[num - 1].state != 1) {
      for (let name of Object.keys(this.players)) {
        this.players[name].crossNumber(num);
        this.players[name].calculateScore();
      }
      for (let name of Object.keys(this.players)) {
      if(this.players[name].score==5){
        this.gameOver=true;
        this.gameStarted=false;
        return true;
      }
      }

      this.currentId = (this.currentId + 1) % this.numOfPlayers;
      this.currentPlayer = Object.keys(this.players)[this.currentId];

      return true;
    } else {
      return false;
    }
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.setBoard();
    this.strikes = {
      r0: false,
      r1: false,
      r2: false,
      r3: false,
      r4: false,
      c0: false,
      c1: false,
      c2: false,
      c3: false,
      c4: false,
      d1: false,
      d2: false,
    };
  }
  setBoard() {
    const numbers = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
    ];
    for (let i = 0; i < 25; i++) {
      let r1 = Math.floor(Math.random() * 25);
      let r2 = Math.floor(Math.random() * 25);
      let temp = numbers[r1];
      numbers[r1] = numbers[r2];
      numbers[r2] = temp;
    }
    this.board = [];
    for (let i = 0; i < 5; i++) {
      let row = [];
      for (let j = 0; j < 5; j++) {
        row.push({ num: numbers[i * 5 + j], state: 0 });
      }
      this.board.push(row);
    }
  }

  calculateScore() {
    this.score = 0;
    let d1 = 0,
      d2 = 0;
    for (let i = 0; i < 5; i++) {
      d1 += this.board[i][i].state;
      d2 += this.board[i][4 - i].state;
    }
    this.strikes['d1']=(d1==5)
    this.strikes['d2']=(d2==5)

    this.score += (d1 == 5) + (d2 == 5);

    for (let i = 0; i < 5; i++) {
      let r = 0,
        c = 0;
      for (let j = 0; j < 5; j++) {
        r += this.board[i][j].state;
        c += this.board[j][i].state;
      }
      this.strikes['r'+String(i)]=(r==5)
      this.strikes['c'+String(i)]=(c==5)
      this.score += (r == 5) + (c == 5);
    }
  }
  crossNumber(num) {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (this.board[i][j].num == num) {
          this.board[i][j].state = 1;
        }
      }
    }
  }
}

module.exports = { Game, Player };
