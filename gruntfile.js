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
	  watch: {
		  css: {
		    files: '**/*.scss', //where to watch
		    tasks: ['sass'],
		    options: {
		      livereload: true,
		    },
		  },
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['watch']);

};