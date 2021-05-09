const {Game,Player}=require('./game.js')


const game=new Game();

game.addPlayer('Anirudh')
game.addPlayer('Kumar')


console.table(game.players['Anirudh'].board)
console.table(game.players['Kumar'].board)

// game.startGame();

game.crossNumber(1)
game.crossNumber(2)
game.crossNumber(3)
game.crossNumber(4)
game.crossNumber(5)


console.table(game.players['Anirudh'].board)
console.table(game.players['Kumar'].board)

game.players['Anirudh'].calculateScore();
game.players['Kumar'].calculateScore();


console.log(game.players['Anirudh'].score)
console.log(game.players['Kumar'].score)
// const p1=new Player();
// console.log(p1.board);