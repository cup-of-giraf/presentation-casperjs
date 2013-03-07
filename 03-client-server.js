var casper = require('casper').create();

casper.start('http://www.wikipedia.org/');
// ...
// Exécution serveur
// ...
casper.then(function () { // réponse

  // Nouvelle requête
  this.fill('form.search-form', {
      search: "github"
  }, true);
});
// ...
// Exécution serveur
// ...
casper.then(function () { // réponse
  var res = this.getHTML('#mw-content-text p:first-of-type');
  this.echo(res);
});

casper.run(function() { this.exit(0); });
