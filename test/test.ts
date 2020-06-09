import Maybe, { Just, Nothing, NothingBase } from '../src'

describe('Maybe', () => {
  describe('#of', () => {
    it('should return a Just value when provided a existing value', () => {
      const result = Maybe.of(1);
      expect(result).toBeInstanceOf(Just);
    });

    it('should return a Just containing the value provided', () => {
      const result = Maybe.of(1);
      expect(result.val()).toBe(1);
    });

    it('should return Just when passed a non-existing value', () => {
      const result = Maybe.of(undefined);
      expect(result).toBeInstanceOf(Just);
      expect(result.val()).toBe(undefined);
    });
  });
});

describe('Just', () => {
  it('should be an instance of Maybe', () => {
    const result = Just.of(1);
    expect(result).toBeInstanceOf(Maybe);
  });

  describe('#of', () => {
    it('should return a Just value when provided a non-null value', () => {
      const result = Just.of(1);
      expect(result).toBeInstanceOf(Just);
    });

    it('should return a Just containing the value provided', () => {
      const result = Just.of(1);
      expect(result.val()).toBe(1);
    });

    it('should return a Just containing null when passed a null value', () => {
      const result = Just.of(null);
      expect(result).toBeInstanceOf(Just);
      expect(result.val()).toBe(null);
    })
  });

  describe('#map', () => {
    it('should apply the function provided to the contained value', () => {
      const result = Just.of(1).map(x => x + 1);
      expect(result.val()).toBe(2);
    });

    it('should return Nothing when the mapped function throws', () => {
      const result = Just.of(1).map(x => { throw '' });
      expect(result).toBe(Nothing);
    });

    it('should return Nothing when the mapped function returns null', () => {
      const result = Just.of(1).map(x => null);
      expect(result).toBeInstanceOf(Just);
      expect(result.val()).toBe(null);
    });

    it('should return NOthing when the mapped function returns undefined', () => {
      const result = Just.of(1).map(x => undefined);
      expect(result).toBeInstanceOf(Just);
      expect(result.val()).toBeUndefined();
    });

    /*
    it('should be aliased as .do', () => {
      const a = Just.of(1);
      expect(a.map).toBe(a.do);
    });
    */
  });

  /*
  describe('#join', () => {
    it('should map a function with both values', () => {
      const a = Maybe.of(1);
      const b = Maybe.of(2);

      const result = a.join(b, (av, bv) => av + bv);
      expect(result.value()).toBe(3);
    });

    it('should return Nothing if first value is Nothing', () => {
      const a = Maybe.Nothing;
      const b = Maybe.of(2);

      const result = a.join(b, (av, bv) => av + bv);
      expect(result).toBe(Maybe.Nothing);
    });

    it('should return Nothing if the second value is Nothing', () => {
      const a = Maybe.of(1);
      const b = Maybe.Nothing;

      const result = a.join(b, (av, bv) => av + bv);
      expect(result).toBe(Maybe.Nothing);
    });
  });

  describe('#or', () => {
    it('should return itself', () => {
      const a = Maybe.of(1);
      const b = Maybe.of(2);

      const result = a.or(b);
      expect(result).toBe(a);
    });
  });

  describe('#value', () => {
    it('should return the contained value', () => {
      const a = Maybe.of(1);
      expect(a.value()).toBe(1);
    });
  });

  describe('#withJust', () => {
    it('should return itself', () => {
      const a = Maybe.of(1);

      const b = a.withJust(val => val);
      expect(a).toBe(b);
    });

    it('should perform function with value', () => {
      const a = Maybe.of(1);
      let outside;

      a.withJust(val => outside = val);
      expect(outside).toBe(1);
    });
  });

  describe('#withNothing', () => {
    it('should return itself', () => {
      const a = Maybe.of(1);

      const b = a.withNothing(val => val);
      expect(a).toBe(b);
    });

    it('should not perform function with value', () => {
      const a = Maybe.of(1);
      let outside;

      a.withNothing(val => outside = val);
      expect(outside).toBeUndefined();
    });
  });
  */
});

describe('Nothing', () => {
  it('should be an instance of Maybe', () => {
    expect(Nothing).toBeInstanceOf(Maybe);
  });

  it('should be a singleton value', () => {
    const a = Maybe.of(1).map(x => { throw '' });
    const b = Maybe.of(2).map(x => { throw '' });
    expect(a).toBe(b);
  });

  describe('#map', () => {
    it('should return itself', () => {
      const result = (Nothing as NothingBase<number>).map(x => x + 1);
      expect(result).toBe(Nothing);
    });

    /*
    it('should be aliased as .do', () => {
      expect(Nothing.map).toBe(Nothing.do);
    });
    */
  });

  /*
  describe('#join', () => {
    it('should return itself', () => {
      const result = Maybe.Nothing.join(Maybe.of(1), (av, bv) => av + bv);
      expect(result).toBe(Maybe.Nothing);
    });
  });

  describe('#or', () => {
    it('should return the other value', () => {
      const a = Maybe.Nothing;
      const b = Maybe.of(1);

      const result = a.or(b);
      expect(result).toBe(b);
    });

    it('should wrap non-maybe other values in maybe', () => {
      const a = Maybe.Nothing;

      const result = a.or(1);
      expect(result).toBeInstanceOf(Maybe.Maybe);
      expect(result.value()).toBe(1);
    });
  });

  describe('#value', () => {
    it('should return the provided default', () => {
      const result = Maybe.Nothing.value('default');
      expect(result).toBe('default');
    });
  });

  describe('#withJust', () => {
    it('should return itself', () => {
      const result = Maybe.Nothing.withJust(x => x);
      expect(result).toBe(Maybe.Nothing);
    });

    it('should not perform provided function', () => {
      let outside;

      Maybe.Nothing.withJust(x => outside = 1);
      expect(outside).toBeUndefined();
    });
  });

  describe('#withNothing', () => {
    it('should return itself', () => {
      const result = Maybe.Nothing.withNothing(() => 1);
      expect(result).toBe(Maybe.Nothing);
    });

    it('should not perform provided function', () => {
      let outside;

      Maybe.Nothing.withNothing(() => outside = 1);
      expect(outside).toBe(1);
    });
  }); */
})
