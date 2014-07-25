var path = require('path');

var stylesheetsDir = 'dev/styles/';

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			server: {
				options: {
					port: 9000, //run on port 9000
					base: 'dist/',
					open: true //open browser					
				}
			}
		},
		//lint my jS
		jshint: {
			all: ['dev/javascript/*.js']
		},
		//concat JS files into 1
		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: ['dev/javascript/*js'], //take all js
				dest: 'dist/scripts/main.min.js', //concat and send to dist,
					//calling it .min.js but it wont be minified until uglify is ran.
			},
		},
		//minify JS 
		uglify: {
			options: {
				mangle: true
			},
			js: {
				files: { // dest : src
					'dist/scripts/main.min.js' : ['dist/scripts/main.min.js']
				}
			}
		},
		//compile Jade
		jade: {
			html: {
				options: {
					client: false,
					wrap: false
				},
				files: {
					'dist/index.html': ['dev/templates/*.jade']
				}
			}
		},
		/*************************
		 *     Using Stylus      *
		 *************************
		//compile Sass
		sass: { // Task                              
			dist: { // Target  
				options: { // Target options
					style: 'expanded'
				},
				files: {   // Dictionary of files
					'dist/css/main.css': stylesheetsDir + 'main.scss'       // 'destination': 'source
				}
			}
		},
		*/
		stylus: {
			compile: {
				options: {

				},
				files: {
					'dist/css/main.css': stylesheetsDir + 'main.styl'
				}
			}

		},
		//autoprefix CSS
		autoprefixer: {
			options: {
				cascade: true
			},
			single_file: {
				src: 'dist/css/main.css'
			}
		},
		//watch file changes and recompile if necessary
		watch: {
			css: {//task
			    files: 'dev/styles/*.styl', //where to watch
			    tasks: ['stylus','autoprefixer'], 
			    options: {
			      livereload: true
			    }
			},
			jade: {
				files: ['dev/templates/*.jade','dev/templates/includes/*.jade'],
				tasks: ['jade'],
				options: {
					livereload: true
				}
			},
			javascript: {
				files: ['dev/javascript/*.js'],
				//uglify only on deploy
				//tasks: ['jshint','concat','uglify:js'],
				tasks: ['jshint','concat'],
				options: {
					livereload: true
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jade');
	// grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	//default task grunt will run...
	grunt.registerTask('default', ['jshint','concat','jade','connect','stylus','autoprefixer','watch']);

	//uglify for distribution to live server
	grunt.registerTask('deploy', ['jshint','concat','uglify','jade','connect','stylus','autoprefixer','watch']);

};