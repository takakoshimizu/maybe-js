import { MapFn } from './types/instance.d'

import Just from './just'

export default abstract class Maybe<T> {
  abstract map<R>(fn: MapFn<T,R>): Maybe<R>
  abstract val(def?: T): T

  protected constructor(_val: T) {
    return Just.of(_val)
  }
}
