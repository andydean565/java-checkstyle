(function () {
    'use strict';

    var exec = require('child_process').exec;
    var path = require('path');
    var check = {};

    /**
     * @param {function(err)} callback
     */
    check.runJavaCheck = function (paths, configPath, callback) {
        callback = callback || function () {};
        if (!configPath) {
            // default config
            configPath = path.join(__dirname, '../res/google_checks.xml');
        }

        if (!Array.isArray(paths)) {
            paths = [paths];
        }
        checkPaths(paths, configPath, callback);
    };

    function checkPaths (paths, config, callback) {
        if (paths.length === 0) {
            return callback();
        }
        var p = paths.pop();
        exec('java -jar ' + path.join(__dirname, '../lib/checkstyle-8.24-all.jar') + ' -c ' + config + ' ' + p, (err, stdout, stderr) => {
            if (stdout) {
                console.log(stdout);
            }
            if (err) {
                return callback(err);
            }
            checkPaths(paths, config, callback);
        });
    }

    check.log = function (msg) {
        console.log(msg);
    };

    module.exports = check;
}());
