// create casper
var casper = require('casper').create({
    // to show log
    verbose: true,
    // from info level only
    logLevel: 'info'
});

// declare for future use
var screenshot = './ressources/01-code-first.png';

// Lancer un navigateur à une URL donnée
casper.start('http://google.fr/', function onReady () {
  /* Initialize */
});

// Search for itnetwork
casper.then(function() {
    // log level info
    this.log('Step 1', 'info')
    // fill form and validate
    this.fill('form[action="/search"]', { q: 'itnetwork' }, true);
});
// Interragir avec la réponse
casper.then(function() {
    // log level info
    this.log('Step 2', 'info')

    // click first result
    this.click('h3.r a');

    this.then(function () {
        this.capture(screenshot);
    });
});

// Launch receipe
casper.run(function() {
    // create a colorized string
    var message = this.getColorizer().
                    colorize('Done.', 'INFO');
    this.
        echo(message).
        exit(0);
});

// to display schreenshot in chrome
// chromium-browser ressources/01-code-first.png
