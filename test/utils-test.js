'use strict';

var should = require('chai').should(); // eslint-disable-line
var assert = require('assert');

describe('Hexo Sitemap Generator utils', function() {
  var utils = require('../lib/utils');

  describe('matching_function', function() {
    it('no_pattern', function() {
      // Everything is accepted
      assert.equal(false, utils.isMatch('page.html'));
      assert.equal(false, utils.isMatch('page.js'));
      assert.equal(false, utils.isMatch('page.css'));
    });

    it('single_pattern', function() {
      // Only CSS is filtered
      assert.equal(false, utils.isMatch('page.html', '*.css'), 'Should not be filtered');
      assert.equal(false, utils.isMatch('page.js', '*.css'), 'Should not be filtered');
      assert.equal(true, utils.isMatch('page.css', '*.css', 'Should be filtered'));
    });

    it('empty_array_pattern', function() {
      // Everything is accepted
      assert.equal(false, utils.isMatch('page.html', []));
      assert.equal(false, utils.isMatch('page.js', []));
      assert.equal(false, utils.isMatch('page.css', []));
    });
  });
});
