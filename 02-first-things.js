var casper = require('casper').create();

// ----------------------------------------
// Sample 1: CSS3
// ----------------------------------------

casper.
    start('http://foundation.zurb.com/').
    then(function () {
        var content = casper.getHTML('header h4:first-of-type');
        this.echo(content);
    });
//*
casper.run(function () {
    casper.exit(0);
});
/*/

// ----------------------------------------
// Sample 1: XPath
// ----------------------------------------

var x = require('casper').selectXPath;
casper.start('http://example.org', function () {
        casper.captureSelector('screen.png', x('//*[@id="plop"]'));
    });

casper.run(function () {
    casper.exit(0);
});
//*/
