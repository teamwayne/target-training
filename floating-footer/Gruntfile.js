var argv = require("yargs").argv;
var campaign = argv.campaign === undefined ? "" : argv.campaign + "/";
var sources = ["src/" + campaign + "**/*.js"];
var docName = "campaign.js";
var docNameMin = "campaign.min.js";

module.exports = function(grunt) {
  console.log("o.k. let\'s build the' " + campaign.green.bold + " campaign.");

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    // Build
    jshint: {
      files: sources,
      options: {
        es3: true,
        scripturl: true,
      }
    },
    concat: {
      dev: {
        options: {
          banner: "/*! DEV <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd HH:mm') %> */\n(function() {\n",
          footer: "\n})();"
        },
        src: sources,
        dest: 'build/dev/' + docName,
      },
      prod: {
        options: {
          stripBanners: true,
          banner: "/*! PROD <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd HH:mm') %> */\n(function() {\n",
          footer: "\n})();"
        },
        src: sources,
        dest: 'build/prod/' + docName,
      }
    },
    uglify: {
      prod: {
        options: {
          banner: "/*! PROD <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd HH:mm') %> */\n"
        },
        src: 'build/prod/' + docName,
        dest: 'build/prod/' + docNameMin
      }
    },
    watch: {
      dev: {
        files: sources,
        tasks: ["build_dev"],
        options: {
          spawn: false,
          livereload: true,
        },
      },
      prod: {
        files: sources,
        tasks: ["build_prod"],
        options: {
          spawn: false,
          livereload: true,
        },
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks("grunt-contrib-uglify");
  // Iterative dev plugins
  grunt.loadNpmTasks("grunt-contrib-watch");
  // Build individual tasks
  grunt.registerTask("build_dev", ["jshint", "concat:dev"]);
  grunt.registerTask("build_prod", ["jshint", "concat:prod", "uglify:prod"]);
  // Build all
  grunt.registerTask("build", ["build_dev", "build_prod"]);
  // Build and watch
  grunt.registerTask("dev", ["build_dev", "watch:dev"]);
  grunt.registerTask("prod", ["build_prod", "watch:prod"]);
  // Default task(s).
  grunt.registerTask("default", ["build"]);
};
