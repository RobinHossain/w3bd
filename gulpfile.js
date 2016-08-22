var elixir = require('laravel-elixir'),
    gulp    = require('gulp'),
    htmlmin = require('gulp-htmlmin');
    require('laravel-elixir-uncss');



elixir.extend('compress', function() {
    new elixir.Task('compress', function() {
        return gulp.src(['./resources/views/*', './resources/views/*/*', '!./resources/views/prod/', '!./resources/views/prod/*'])
            .pipe(htmlmin({
                collapseWhitespace:    true,
                removeAttributeQuotes: true,
                removeComments:        true,
                minifyJS:              true,
            }))
            .pipe(gulp.dest('./resources/views/prod/'));
    })
        .watch(['./resources/views/*', './resources/views/*/*']);
});

elixir.config.sourcemaps = false;

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

// For Sass File
//elixir(function(mix) {
//    mix.sass('app.scss', 'public/assets/css');
//});

// For Plain Css File

elixir(function(mix) {
 mix.styles(['bootstrap.css', 'main.css'], 'public/css/app.css');
});


elixir(function(mix) {
 mix.scripts(['jquery.js', 'bootstrap.js'], 'public/js/app.js')
});

elixir(function(mix) {
    mix.compress();
});

elixir(function(mix) {
    mix.uncss('./public/css/app.css', {
        html: ['http://localhost:8000/','http://localhost:8000/login']
    });
});