const loginScreen = document.querySelector(".login-screen");
const gameScreen = document.querySelector(".game-screen");
// const bingoBoard = document.querySelector(".bingo-board");

const numbers = [
  [19, 3, 13, 6, 16],
  [11, 17, 20, 15, 5],
  [21, 7, 23, 2, 24],
  [9, 1, 12, 25, 10],
  [8, 4, 18, 14, 22],
];
console.log(numbers);

const changeColor=(cell)=>{
    console.log(cell.innerHTML)
    cell.style.backgroundColor='#59DEE7'
    // strikeLine('h',1)
    // strikeLine('h',2)
    // strikeLine('h',3)
    // strikeLine('h',4)
    // strikeLine('h',5)

    // strikeLine('v',1)
    // strikeLine('v',2)
    // strikeLine('v',3)
    // strikeLine('v',4)
    // strikeLine('v',5)

    // strikeLine('d',1)
    // strikeLine('d',2)

}
const strikeLine=(dir,num)=>{
    var cName=''
    if(dir=='h')cName+='.str-hor'+String(num);
    if(dir=='v')cName+='.str-ver'+String(num);
    if(dir=='d')cName+='.str-dia'+String(num);
    console.log(cName)
    
    const line=document.querySelector(cName);
    line.style.zIndex=1;
    line.style.backgroundColor='#545454'
    line.style.border='#545454 solid 1px'
    line.style.visibility='visible'
}
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
      cell.style.backgroundColor = "#50C4E9";
      cell.innerHTML = String(numbers[i][j]);
      cell.onclick=(()=>changeColor(cell))
      // console.log(cell.style.left)
      cell.style.fontSize = bingoBoard.appendChild(cell);
    }
  }
};

addNumbersToBoard(numbers);

const setLoginScreen = () => {
  loginScreen.style.visibility = "visible";
  gameScreen.style.visibility = "hidden";
  gameScreen.remove();
};

const setGameScreen = () => {
  loginScreen.style.visibility = "hidden";
  gameScreen.style.visibility = "visible";
};
