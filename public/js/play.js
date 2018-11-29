/**
 * Audio controller.  Simplistic, but scalable
 */

let path = 'https://raw.githubusercontent.com/zeechapman/smb3-memory-game/master/public/audio/';
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