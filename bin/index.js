(function () {
    'use strict';

    var check = require('../src/index');
    var argv = require('yargs');

    var args = argv
        .usage('Usage: $0 [-c path to config file] <dirs or files to check, space deliminated>')
        .demandCommand(1, 'Missing dir or file to check')
        .describe('c', 'path to the config file')
        .argv;

    check.runJavaCheck(args._, args.c);
}());
