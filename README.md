[![tests][tests]][tests-url]

# js.node.grunt.config.helper
[Node.js](https://nodejs.org/en/) Grunt Config Helper Class to Help with [Grunt](https://gruntjs.com/) configs and tasks.

## npm
[![npm][npm]][npm-url]

```
npm install --save js.node.grunt.config.helper
```

## Example
### Extend Grunt Config Jit Example
Using the Extend functionality in a [jit-grunt](https://github.com/shootaroo/jit-grunt) Environment like:

```
Project/
      |build/
      |    |helper/
      |            |_grunt/
      |                  |task_name/
      |                  |        |tasks1.js
      |                  |        |tasks2.js
      |                  |task_name.js
      |Gruntfile.js
```

Extend `task_name.js` with `task1.js` and `task2.js` from `task_name/` directory.
`task_name.js` filename must be the task name of the Grunt Plugin.

```Javascript
// task_name.js
module.exports = function() {
  const path = require('path');
  const GruntConfigHelper = require('js.node.grunt.config.helper');
  const requireDirectory = path.resolve(__dirname, 'task_name');
  const gruntConfigHelper = new GruntConfigHelper(requireDirectory);
  return gruntConfigHelper.getTasks();
};
```

## Extend Grunt Config Gruntfile.js Example
Using the Extend functionality in a standard Grunt Environment:

```
Project/
|build/
|    |helper/
|            |_grunt/
|                  |task1.js
|                  |task2.js
|Gruntfile.js
```

Extend `Gruntfile.js` with `task1.js` and `task2.js` by filename.
`task1.js` and `task2.js` filename must be the task name of the Grunt Plugin.

```Javascript
// Gruntfile.js
module.exports = function (grunt) {

  const path = require('path');
  const GruntConfigHelper = require('js.node.grunt.config.helper');
  const requireDirectory = path.resolve(__dirname);
  const gruntConfigHelper1 = new GruntConfigHelper(requireDirectory);
  const tasks = gruntConfigHelper1.getTasks();
  // Project configuration.
  grunt.initConfig({
    tasks, // {task1: {...}, task2: {...}}
    ...
  })
  ...
```

[tests]: https://img.shields.io/travis/exiguus/js.node.grunt.config.helper/master.svg
[tests-url]: https://travis-ci.org/exiguus/js.node.grunt.config.helper

[npm]: https://img.shields.io/npm/v/js.node.grunt.config.helper.svg
[npm-url]: https://npmjs.com/package/js.node.grunt.config.helper

[licenses-url]: https://img.shields.io/npm/l/js.node.grunt.config.helper.svg
[licenses]: https://github.com/exiguus/js.node.grunt.config.helper
