var Repl = require('repl');

var newRepl = Repl.start("app> ");
newRepl.context.db = require('./models');

newRepl.context.db.User.find(1).
  then(function (user) {
    user.createScoreCard();
  })
