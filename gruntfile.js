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

		coffee: {
			compile: {
				files: {
					'scripts/main.js': 'scripts/*.coffee'
				}
			}
		},
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
		autoprefixer: {
			options: {
				cascade: true
			},
			single_file: {
				src: 'styles/style.css',
				dest: 'styles/style.css'
			}
		},
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
			coffee: {
				files: ['**/*.coffee'],
				tasks: ['coffee'],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	//default task grunt will run...
	grunt.registerTask('default', ['coffee','jade','connect','sass','autoprefixer','watch']);

};