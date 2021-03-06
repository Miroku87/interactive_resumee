var
	HOST_NAME       = 'localhost',
	SERVER_PORT     = 9000,
	LIVERELOAD_PORT = 35729;
  
module.exports = function (grunt)
{
	require("matchdep").filterDev("grunt-*").forEach( grunt.loadNpmTasks );
	
	grunt.initConfig(
	{
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			dev: {
				options: {
					hostname: HOST_NAME,
					port: SERVER_PORT,
					livereload: LIVERELOAD_PORT,
					open: true,
					//keepalive: true,
					base: {
						path: './dist',
						options: {
							index: 'index.html',
							maxAge: 300000
						}
					}
				}
			}
		},
		stylus: {
			compile: {
				options: {
					compress: false
				},
				files: {
					'./dist/css/index.css'    : './app/css/index.styl',
					'./dist/css/graphics.css' : './app/css/graphics.styl'
				}
			}
		},
		copy: {
			dev: {
				files : [
					{ cwd: './app', src : [ '**', '!css/**' , '!assets/_sources/**' ], expand : true, dest : './dist/', nonull: true }
				]
			}
		},
		clean : {
			dev : {
				src : [ './dist' ]
			}
		},
		watch: {
			options: {
				livereload: {
					host: HOST_NAME
				},
				nospawn: false
			},
			dev: {
				files : [ './app/**/**','!./app/**/**.styl' ],
				tasks: []
			},
			stylus: {
				files : [ './app/**/**.styl' ],
				tasks: ['stylus']
			}
		}
	});
	
	grunt.event.on('watch', function(action, filepath, target) 
	{
		var dest = require( 'path' ).join( './dist', filepath.replace( /app[\/\\]+/, "" ) );
		
		if( action === "changed" && target === "dev" )
		{
			grunt.file.copy( filepath, dest );
			grunt.log.writeln( ">> "+filepath+" has been copied to "+dest );
		}
	});
	
	grunt.registerTask( 'default', [ 'clean:dev', 'copy:dev', 'stylus', 'connect:dev', 'watch' ] );
};