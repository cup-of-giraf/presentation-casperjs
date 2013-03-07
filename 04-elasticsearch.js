var casper = require('casper').create({
    // to show log
    verbose: true,
    // from info level only
    logLevel: 'info'
});

// declare for future use
var screenshot = './ressources/04-elasticsearch.png';

casper.start('http://elasticsearch.org/');

// rempli le champs texte
casper.then(function () {
    this.click('input#search');
    this.sendKeys('input#search', 'guide');
});

// Attente des résultats
casper.waitUntilVisible(
    '.ui-autocomplete.ui-menu',
    function () {

        // cliquer sur le premier résultat
        this.click('.ui-autocomplete.ui-menu li:first-of-type a');
    }, function fail() {
        this.captureSelector(screenshot, "input#search");
    });

casper.wait(2000, function() {
    this.capture(screenshot);
});

casper.run(function() { this.exit(0); });

// to display schreenshot in chrome
// chromium-browser ressources/04-elasticsearch.png
