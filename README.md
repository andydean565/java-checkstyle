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
If the config file is not specified it defaults to sun_checks.xml (/res/sun_checks.xml)

## module usage

### runJavaCheck

Logs any discovered style errors to the console

**param {Array or String}** path or paths of files to check (can dirs)  
**param {String}** configFile (optional) - if not specified defaults to sun_checks.xml (/res/sun_checks.xml).  See [here](https://checkstyle.sourceforge.io/config.html) for details on the config file.  
**param {function(err)}** - An err will possibly returned.  See [config file notes](#markdownheader-config-file-notes).

```
var checkstyle = require('java-checkstyle');

checkstyle.runJavaCheck([./file1.java, ./dir1], configFilePath, function (err) {
    // Done checking
})
```

## Config file notes
If you have specified:
```
<property name="severity" value="error"/>
```
In your config file then if any style errors are found the `checkstyle.runJavaCheck` callback will be called with a string like "Check ends with 3 errors".


If you have instead specified:
```
<property name="severity" value="warning"/>
```
And if the check still only finds "warnings" the callback will *not* be called with an error string.  But the actual warning will still be printed to console.error.

## Contributing

Before submitting a pull request please:
- Update the documentation as necessary
- Run `npm run eslint` to ensure consistent styling
- Run `npm run test` and ensure all tests pass
- Added automated test coverage as appropriate for this change
