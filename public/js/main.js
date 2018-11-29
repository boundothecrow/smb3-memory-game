const game = require('./game');

// Initialize game
let Game = new game();

// Generate the board
Game.generate();

document.onclick = (e) => {
    if (e.target.className === 'card') {
        let cardId = e.target.id;
        let cardValue = Game.memoryValues[cardId];
        if (cardId === Game.cards[cardId].toString()) // This was the only way I could get it to work
        {
            Game.flipCard(e.target, 'card' + cardValue);
        }
    }
}