/**
 * 压缩 css js
 */
"use strict";
module.exports = function(grunt) {

    var buildTasks = [
        'copy',
        'viewconcat',
        'uglify',
        'concat',
        'cssmin',
        'template'
    ]; 

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        transport : {
            options: {
                idleading: '/dist/',
                alias: '<%= pkg.spm.alias %>',
                debug: false
            },
            app:{
                files:[{
                    cwd: 'js/',
                    src: '**/*',
                    dest: '.build'
                }]
            }
        },

        copy: {
            main: {
                files: [
                    {
                        expand: true, 
                        cwd: 'assets/', 
                        src: ['**'], 
                        dest: 'build/assets/'
                    },
                    {
                        expand: true, 
                        cwd: 'app/', 
                        src: ['**'], 
                        dest: 'build/app/'
                    },                   
                    {
                        expand: true, 
                        cwd: 'boot/', 
                        src: ['**'], 
                        dest: 'build/boot/'
                    }
                ]
            }
        },
        viewconcat: {
            view: {
                expand: true,
                cwd: 'build/app/',
                src: ['**/*.html'],
                dest: 'build/app/',
                ext: '.js'
            }
        },
        uglify: {
            build: {
                expand: true,
                cwd: 'build/',
                src: ['**/*.js', '!**/*-min.js'],
                dest: 'build/',
                ext: '-min.js'
            }
        },
        concat: {
            dist: {
              src: ['build/assets/css/global.css','build/assets/css/promo.css', 'build/assets/css/manage.css'],
              dest: 'build/assets/css/union.css',
            }
        },
        cssmin: {
            css: {
                expand: true,
                cwd: 'build/assets/',
                src: ['**/*.css','!**/*-min.css'],
                dest: 'build/assets/',
                ext: '-min.css'
            }
        },      
        template: {
            dev: {
                src: 'myunion.mustache',
                dest: 'myunion_debug_local.htm',
                variables: {
                    DEBUG: true,
                    TBCDN: 'http://pub.alimama.net/'
                }
            },
            pub: {
                src: 'myunion.mustache',
                dest: 'myunion.htm',
                variables: {
                    DEBUG: false,
                    TBCDN: 'http://g.tbcdn.cn/mm/pub/0.0.1/'
                    // TBCDN: 'http://g.assets.daily.taobao.net/mm/pub/0.0.1/'
                }
            },
            pub_debug: {
                src: 'myunion.mustache',
                dest: 'myunion_debug.htm',
                variables: {
                    DEBUG: true,
                    TBCDN: 'http://g.tbcdn.cn/mm/pub/0.0.1/'
                    // TBCDN: 'http://g.assets.daily.taobao.net/mm/pub/0.0.1/'
                }
            }
        }
    });

    //grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-templater');

    // tasks
    grunt.loadTasks('tasks');

    // Build task 发布
    grunt.registerTask('build', buildTasks);

};