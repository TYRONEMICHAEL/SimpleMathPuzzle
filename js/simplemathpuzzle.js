// Specify our dependancies.
var $ = require('jquery/dist/jquery');

// Our Puzzle class.
var SimpleMathPuzzle = function(options) {
    this.options = options;
};

SimpleMathPuzzle.prototype.init = function() {
    console.log('Initializing our game...');
};

// Export our puzzle class module.
module.exports = SimpleMathPuzzle;
