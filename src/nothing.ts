var Maybe = require('./maybe');

var Nothing = (function () {
  function Nothing() {}

  Nothing.prototype = new Maybe();
  Nothing.prototype.constructor = Nothing;

  Nothing.prototype.map =
    Nothing.prototype.do =
    Nothing.prototype.join =
    Nothing.prototype.flatMap =
    Nothing.prototype.withJust = function() { return this; };

  Nothing.prototype.or = function(other) {
    if (other instanceof Maybe) return other;
    return Maybe.of(other);
  };

  Nothing.prototype.value = function(def) { return def };
  Nothing.prototype.withNothing = function(f) { f(); return this; };

  return new Nothing();
})();

export default Nothing;
