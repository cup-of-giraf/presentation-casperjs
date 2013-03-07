
var screenshot = sanitize_screenshot(casper.cli.get('screenshot'))
var auth = sanitize_auth(casper.cli.get('auth'));

function usage() {
    casper.echo('casperjs test suite --screenshot=scree.png --auth="foo:bar"');
}

// tests/includes/pre.js
casper.on('error', function on_error(failure) {
    casper.echo(failure, 'ERROR');
    casper.capture(screenshot);
    casper.exit(1);
});

casper.setupAndStart = function () {
    if (!this.started) {
        this.start();
    }

    // set viewport
    this.viewport(1280,1024);
    // http authentication
    if (auth) {
        this.setHttpAuth(auth.username, auth.password);
    }

    return this;
};

casper.signIn = function signIn (username, password) {
    if (!this.started) { this.setupAndStart(); }

    this.thenOpen('https://mysecuresite.io/login')

    this.then(function () {

        this.fill('form[/login]', {
            username: username || "demo",
            password: password || "$ecr3t"
        }, true);
    });

    this.then(function () {
        this.test.assertHttpStatus(200, 'user has signed in');
    });

    // fluid interface
    return this;
}


function sanitize_screenshot(screenshot) {
    return screenshot || './ressources/error.png';
}

function sanitize_auth(auth) {
    return {
        username: 'httpuser',
        password: 'httppassword'
    }
}
