(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const play = require('./play');

const b = document.querySelector('#board');
let animPlaying = false;

/**
 * In order:
 * 1 - Mushroom
 * 2 - Flower
 * 3 - 10 Coins
 * 4 - 20 Coins
 * 5 - Star
 * 6 - 1-UP Chest
 * 2 extra Mushrooms, 10 coins and 20 coins to make sure it's an even count, and balanced
 */
let memoryValues = [1, 1, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 6, 6];
let flippedCards = []; // The cards that are currently flipped, to be compared
let flippedMatch = []; // Collection of cards that match
let cards = []; // A dumb method, but works
let rate = 1; // Rate of sound

// Shuffle the cards
shuffle(memoryValues);

// Found on StackOverflow.
// Thoughts kinda shuffled, so needed shuffle method to unshuffle
function shuffle(arr) {
    let j, x, i;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }
    return arr;
}

/**
 * Flip selected card, then check
 * @param {Element} obj The card ID to flip
 * @param {String} card Matching value for face card
 */
function flipCard(obj, card) {
    // If the card is not flipped, and the number of flipped cards is less than 2, and there is no animation already going
    if (canBeFlipped(obj) === true && flippedCards.length < 2 && animPlaying === false) {
        play.flipped(); // Play a sound
        flippedCards.push(obj.id); // Push the id of the flipped card
        animPlaying = !animPlaying; // Toggle that animation is playing
        obj.classList.add('flip'); // Flip the card, then wait 0.5 seconds to reveal the card
        // I'll be honest.  I tried using an event listener for animationend.  It was a mess.
        // So I'm going to do this method instead.  I seriously tried using event listeners, I promise
        setTimeout(() => {
            animPlaying = !animPlaying;
            obj.classList.remove('flip');
            obj.classList.add('card-face');
            obj.classList.add(card);
            // After flipping, if the number of flipped is 2, then flip them back
            if (flippedCards.length === 2) {
                let c1 = memoryValues[flippedCards[0]];
                let c2 = memoryValues[flippedCards[1]];
                let m = c1 === c2;
                if (m) {
                    flippedMatch.push(flippedCards[0], flippedCards[1]);
                    flippedCards.length = 0;
                    matchedAnimation();
                } else {
                    flipBack(card);
                }
            }
        }, 500);
    }
}

function canBeFlipped(obj) {
    for (let i = 0; i < flippedMatch.length; i++) {
        if (obj.id === flippedMatch[i]) {
            return false;
        } else {
            continue;
        }
    }

    if (obj.id === flippedCards[0] || obj.id === flippedCards[1]) {
        return false;
    } else {
        return true;
    }
}

// Flip the cards back
function flipBack() {
    let card1 = flippedCards[0];
    let card2 = flippedCards[1];
    let e1 = document.getElementById(card1);
    let e2 = document.getElementById(card2);
    play.wrong();
    setTimeout(() => {
        e1.className = 'card reverse-flip';
        setTimeout(() => { e1.className = 'card'; }, 500);
    }, 1000);
    setTimeout(() => {
        e2.className = 'card reverse-flip';
        setTimeout(() => { e2.className = 'card'; flippedCards.length = 0;  }, 500);
    }, 1500);
}

// When cards match, play match animation
function matchedAnimation() {
    b.className = 'board matched';
    animPlaying = !animPlaying;
    play.success(rate); // Play the sound, and change the rate
    rate += 0.05;
    setTimeout(() => {
        if (flippedMatch.length === 18) {
            winAnimation();
        } else {
            b.className = 'board';
            animPlaying = !animPlaying;
        }
    }, 2000);
}

// When the game is over, animate the background, and drop the 'you win' text
function winAnimation() {
    b.innerHTML += '<div class="winner" id="winner"></div>';
    let w = document.getElementById('winner');
    b.className = 'board winner-bg';
}

// Generate the cards
for (let i = 0; i < 18; i++) {
    cards.push(i);
    b.innerHTML += '<div class="card-selector"><div class="card" id="' + i + '"></div></div>';
}

document.onclick = (e) => {
    if (e.target.className === 'card') {
        let cardId = e.target.id;
        let cardValue = memoryValues[cardId];
        if (cardId === cards[cardId].toString())
        {
            flipCard(e.target, 'card' + cardValue);
        }
    }
}
},{"./play":2}],2:[function(require,module,exports){
let path = '../audio/';
let flipped = new Audio(path + 'flipped' + '.wav');
let success = new Audio(path + 'success' + '.wav');
let wrong = new Audio(path + 'wrong' + '.wav');

module.exports = {
    flipped: () => {
        flipped.play();
    },
    success: (rate) => {
        success.playbackRate = rate;
        success.play();
    },
    wrong: () => {
        wrong.play();
    }
}
},{}]},{},[1]);
