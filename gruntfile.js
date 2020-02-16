var mozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {
    require('jit-grunt')(grunt);
    
  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 2
        },
        files: {
          "css/main.css": "less/main.less" // destination file and source file
        }
      }
    },
    cssmin: {
        minify: {
            src: 'css/main.css',
            dest: 'dist/css/style.min.css'
        }  
    },
    browserSync: {
        dev: {
            bsFiles: {
                src: [
                    'dist/css/style.min.css','*.html'
                ]
            },
            options: {
                watchTask: true,
                server: './'
            }
        }  
    },
    
    imagemin: {                         
        dynamic: {                         
            options: {                       
                optimizationLevel: 2,
                svgoPlugins: [{ removeViewBox: false }],
                use: [mozjpeg()],
                progressive: true,
                cache: false
            },
            files: [{
                expand: true,                       
                cwd: 'images/',                  
                src: ['**/*.{png,PNG,jpg,JPG,gif,GIF}', '!dist/**'],  
                dest: 'dist/images'                  
            }]
        }
    },
 
    
      
    watch: {
      styles: {
        files: ['less/**/*.less'], // which files to watch
        tasks: [ 'less', 'cssmin' ],
        options: {
          nospawn: true
        }
      },
      images : {
        files : ['images/*.{png,PNG,jpg,JPG,gif,GIF}'],
        tasks : ['newer:imagemin:dynamic'], 
                /*
                by using watch-newer only new images will get minified. 
                That way the imagemin plugin wont minify all the images everytime.
                */
        options : {
           nospawn : true,
        }
      }
        
    }
  });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-newer'); // LOOK FOR NEW/CHANGED FILES ONLY FILES

    grunt.registerTask('default', ['browserSync', 'watch']);
};