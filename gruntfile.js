module.exports = function(grunt) {

	grunt.initConfig({
		connect: {
			server: {
				options: {
					port: 9000, //run on port 9000
					open: true //open browser					
				}
			}
		},

		jshint: {
			all: ['scripts/*.js']
		},
		//compile CoffeeScript
		coffee: {
			compile: {
				files: {
					'scripts/main.js': 'scripts/*.coffee'
				}
			}
		},
		//compile Jade
		jade: {
			html: {
				files: {
					'index.html' : ['*.jade']
				},
				options: {
					pretty: true,
				}
			}
		},
		//compile Sass
		sass: { // Task                              
			dist: { // Target  
				options: { // Target options
					style: 'expanded'
				},
				files: {   // Dictionary of files
					'styles/style.css': 'styles/style.scss'       // 'destination': 'source
				}
			}
		},
		//autoprefix CSS
		autoprefixer: {
			options: {
				cascade: true
			},
			single_file: {
				src: 'styles/style.css',
				dest: 'styles/style.css'
			}
		},
		//watch file changes and recompile if necessary
		watch: {
			css: {//task
			    files: '**/*.scss', //where to watch
			    tasks: ['sass','autoprefixer'], 
			    options: {
			      livereload: true
			    }
			},
			jade: {
				files: ['*.jade'],
				tasks: ['jade'],
				options: {
					livereload: true
				}
			},
			javascript: {
				files: ['**/*.coffee'],
				tasks: ['coffee','jshint'],
				options: {
					livereload: true
				}
			}
		}
	});

//uglify, concat, minify needed.
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	//default task grunt will run...
	grunt.registerTask('default', ['coffee','jshint','jade','connect','sass','autoprefixer','watch']);

};