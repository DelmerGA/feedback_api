var Repl = require('repl');

var newRepl = Repl.start("app> ");
newRepl.context.db = require('./models');

newRepl.context.db.User.createSecure({
    email: "bbb",
    password: "bbb",
    password_confirmation: "bbb"
  }).
  then(function (user) {
    console.log(user)
  })
