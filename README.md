# java-checkstyle #

## About

Use this to check the style of any java files you have in your node project.

This uses the [CheckStyle](https://checkstyle.sourceforge.io/) library (8.24) to actually check your files.

## installation

```
npm install java-checkstyle --save-dev
```
`--save-dev` is optional, but odds are you are only interested in this plugin for development

## cmd line use
```
> node ./node_modules/java-checkstyle/bin/index.js [-c optional path to config file] <dirs or files to check, space deliminated>
```
If the config file is not specified it defaults to google_checks.xml (/res/google_checks.xml)

## module usage

### runJavaCheck

Logs any discovered style errors to the console

**param {Array or String}** path or paths of files to check (can dirs)  
**param {String}** configFile (optional) - if not specified defaults to google_checks.xml (/res/google_checks.xml).  See [here](https://checkstyle.sourceforge.io/config.html) for details on the config file.  
**param {function(err)}** - An err will be returned only if the command failed (wrong parameters or syntax, etc).  No err will be if style errors were found.

```
var checkstyle = require('java-checkstyle');

checkstyle.runJavaCheck([./file1.java, ./dir1], configFilePath, function (err) {
    // Done checking
})
```

## Contributing

Before submitting a pull request please:
- Update the documentation as necessary
- Run `npm run eslint` to ensure consistent styling
- Run `npm run test` and ensure all tests pass
- Added automated test coverage as appropriate for this change
