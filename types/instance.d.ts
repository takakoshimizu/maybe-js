export type MapFn<T,R> = (val: T) => R

export interface Maybe<T> {
  map: <R>(fn: MapFn<T,R>) => Maybe<R>
}
