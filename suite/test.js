casper.test.begin('Access admin area', 1, function (test) {
    casper.setupAndStart().

    signIn("admin", "$ecr3t").

    thenClick('header nav li>a:contains("Administration")').

    then(function () {
        if ("200" !== this.status(true)) {
            // fin du test
            test.fail("Accès à l'administration refusé.");
        }

        test.assertTextExists('Bienvenue Démo !');
    }).

    run(function () {
        test.done();
    });
});
