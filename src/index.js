(function () {
    'use strict';

    var exec = require('child_process').exec;
    var path = require('path');
    var check = {};

    /**
     * @param {function(report)} callback
     */
    check.report = function (string) {
        var tmp = string.split('\r');

        for (let index = (tmp.length - 1); index >= 0; index--) {
            switch (tmp[index]) {
            case 'Starting audit...\r':
                tmp.splice(index, 1);
                break;
            case 'Audit done.\r':
                tmp.splice(index, 1);
                break;
            case '':
                tmp.splice(index, 1);
                break;
            default:
                tmp[index] = this.trim(tmp[index]);
                break;
            }
        }
        return tmp;
    };

    check.trim = function (string) {
        return string;
    };

    /**
     * @param {function(err)} callback
     */
    check.runJavaCheck = function (paths, configPath, callback) {
        callback = callback || function () {};
        if (!configPath) {
            // default config
            configPath = path.join(__dirname, '../res/sun_checks.xml');
        }

        if (!Array.isArray(paths)) {
            paths = [paths];
        }
        paths = paths.join(' ');
        exec('java -jar ' + path.join(__dirname, '../lib/checkstyle-8.24-all.jar') + ' -c ' + configPath + ' ' + paths, (err, stdout, stderr) => {
            if (stderr.match(/ends with [0-9]* errors/)) {
                console.log('\x1b[31m%s\x1b[0m', stdout);
                console.log('\x1b[31m%s\x1b[0m', stderr);
                return callback(this.report(stdout));
            } else if (stderr === '') {
                console.log('\x1b[31m%s\x1b[0m', stdout);
                return callback();
            } else if (err) {
                return callback(err);
            }
            // Not sure if it is actually possible to get hre
            console.error(stdout);
            callback();
        });
    };

    check.log = function (msg) {
        console.log(msg);
    };

    module.exports = check;
}());