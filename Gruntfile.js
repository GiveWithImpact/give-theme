/**
 * Grunt build file for the OAD priip-cloud App
 *
 */
module.exports = function ( grunt ) {

	// Load Grunt tasks declared in the package.json file
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var pkg = grunt.file.readJSON('package.json');

	// Project configuration.
	grunt.initConfig({
		pkg: pkg,

		clean: {
			build: {
				src: ['./sass/**/build.scss', '!global/build.less', '!global/build.scss']
			}
		},

		// SASS to CSS config
		sass: {
			dist: {
				files: {
					'./css/bootstrap.theme.css': './sass/build.scss'
				}
			}
		},

		// Minify CSS
		cssmin: {
			css: {
				src : './css/bootstrap.theme.css',
				dest: './css/bootstrap.theme.min.css'
			}
		},

		// Watch for changes to sass
		watch: {
			files  : ['./sass/_variables.scss', './sass/_bootswatch.scss', './index.html'],
			tasks  : ['build'],
			options: {
				livereload: 35919
			}
		},

		connect: {
			base     : {
				options: {
					hostname: 'localhost',
					port      : 3027,
					livereload: 35919,
					open      : true
				}
			},
			keepalive: {
				options: {
					hostname: 'localhost',
					port      : 3028,
					livereload: 35919,
					keepalive : true,
					open      : true
				}
			}
		},

		open: {
			all: {
				// Gets the port from the connect configuration
				path: 'http://localhost:<%= connect.base.options.port%>'
			}
		}

	});

	/*
	 Custom Tasks
	 */

	// Build task
	grunt.registerTask(
		'build', ['sass', 'cssmin']
	);

	// Local server task
	grunt.registerTask('server', [
		'build',
		'connect:base',
		'open',
		'watch'
	]);

};