const Maybe = require('./maybe');

const Nothing = (function () {
  function Nothing() {}

  Nothing.prototype = new Maybe();
  Nothing.prototype.constructor = Nothing;

  Nothing.prototype.map = 
    Nothing.prototype.do = 
    Nothing.prototype.join = 
    Nothing.prototype.withJust = function() { return this; };

  Nothing.prototype.value = function(def) { return def };
  Nothing.prototype.withNothing = function(f) { f(); return this; };

  return new Nothing();
})();

module.exports = Nothing;