var Maybe = require('./maybe');
var Nothing = require('./nothing');

var Just = function(val) {
  this._val = val;
  return this;
};

Just.prototype = new Maybe();
Just.prototype.constructor = Just;

Just.of = function(val) {
  if (val === null || val === undefined) return Nothing;
  return new Just(val);
};

Just.prototype.map = Just.prototype.do = function(f) {
  if (typeof f !== 'function') throw 'Function not provided to Just.map';
  var newVal;

  try {
    newVal = f(this._val);
  } catch(e) {} // eslint-disable-line no-empty

  if (newVal === null || newVal === undefined || newVal === Nothing) {
    return Nothing;
  }

  return Just.of(newVal);
};

Just.prototype.join = function(otherMaybe, f) {
  return otherMaybe.map(other => f(this._val, other))
};

Just.prototype.value = function() { 
  return this._val; 
};

Just.prototype.withJust = function(f) {
  f(this._val);
  return this;
};

Just.prototype.withNothing = function() {
  return this;
};

module.exports = Just;