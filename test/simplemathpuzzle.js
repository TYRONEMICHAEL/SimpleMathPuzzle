/*jshint -W030 */
var should = require('chai').should(),
    benv = require('benv'),
    _ = require('underscore'),
    puzzle = require('../js/puzzle');

describe('Simple Math Puzzle', function () {

    var SimpleMathPuzzle, mathPuzzle;

    beforeEach(function (done) {
        benv.setup(function () {
            benv.expose({
                $: require('jquery/dist/jquery')
            });
            SimpleMathPuzzle = require('../js/simplemathpuzzle');
            mathPuzzle = new SimpleMathPuzzle(puzzle);
            done();
        });
    });

    afterEach(function () {
        benv.teardown();
        mathPuzzle.remove();
    });

    it('#constructor', function () {
        var $game = mathPuzzle.$el;
        should.exist(mathPuzzle.puzzle);
        should.exist(mathPuzzle.currentPath);
        should.exist(mathPuzzle.$el);
        mathPuzzle.$el.attr('id').should.equal('simplemathpuzzle');
    });

    it('#render', function() {
        var $game = mathPuzzle.$el;

        $game.find('tr').length
            .should.equal(puzzle.grid.length);
		$game.find('tr td').length
			.should.equal(puzzle.grid.length * puzzle.grid[0].length);
		$game.find('tr td').first().html()
            .should.equal(puzzle.grid[0][0].toString());
        $game.find('button').length.should.equal(1);
    });

    it('#getCoordsOfGridItem', function() {
		var $game = mathPuzzle.$el,
            $gridItem = $game.find('tr').eq(5).find('td').eq(5),
            coords = mathPuzzle.getCoordsOfGridItem($gridItem);

        _.isEqual(coords, [5,5]).should.be.true;
	});

    it('#getGridItem', function() {
		var $gridItem;

		$gridItem = mathPuzzle.getGridItem([10,10]);
		$gridItem.length.should.equal(0);
		$gridItem = mathPuzzle.getGridItem([1,1]);
		$gridItem.length.should.equal(1);
	});

    it('#clickedStart', function() {
		mathPuzzle.clickedStart([5,5]).should.be.false;
		mathPuzzle.clickedStart(puzzle.start).should.be.true;
	});

    it('#hasCompleted', function() {

        mathPuzzle.currentPath.push(puzzle.start);
        mathPuzzle.hasCompleted().should.be.false;

        mathPuzzle.currentPath = [];
        _.each(puzzle.path, function(step) {
            mathPuzzle.currentPath.push(step);
        });
        mathPuzzle.hasCompleted().should.be.true;
    });

    it('#canMove', function() {
		var path;

		// Lets Move
		mathPuzzle.currentPath.push([4,4]);
		mathPuzzle.canMove([7,7]).should.be.false;
		mathPuzzle.canMove([4,3]).should.be.true;
		mathPuzzle.canMove([5,3]).should.be.false;
		mathPuzzle.canMove([5,4]).should.be.true;
		mathPuzzle.canMove([5,5]).should.be.false;
		mathPuzzle.canMove([4,5]).should.be.true;
		mathPuzzle.canMove([3,5]).should.be.false;
		mathPuzzle.canMove([3,4]).should.be.true;

		// Lets Move to a corner
        mathPuzzle.currentPath = [];
		mathPuzzle.currentPath.push(puzzle.start);
		mathPuzzle.canMove([0,6]).should.be.false;
		mathPuzzle.canMove([0,4]).should.be.true;
		mathPuzzle.canMove([1,4]).should.be.false;
		mathPuzzle.canMove([1,5]).should.be.true;

		// Lets follow the path
        mathPuzzle.currentPath = [];
        mathPuzzle.currentPath.push(puzzle.start);
        path = puzzle.path.slice(1, puzzle.path.length);
		_.each(path, function(coords){
			mathPuzzle.canMove(coords).should.be.true;
            mathPuzzle.currentPath.push(coords);
		});
	});

    it('highlightGridItem', function() {
        var puzzle = mathPuzzle.puzzle;

		$gridItem = mathPuzzle.$el.find('tr').eq(5)
			.find('td').eq(5).trigger('click');
		$gridItem.hasClass('path--selected').should.be.false;

		$gridItem = mathPuzzle.$el.find('tr').eq(puzzle.start[1])
			.find('td').eq(puzzle.start[0]).trigger('click');
		$gridItem.hasClass('path--selected').should.be.true;
	});

    it('resetGame', function() {
        var puzzle = mathPuzzle.puzzle;

		mathPuzzle.$el.find('tr').eq(puzzle.start[1])
			.find('td').eq(puzzle.start[0]).trigger('click');

		mathPuzzle.$el.find('.path--selected').length.should.equal(1);
		mathPuzzle.currentPath.length.should.equal(1);
		mathPuzzle.$el.find('button').trigger('click');
		mathPuzzle.$el.find('.path--selected').length.should.equal(0);
		mathPuzzle.currentPath.length.should.equal(0);
	});

});
