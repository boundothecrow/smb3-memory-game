const play = require('./play');

const b = document.querySelector('#board');
function game() {
    let animPlaying = false;
    /**
     * In order:
     * (1: Mushroom)
     * (2: Flower)
     * (3: 10 Coins)
     * (4: 20 Coins)
     * (5: Star)
     * (6: 1-UP Chest)
     * 2 extra Mushrooms, 10 coins and 20 coins to make sure it's an even count, and balanced
     */
    this.memoryValues = [1, 1, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 6, 6];
    
    /** Cards that are currently flipped, then compared*/
    this.flippedCards = [];
    
    /** Collection of cards that matched */
    this.flippedMatch = [];


    /** All the cards stored in the array.  It's a bit dumb, but it works */
    this.cards = [];

    /** Shuffle cards */
    this.shuffle = function (arr) {
        let j, x, i;
        for (i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = arr[i];
            arr[i] = arr[j];
            arr[j] = x;
        }
        return arr;
    }

    // Shuffle the cards
    this.shuffle(this.memoryValues);

    /**
     * Flip selected card, then check
     * @param {Element} obj The card ID to flip
     * @param {String} card Matching value for face card
     */
    this.flipCard = function (obj, card) {
        // If the card is not flipped, and the number of flipped cards is less than 2, and there is no animation already going
        if (this.canBeFlipped(obj) === true && this.flippedCards.length < 2 && animPlaying === false) {
            play.flipped();
            this.flippedCards.push(obj.id); // Push the id of the flipped card to the array
            animPlaying = !animPlaying;
            obj.classList.add('flip'); // Flip the card, then wait 0.5 seconds to reveal the card
            setTimeout(() => {
                animPlaying = !animPlaying;
                obj.classList.remove('flip');
                obj.classList.add('card-face');
                obj.classList.add(card);
                // After flipping, if the number of flipped is 2, then flip them back
                if (this.flippedCards.length === 2) {
                    let c1 = this.memoryValues[this.flippedCards[0]];
                    let c2 = this.memoryValues[this.flippedCards[1]];
                    let m = c1 === c2;
                    if (m) {
                        this.flippedMatch.push(this.flippedCards[0], this.flippedCards[1]);
                        this.flippedCards.length = 0;
                        this.matchedAnimation();
                    } else {
                        this.flipBack(card);
                    }
                }
            }, 500);
        }
    }

    /** Check to see if cards are flipped already or not */
    this.canBeFlipped = function (obj) {
        for (let i = 0; i < this.flippedMatch.length; i++) {
            if (obj.id === this.flippedMatch[i]) {
                return false;
            } else {
                continue;
            }
        }

        if (obj.id === this.flippedCards[0] || obj.id === this.flippedCards[1]) {
            return false;
        } else {
            return true;
        }
    }

    /** Flip the cards back */
    this.flipBack = function () {
        let card1 = this.flippedCards[0];
        let card2 = this.flippedCards[1];
        let e1 = document.getElementById(card1);
        let e2 = document.getElementById(card2);
        play.wrong();
        setTimeout(() => {
            e1.className = 'card reverse-flip';
            setTimeout(() => { e1.className = 'card'; }, 500);
        }, 1000);
        setTimeout(() => {
            e2.className = 'card reverse-flip';
            setTimeout(() => { e2.className = 'card'; this.flippedCards.length = 0; }, 500);
        }, 1500);
    }

    /** When the cards match, play animation (background image) */
    this.matchedAnimation = function () {
        b.className = 'board matched';
        animPlaying = !animPlaying;
        play.success(); // Play the sound
        setTimeout(() => {
            if (this.flippedMatch.length === 18) {
                this.winAnimation();
            } else {
                b.className = 'board';
                animPlaying = !animPlaying;
            }
        }, 2000);
    }

    // When the game is over, animate the background, and drop the 'you win' text
    this.winAnimation = function () {
        b.innerHTML += '<div class="winner" id="winner"></div>';
        let w = document.getElementById('winner');
        b.className = 'board winner-bg';
    }

    // Generate the cards
    this.generate = function () {
        for (let i = 0; i < 18; i++) {
            this.cards.push(i);
            b.innerHTML += '<div class="card-selector"><div class="card" id="' + i + '"></div></div>';
        }
    }
}

module.exports = game;