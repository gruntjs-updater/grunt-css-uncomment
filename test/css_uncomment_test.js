'use strict';

var grunt = require('grunt');

exports.css_uncomment = {
  run: function(test) {
    var units = [
      {
        file: 'single_line',
        desc: 'should uncomment a single line comment.'
      },
      {
        file: 'multi_line',
        desc: 'should uncomment a multi line comment.'
      },
      {
        file: 'mixed',
        desc: 'should uncomment a single line and multi line.'
      },
      {
        file: 'same',
        desc: 'should do nothing'
      }
    ];

    units.forEach(function( unit ) {
      var actual = grunt.file.read('tmp/' + unit.file + '.css');
      var expected = grunt.file.read('test/expected/' + unit.file + '.css');
      test.equal(actual, expected, unit.desc );
    });

    test.done();
  }
};
