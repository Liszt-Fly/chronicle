"use strict";

// @ts-nocheck
var fsPromise = require("fs/promises");

var fs = require("fs");

var path = require('path');

var base = "/Users/qiaoyang/Desktop/Spring"; //递归 

exports.sortFile = function sortFile(accordance, dir, depth) {
  var storage;
  return regeneratorRuntime.async(function sortFile$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          storage = [];
          _context3.next = 3;
          return regeneratorRuntime.awrap(fsPromise.readdir(dir).then(function _callee(files) {
            var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

            return regeneratorRuntime.async(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context2.prev = 3;

                    _loop = function _loop() {
                      var file, stat, isDirectory;
                      return regeneratorRuntime.async(function _loop$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              file = _step.value;
                              stat = fs.lstatSync(path.resolve(dir, file));
                              isDirectory = stat.isDirectory();

                              if (isDirectory) {
                                sortFile(accordance, path.resolve(dir, file), depth + 1);
                              }

                              _context.next = 6;
                              return regeneratorRuntime.awrap(fsPromise.stat(path.join(dir, file)).then(function (s) {
                                storage.push({
                                  stat: s,
                                  name: file,
                                  ignoredName: file.substr(0, file.length - path.extname(file).length),
                                  isDirectory: isDirectory,
                                  folderPath: isDirectory ? path.resolve(dir, file) : null,
                                  depth: depth
                                });
                              }));

                            case 6:
                            case "end":
                              return _context.stop();
                          }
                        }
                      });
                    };

                    _iterator = files[Symbol.iterator]();

                  case 6:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                      _context2.next = 12;
                      break;
                    }

                    _context2.next = 9;
                    return regeneratorRuntime.awrap(_loop());

                  case 9:
                    _iteratorNormalCompletion = true;
                    _context2.next = 6;
                    break;

                  case 12:
                    _context2.next = 18;
                    break;

                  case 14:
                    _context2.prev = 14;
                    _context2.t0 = _context2["catch"](3);
                    _didIteratorError = true;
                    _iteratorError = _context2.t0;

                  case 18:
                    _context2.prev = 18;
                    _context2.prev = 19;

                    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                      _iterator["return"]();
                    }

                  case 21:
                    _context2.prev = 21;

                    if (!_didIteratorError) {
                      _context2.next = 24;
                      break;
                    }

                    throw _iteratorError;

                  case 24:
                    return _context2.finish(21);

                  case 25:
                    return _context2.finish(18);

                  case 26:
                    storage = storage.sort(function (a, b) {
                      return a.stat.mtimeMs - b.stat.mtimeMs;
                    });

                  case 27:
                  case "end":
                    return _context2.stop();
                }
              }
            }, null, null, [[3, 14, 18, 26], [19,, 21, 25]]);
          }));

        case 3:
          return _context3.abrupt("return", storage);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var storage = [];

exports.sortFileInDepth = function sortFileInDepth(dir, storage) {
  var files = fs.readdirSync(dir);
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = files[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var file = _step2.value;
      var item = {};
      var stat = fs.lstatSync(path.resolve(dir, file));
      var bDir = stat.isDirectory(); //如果是文件夹

      if (bDir) {
        item.name = file;

        if (item["children"]) {} else {
          item.children = [];
        }

        storage.push(item); //递归

        sortFileInDepth(path.resolve(dir, file), item["children"]);
      } //文件
      else {
          item.name = file;

          if (item["children"]) {
            item["children"].push(item);
          } else {
            storage.push(item);
          }
        }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return storage;
}; // console.log(JSON.stringify(sortFileInDepth(base, storage),null,2));


function sortFileInDepth(dir, storage) {}