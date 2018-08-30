const expect = require('chai').expect;

const Maybe = require('../lib');

describe('Maybe', () => {
  describe('#of', () => {
    it('should return a Just value when provided a existing value', () => {
      const result = Maybe.of(1);
      expect(result).to.be.an.instanceOf(Maybe.Just);
    });

    it('should return a Just containing the value provided', () => {
      const result = Maybe.of(1);
      expect(result._val).to.equal(1);
    });

    it('should return Nothing when passed a non-existing value', () => {
      const result = Maybe.of(undefined);
      expect(result).to.equal(Maybe.Nothing);
    });
  });
});

describe('Just', () => {
  it('should be an instance of Maybe', () => {
    const result = Maybe.Just.of(1);
    expect(result).to.be.an.instanceOf(Maybe.Maybe);
  });

  describe('#of', () => {
    it('should return a Just value when provided a non-null value', () => {
      const result = Maybe.Just.of(1);
      expect(result).to.be.an.instanceOf(Maybe.Just);
    });

    it('should return a Just containing the value provided', () => {
      const result = Maybe.Just.of(1);
      expect(result._val).to.equal(1);
    });

    it('should return Nothing when passed a null value', () => {
      const result = Maybe.Just.of(null);
      expect(result).to.equal(Maybe.Nothing);
    })
  });

  describe('#map', () => {
    it('should throw error when not provided function', () => {
      const fn = () => Maybe.Just.of(1).map();
      expect(fn).to.throw;
    });

    it('should apply the function provided to the contained value', () => {
      const result = Maybe.Just.of(1).map(x => x + 1);
      expect(result.value()).to.equal(2);
    });

    it('should return Nothing when the mapped function throws', () => {
      const result = Maybe.Just.of(1).map(x => { throw '' });
      expect(result).to.equal(Maybe.Nothing);
    });

    it('should return Nothing when the mapped function returns null', () => {
      const result = Maybe.Just.of(1).map(x => null);
      expect(result).to.equal(Maybe.Nothing);
    });

    it('should return NOthing when the mapped function returns undefined', () => {
      const result = Maybe.Just.of(1).map(x => undefined);
      expect(result).to.equal(Maybe.Nothing);
    });

    it('should be aliased as .do', () => {
      const a = Maybe.Just.of(1);
      expect(a.map).to.equal(a.do);
    });
  });

  describe('#join', () => {
    it('should map a function with both values', () => {
      const a = Maybe.of(1);
      const b = Maybe.of(2);

      const result = a.join(b, (av, bv) => av + bv);
      expect(result.value()).to.equal(3);
    });

    it('should return Nothing if first value is Nothing', () => {
      const a = Maybe.Nothing;
      const b = Maybe.of(2);

      const result = a.join(b, (av, bv) => av + bv);
      expect(result).to.equal(Maybe.Nothing);
    });

    it('should return Nothing if the second value is Nothing', () => {
      const a = Maybe.of(1);
      const b = Maybe.Nothing;

      const result = a.join(b, (av, bv) => av + bv);
      expect(result).to.equal(Maybe.Nothing);
    });
  });

  describe('#or', () => {
    it('should return itself', () => {
      const a = Maybe.of(1);
      const b = Maybe.of(2);

      const result = a.or(b);
      expect(result).to.equal(a);
    });
  });

  describe('#value', () => {
    it('should return the contained value', () => {
      const a = Maybe.of(1);
      expect(a.value()).to.equal(1);
    });
  });

  describe('#withJust', () => {
    it('should return itself', () => {
      const a = Maybe.of(1);

      const b = a.withJust(val => val);
      expect(a).to.equal(b);
    });

    it('should perform function with value', () => {
      const a = Maybe.of(1);
      let outside;

      a.withJust(val => outside = val);
      expect(outside).to.equal(1);
    });
  });

  describe('#withNothing', () => {
    it('should return itself', () => {
      const a = Maybe.of(1);

      const b = a.withNothing(val => val);
      expect(a).to.equal(b);
    });

    it('should not perform function with value', () => {
      const a = Maybe.of(1);
      let outside;

      a.withNothing(val => outside = val);
      expect(outside).to.be.undefined;
    });
  });
});

describe('Nothing', () => {
  it('should be an instance of Maybe', () => {
    expect(Maybe.Nothing).to.be.an.instanceOf(Maybe.Maybe);
  });

  it('should be a singleton value', () => {
    const a = Maybe.of(1).map(x => { throw '' });
    const b = Maybe.of(2).map(x => { throw '' });
    expect(a).to.equal(b);
  });

  describe('#map', () => {
    it('should return itself', () => {
      const result = Maybe.Nothing.map(x => x + 1);
      expect(result).to.equal(Maybe.Nothing);
    });

    it('should be aliased as .do', () => {
      expect(Maybe.Nothing.map).to.equal(Maybe.Nothing.do);
    });
  });

  describe('#join', () => {
    it('should return itself', () => {
      const result = Maybe.Nothing.join(Maybe.of(1), (av, bv) => av + bv);
      expect(result).to.equal(Maybe.Nothing);
    });
  });

  describe('#or', () => {
    it('should return the other value', () => {
      const a = Maybe.Nothing;
      const b = Maybe.of(1);

      const result = a.or(b);
      expect(result).to.equal(b);
    });

    it('should wrap non-maybe other values in maybe', () => {
      const a = Maybe.Nothing;

      const result = a.or(1);
      expect(result).to.be.instanceOf(Maybe.Maybe);
      expect(result.value()).to.equal(1);
    });
  });

  describe('#value', () => {
    it('should return the provided default', () => {
      const result = Maybe.Nothing.value('default');
      expect(result).to.equal('default');
    });
  });

  describe('#withJust', () => {
    it('should return itself', () => {
      const result = Maybe.Nothing.withJust(x => x);
      expect(result).to.equal(Maybe.Nothing);
    });

    it('should not perform provided function', () => {
      let outside;

      Maybe.Nothing.withJust(x => outside = 1);
      expect(outside).to.be.undefined;
    });
  });

  describe('#withNothing', () => {
    it('should return itself', () => {
      const result = Maybe.Nothing.withNothing(() => 1);
      expect(result).to.equal(Maybe.Nothing);
    });

    it('should not perform provided function', () => {
      let outside;

      Maybe.Nothing.withNothing(() => outside = 1);
      expect(outside).to.equal(1);
    });
  });
});