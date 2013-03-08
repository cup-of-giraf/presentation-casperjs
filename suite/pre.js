var host = sanitize_host(casper.cli.get('host'));
var screenshot = sanitize_screenshot(casper.cli.get('screenshot'));
var auth = sanitize_auth(casper.cli.get('auth'));

function usage() {

    casper.
        echo(bold('Sample test suite help')).
        echo('').
        echo('casperjs test suite --screenshot=screen.png --auth="foo:bar"').
        echo('').
        echo(['\t', bold('--screenshot'), '    path to store error screenshot'].join('')).
        echo(['\t', bold('--auth'), '          http authentication ("user:password")'].join('')).
        echo(['\t', bold('--host'), '          test host (default: http://localhost/)'].join('')).
        echo(['\t', bold('--help'), '          display this help'].join('')).
        echo('');
}

if (casper.cli.has('help')) {
    usage();
    casper.exit(0);
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

function sanitize_host(host) {
    var urlReg = /^(.*[^\/])\/?$/;
    host || (host = 'http://localhost/');
    if (!urlReg.test(host)) {
        usage();
        casper.exit(1);
    }

    return urlReg.exec(host)[1];
}

function sanitize_screenshot(screenshot) {
    screenshot || (screenshot = './ressources/error.png');
    if (screenshot && ! /\.(png)$/i.test(screenshot)) {
        casper.exit(1);
    }

    return screenshot;
}

function sanitize_auth(auth) {
    var authReg = /^([^:]+):([^:]*)$/;
    if (!auth) { return auth; }
    if (!authReg.test(auth)) {
            usage();
          casper.exit(1);
    }

    auth = authReg.exec(auth);

    return {
          username: auth[1] || '',
          password: auth[2] || ''
    };
}

function bold(message) {
    return casper.getColorizer().format(message, {bold:true});
}
