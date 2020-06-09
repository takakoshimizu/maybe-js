import { MapFn } from '../types/instance'

export default abstract class Maybe<T> {
  abstract map<R>(fn: MapFn<T,R>): Maybe<R>
  abstract val(def?: T): T| undefined

  public static of<T>(val?: T | null) {
    return Just.of(val);
  }

  protected constructor(_val?: T | null) {}
}

export class Just<T> extends Maybe<T> {
  constructor(private _val: T) {
    super(_val);
    return this;
  }

  public static of<T>(val: T): Just<T> {
    return new Just(val);
  }

  public val(): T {
    return this._val;
  }

  public map<R>(fn: MapFn<T,R>): Maybe<R> {
    try {
      return Just.of(fn(this._val));
    } catch {
      return Nothing as NothingBase<R>;
    }
  }
}

export class NothingBase<T> extends Maybe<T> {
  public constructor() {
    super();
  }

  public val(def?: T): T | undefined {
    return def;
  }

  public map<R>(fn: MapFn<T,R>): NothingBase<R> {
    return this as unknown as NothingBase<R>;
  }
}

export const Nothing = new NothingBase()
