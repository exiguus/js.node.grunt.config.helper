/**
 * @fileOverview Grunt Config Helper Class to extend configs
 * from an directory structure.
 * by extending them from an directory structure.
 * @author Simon Gattner <npm@0x38.de>
 * @license MIT
 * @version 1.0.0
 */
const fs = require('fs');
const path = require('path');

module.exports = class ExtendConfig {
  /**
   * @class ExtendConfig
   * @classdesc Grunt Config Helper Class to extend configs
   * from an directory structure.
   * @param {string} dir The directory with config Files.
   * @param {boolen} task The Grunt Task Name by filename if true.
   */
  constructor(dir, task) {
    this.dir = dir;
    this.task = task || false;
  }
  /**
   * Get files from a given directory.
   * @function ExtendConfig.getFiles
   * @return {array} The files from the given directory.
   */
  getFiles() {
    try {
      return fs.readdirSync(this.dir).reduce((files, file) => {
        const name = path.join(this.dir, file);
        const isDirectory = fs.statSync(name).isDirectory();
        if (!isDirectory) return [...files, name];
      }, []);
    } catch (error) {
      return [];
    }
  }

  /**
   * Build Tasks from Objects in given files.
   * @function ExtendConfig.getTasks
   * @return {object} The required files from the given directory.
   */
  getTasks() {
    const _this = this;
    let obj = {};
    const arr = this.getFiles();
    let namespace;
    arr.forEach(function(value) {
      namespace = value.split('/').pop().split('.')[0];
      _this.extendObject(
        obj,
        (_this.task === true) ? '' : namespace + '_',
        (_this.task === true) ? {[namespace]: require(value)} : require(value)
      );
    });
    return obj;
  }
  /**
   * Extend Object with given Object(s).
   * @function ExtendConfig.extendObject
   * @param {object} target The target to extend.
   * @param {string} namespace The namespace prefix to extend prop.
   * @param {object} args The sources to append.
   * @return {object} The extended Object.
   */
  extendObject(target, namespace, ...args) {
    const sources = args;
    sources.forEach(function(source) {
      for (let prop in source) {
        if (Object.prototype.hasOwnProperty.call(source, prop)) {
          target[namespace + prop] = source[prop];
        }
      }
    });
    return target;
  }
};
