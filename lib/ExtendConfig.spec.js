const path = require('path');
const assert = require('chai').assert;

describe('The grunt config helper ExtendConfig Module', function() {
  it('class helper functions', function() {
    const GruntConfigHelper = require('./index');
    const gruntConfigHelper = new GruntConfigHelper();
    assert.typeOf(gruntConfigHelper.extendObject, 'function');
    assert.typeOf(gruntConfigHelper.extendObject(
      {},
      'test_',
      {foo: ['alpha', 'beta', 'gamma']}
    ), 'object');
    assert.equal(
      JSON.stringify(
        gruntConfigHelper.extendObject(
          {},
          'test_',
          {
            foo: ['alpha', 'beta', 'gamma'],
            bar: 'value',
          }
        )
      ) ===
      JSON.stringify(
        {
          test_foo: ['alpha', 'beta', 'gamma'],
          test_bar: 'value',
        }
      ),
    true);
  });

  it('class catch empty directory', function() {
    const GruntConfigHelper = require('./index');
    const gruntConfigHelper = new GruntConfigHelper();

    assert.typeOf(gruntConfigHelper.getFiles, 'function');
    assert.typeOf(gruntConfigHelper.getFiles(), 'array');
    assert.equal(gruntConfigHelper.getFiles().length === 0, true);

    assert.typeOf(gruntConfigHelper.getTasks, 'function');
    assert.typeOf(gruntConfigHelper.getTasks(), 'object');
    assert.equal(
      JSON.stringify(gruntConfigHelper.getTasks()) ===
      JSON.stringify({}),
    true);
  });

  it('class single file directory', function() {
    const requireDirectory = path.resolve(__dirname, '../tests/directory');
    const GruntConfigHelper = require('./index');
    const gruntConfigHelper = new GruntConfigHelper(requireDirectory);
    const equalArray = requireDirectory + '/file.js';
    const equalObject = require('../tests/object.js');

    assert.typeOf(gruntConfigHelper, 'object');
    assert.typeOf(gruntConfigHelper.getFiles, 'function');

    assert.typeOf(gruntConfigHelper.getFiles(), 'array');
    assert.equal(gruntConfigHelper.getFiles(), equalArray);
    assert.lengthOf(gruntConfigHelper.getFiles(), 1);

    assert.typeOf(gruntConfigHelper.getTasks, 'function');
    assert.typeOf(gruntConfigHelper.getTasks(), 'object');
    assert.equal(
      JSON.stringify(gruntConfigHelper.getTasks()) ===
      JSON.stringify(equalObject),
    true);
  });

  it('class multiple file directory', function() {
    const requireDirectory = path.resolve(__dirname, '../tests/directory1');
    const GruntConfigHelper = require('./index');
    const gruntConfigHelper = new GruntConfigHelper(requireDirectory);
    const equalArray = [
      requireDirectory + '/file.js',
      requireDirectory + '/file1.js',
    ];
    const equalObject = require('../tests/object1.js');

    assert.typeOf(gruntConfigHelper, 'object');
    assert.typeOf(gruntConfigHelper.getFiles, 'function');
    assert.typeOf(gruntConfigHelper.getFiles(), 'array');
    assert.equal(
      gruntConfigHelper.getFiles()[0] === equalArray[0] &&
      gruntConfigHelper.getFiles()[1] === equalArray[1],
    true);
    assert.lengthOf(gruntConfigHelper.getFiles(), 2);

    assert.typeOf(gruntConfigHelper.getTasks, 'function');
    assert.typeOf(gruntConfigHelper.getTasks(), 'object');
    assert.equal(
      JSON.stringify(gruntConfigHelper.getTasks()) ===
      JSON.stringify(equalObject),
    true);
  });

  it('class single file directory with task to extend', function() {
    const requireDirectory = path.resolve(__dirname, '../tests/directory');
    const GruntConfigHelper = require('./index');
    const gruntConfigHelper = new GruntConfigHelper(requireDirectory, true);
    const equalArray = requireDirectory + '/file.js';
    const equalObject = {
      file: require('../tests/directory/file.js'),
    };

    assert.typeOf(gruntConfigHelper, 'object');
    assert.typeOf(gruntConfigHelper.getFiles, 'function');

    assert.typeOf(gruntConfigHelper.getFiles(), 'array');
    assert.equal(gruntConfigHelper.getFiles(), equalArray);
    assert.lengthOf(gruntConfigHelper.getFiles(), 1);

    assert.typeOf(gruntConfigHelper.getTasks, 'function');
    assert.typeOf(gruntConfigHelper.getTasks(), 'object');
    assert.equal(
      JSON.stringify(gruntConfigHelper.getTasks()) ===
      JSON.stringify(equalObject),
    true);
  });

  it('class multiple file directory with task to extend', function() {
    const requireDirectory = path.resolve(__dirname, '../tests/directory1');
    const GruntConfigHelper = require('./index');
    const gruntConfigHelper = new GruntConfigHelper(requireDirectory, true);
    const equalArray = [
      requireDirectory + '/file.js',
      requireDirectory + '/file1.js',
    ];
    const equalObject = {
      file: require('../tests/directory1/file.js'),
      file1: require('../tests/directory1/file1.js'),
    };

    assert.typeOf(gruntConfigHelper, 'object');
    assert.typeOf(gruntConfigHelper.getFiles, 'function');
    assert.typeOf(gruntConfigHelper.getFiles(), 'array');
    assert.equal(
      gruntConfigHelper.getFiles()[0] === equalArray[0] &&
      gruntConfigHelper.getFiles()[1] === equalArray[1],
    true);
    assert.lengthOf(gruntConfigHelper.getFiles(), 2);

    assert.typeOf(gruntConfigHelper.getTasks, 'function');
    assert.typeOf(gruntConfigHelper.getTasks(), 'object');
    assert.equal(
      JSON.stringify(gruntConfigHelper.getTasks()) ===
      JSON.stringify(equalObject),
    true);
  });
});
