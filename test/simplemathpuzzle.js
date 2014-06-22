var should = require('chai').should(),
    SimpleMathPuzzle =  require('../js/simplemathpuzzle.js')


describe('Simple Math Puzzle', function() {

    var simpleMathPuzzle = new SimpleMathPuzzle();

	it('#init', function() {
        should.exist(simpleMathPuzzle.init);
	});

});
