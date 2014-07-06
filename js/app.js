// Browserify and application entry point.
var $ = require('jquery/dist/jquery'),
    SimpleMathPuzzle = require('./simplemathpuzzle'),
    puzzle = require('./puzzle'),
    simpleMathPuzzle = new SimpleMathPuzzle(puzzle);

$('#puzzle').empty().append(simpleMathPuzzle.$el);
