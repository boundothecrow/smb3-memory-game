let path = '../audio/';
let flipped = new Audio(path + 'flipped' + '.wav');
let success = new Audio(path + 'success' + '.wav');
let wrong = new Audio(path + 'wrong' + '.wav');

module.exports = {
    flipped: () => {
        flipped.play();
    },
    success: () => {
        success.play();
    },
    wrong: () => {
        wrong.play();
    }
}