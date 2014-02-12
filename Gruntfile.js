'use strict';

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	
	grunt.initConfig({
		watch: {
			css: {
				files: ['web/css/*.scss'],
				tasks: ['sass:server']
			},
			js: {
				files: ['web/js/*.js'],
				tasks: ['browserify:server']
			},
			express: {
				files: ['server.js'],
				tasks: ['express:server'],
				options: {
					spawn: false
				}
			}
		},
		browserify: {
			server: {
				files: {
					'web/js/compiled/client.js': [
						'web/js/client.js'
					]
				},
				options: {
					debug: true
				}
			}
		},
		sass: {
			server: {
				options: {
					includePaths: require('node-bourbon').includePaths,
					outputStyle: 'compressed'
				},
				files: {
					'web/css/compiled/site.css': 'web/css/client.scss'
				}
			}
		},
		clean: {
			server: [
				'web/css/compiled',
				'web/js/compiled'
			]
		},
		express: {
			server: {
				options: {
					script: 'server.js',
					port: 5000
				}
			}
		}
	});
	
	grunt.registerTask('default', ['clean:server', 'sass:server', 'browserify:server', 'express:server', 'watch']);
}