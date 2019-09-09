/* globals describe, it, before */
(function () {
    'use strict';

    var check = require('../src/index');
    var exec = require('child_process').exec;
    var path = require('path');
    var should = require('should');
    var stdout = require('test-console').stdout;

    describe('java-checkstyle', function () {
        this.timeout(8000);

        before(function (done) {
            // Java must exist
            exec('java -version', (err, stdout, stderr) => {
                should.not.exist(err);
                done();
            });
        });

        describe('src', function () {
            it('should output errors for a bad java file', function (done) {
                var inspect = stdout.inspect();
                check.runJavaCheck(path.join(__dirname, './res/Bad.java'), null, function (err) {
                    should.not.exist(err);
                    inspect.restore();
                    should.exist(inspect.output);
                    inspect.output[0].should.match(/\[WARN\]/);
                    done();
                });
            });
            it('should not output anything for a good java file', function (done) {
                var inspect = stdout.inspect();
                check.runJavaCheck(path.join(__dirname, './res/Good.java'), null, function (err) {
                    should.not.exist(err);
                    inspect.restore();
                    should.exist(inspect.output);
                    inspect.output[0].should.not.match(/\[WARN\]/);
                    done();
                });
            });
            it('should output errors for a bad and good java file', function (done) {
                var inspect = stdout.inspect();
                check.runJavaCheck([path.join(__dirname, './res/Good.java'), path.join(__dirname, './res/Bad.java')], null, function (err) {
                    should.not.exist(err);
                    inspect.restore();
                    should.exist(inspect.output);
                    inspect.output[0].should.match(/\[WARN\]/);
                    done();
                });
            });
        });

        describe('bin', function () {
            it('should output errors for a bad java file', function (done) {
                exec('node ' + path.join(__dirname, '../bin/index.js') + ' ' + path.join(__dirname, './res/Bad.java'), (err, stdout, stderr) => {
                    should.not.exist(err);
                    should.exist(stdout);
                    stdout.should.match(/\[WARN\]/);
                    done();
                });
            });
            it('should not output anything for a good java file', function (done) {
                exec('node ' + path.join(__dirname, '../bin/index.js') + ' ' + path.join(__dirname, './res/Good.java'), (err, stdout, stderr) => {
                    should.not.exist(err);
                    should.exist(stdout);
                    stdout.should.not.match(/\[WARN\]/);
                    done();
                });
            });
            it('should output errors for good, and bad+good java files', function (done) {
                exec('node ' + path.join(__dirname, '../bin/index.js')
                + ' ' + path.join(__dirname, './res/Good.java')
                + ' ' + path.join(__dirname, './res'), (err, stdout, stderr) => {
                    should.not.exist(err);
                    should.exist(stdout);
                    stdout.should.match(/\[WARN\]/);
                    done();
                });
            });
        });

    });

}());
