// Specify our dependancies.
var $ = require('jquery/dist/jquery'),
    _ = require('underscore');

// Our Puzzle class.
var SimpleMathPuzzle = function(puzzle) {
    this.puzzle = puzzle;
    this.currentPath = [];
    this.$el = $('<div></div>').attr('id', 'simplemathpuzzle');
    this.render();
    this.delegateEvents();
};

SimpleMathPuzzle.prototype = (function() {

    return {
        constructor: SimpleMathPuzzle,

        delegateEvents: function() {
            this.$el.on('click', 'td' , _.bind(this.highlightGridItem, this));
            this.$el.on('click', 'td' , _.bind(this.alertOnComplete, this));
            this.$el.on('click', 'button' , _.bind(this.reset, this));
        },

        render: function() {
            var $table = $('<table></table>'),
                $button = $('<button></button>').text('Reset'),
                grid = this.puzzle.grid;

            grid.forEach(function(row) {
                var $row = $('<tr></tr>');
                row.forEach(function(column) {
                    var $column = $('<td></td>').text(column);
                    $row.append($column);
                });
                $table.append($row);
            });

            this.$el.empty().append($table, $button);

            return this;
        },

        getCoordsOfGridItem: function($gridItem) {
            var coords = [];
            coords.push($gridItem.index());
            coords.push($gridItem.parent().index());
            return coords;
        },

        getGridItem: function(coords) {
            return this.$el.find('tr').eq(coords[1]).find('td').eq(coords[0]);
        },

        clickedStart: function(coords) {
            return _.isEqual(coords, this.puzzle.start);
        },

        hasCompleted: function() {
            var path = _.flatten(this.puzzle.path);
            return _.isEqual(_.flatten(this.currentPath), path);
        },

        canMove: function(coords) {
            var prevCoords = this.currentPath.length >= 1 ? this.currentPath[this.currentPath.length - 1] : [],
                movedYOnce = Math.abs(coords[0] - prevCoords[0]) === 1,
                movedXOnce = Math.abs(coords[1] - prevCoords[1]) === 1,
                movedYSkip = Math.abs(coords[0] - prevCoords[0]) > 1,
                movedXSkip = Math.abs(coords[1] - prevCoords[1]) > 1;

            if((movedYOnce && !movedXOnce && !movedXSkip) || (movedXOnce && !movedYOnce && !movedYSkip))
                return this.getGridItem(coords).length === 1;

            return false;
        },

        highlightGridItem: function(ev) {
            var $el = $(ev.currentTarget),
    			coords = this.getCoordsOfGridItem($el),
    			clickedStart = this.clickedStart(coords),
    			hasBegun = clickedStart && this.currentPath.length !== 0;

            if(this.hasCompleted()) return;

    		if(clickedStart || this.canMove(coords)) {
    			$el.addClass('path--selected');
    			this.currentPath.push(coords);
    		}
        },

        alertOnComplete: function() {
            if(!this.hasCompleted()) return;
            alert('Congratulations - you wizard you!');
            this.$el.find('.path--selected')
                .addClass('path--completed');
        },

        reset: function(ev) {
            this.$el.find('.path--selected')
                .removeClass('path--selected')
                .removeClass('path--completed');
            this.currentPath = [];
        },

        remove: function() {
            this.currentPath = [];
            this.$el.off('click', 'td');
            this.$el.off('click', 'td');
            this.$el.empty();
        },
    };
})();

// Export our puzzle class module.
module.exports = SimpleMathPuzzle;
