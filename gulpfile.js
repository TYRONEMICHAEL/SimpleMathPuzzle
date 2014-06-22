    // Specify our gulp dependancies.
    var gulp = require('gulp'),
        browserify = require('gulp-browserify'),
        mocha = require('gulp-mocha');

    // Handles errors and does not break out of our tests.
    function handleError(err) {
        console.log(err.message);
        this.emit('end');
    }

    // Our mocha test runner.
    gulp.task('mocha', function () {
        gulp.src('./test/**/*.js')
            .pipe(mocha({
                reporter: 'list'
            }))
            .on('error', handleError);
    });

    // Watches files for changes so we can
    // run our tests whenever we change a file.
    gulp.task('watch', function () {
        gulp.watch(['./test/**/*.js', './js/**/*.js'], ['mocha']);
    });

    // Builds out our game using browserify
    gulp.task('build', function () {
        gulp.src('./js/app.js')
            .pipe(browserify())
            .on('error', handleError)
            .pipe(gulp.dest('./build'));
    });

    // Our default test task.
    gulp.task('test', ['mocha', 'watch']);

    // Our default task.
    // Builds our math game and runs our tests
    gulp.task('default', ['mocha', 'build']);
