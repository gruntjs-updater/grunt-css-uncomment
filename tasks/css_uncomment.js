/*
 * grunt-css-splitter
 * https://github.com/felipedeboni/grunt-css-splitter
 *
 * Copyright (c) 2014 Felipe K. De Boni
 * Licensed under the MIT license.
 */

'use strict';

var _path = require('path');

module.exports = function(grunt) {
  grunt.registerMultiTask('css_uncomment', 'Uncomment CSS Lines', function() {
    // =============================================================================================
    // VARS
    // =============================================================================================
    var regex = {
      begin: /\/\*-/g,
      end:   /-\*\//g
    };

    // =============================================================================================
    // UTILITIES
    // =============================================================================================
    var fileExists = function( src ) {
      if ( !grunt.file.exists( src ) ) {
        grunt.log.error( "Source file \"" + src + "\" not fount." );
        return false;
      }
      return true;
    };

    // replace
    // -------
    var uncomment = function( regex, fileContent ) {
      fileContent = fileContent.replace( regex, '');

      return fileContent;
    };

    // write
    // -----
    var write = function( filePath, fileContent ) {
      if ( grunt.file.write( filePath, fileContent ) ) {
        grunt.log.ok( "File \"" + filePath + "\" updated." );
        return true;
      } else {
        grunt.log.warn( "Unable to update \"" + filePath + "\"." );
        return false;
      }
    };

    // process a file
    // --------------
    var process = function( file, fileContent ) {
      var originalContent = fileContent;

      fileContent = uncomment( regex.begin, fileContent );
      fileContent = uncomment( regex.end, fileContent );

      if ( originalContent !== fileContent ) {
        return write( file.src[0], fileContent );
      }

      return true;
    };

    // =============================================================================================
    // CSS UNCOMMENT
    // =============================================================================================
    this.files.forEach(function(file) {
      if ( fileExists( file.src[0] ) ) {
        process( file, grunt.file.read(file.src[0]) );
      } else {
        grunt.log.warn('Source file "' + file.src[0] + '" not found.');
      }
    });

  });
};
