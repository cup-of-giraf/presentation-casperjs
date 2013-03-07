casper.test.begin('ITN popup', 3, function (test) {

    // declare for future use
    var screenshot = './ressources/05-first-test.png';

    casper.start('http://www.itnetwork.fr/').

    then(function () {
        test.assertVisible('div#overlay');
        test.assertExists('.skipTeaser');
    }).

    thenClick('.skipTeaser').

    waitWhileVisible('div#overlay', function () {
        test.pass("Overlay is hidden.");
    }, function onError () {
        test.fail("Overlay did not hide.");
    }, 5000). // 5 seconds

    then(function() {
        this.capture(screenshot);
    }).

    run(function() {
        test.done();
        test.renderResults(true);
    });
 });

// to display schreenshot in chrome
// chromium-browser ressources/05-first-test.png
