module.exports = function(grunt) {

	grunt.initConfig({
	  sass: {                              // Task
	    dist: {                            // Target
	      options: {                       // Target options
	        style: 'expanded'
	      },
	      files: {                         // Dictionary of files
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
	  	},
	  },
	  watch: {
		  css: {//task
		    files: '**/*.scss', //where to watch
		    tasks: ['sass','autoprefixer'], 
		    options: {
		      livereload: true,
		    },
		  },

		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');

	//default task grunt will run...
	grunt.registerTask('default', ['watch']);

};