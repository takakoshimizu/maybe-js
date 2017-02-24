// data Maybe a = Just a | Nothing
// Use as Maybe.Just.of(value) or Maybe.Nothing.
// Or Maybe.of(couldBeAValue)
// Call .map on either to perform calculations.
// A Nothing will gracefully continue providing Nothing.
// A Just will attempt to perform the operation, and
// return Just.of(newVal) if successful, or Nothing.
// Provides error-free processing chains without if (x !== null) checks.

// call .join to join two maybe values together via mapping.
// will return Nothing if either value is Nothing.

// use .value(default) to get at the internal value, or 
// return the default

// use .withJust or .withNothing to perform impure actions
// with either instance.

var Maybe = require('./maybe');
var Just = require('./just');
var Nothing = require('./nothing');

Maybe.of = function(val) {
  if (val === null || val === undefined) return Nothing;
  return new Just(val);
};

module.exports.Just = Just;
module.exports.Nothing = Nothing;
module.exports.Maybe = Maybe;
module.exports.of = Maybe.of;
