# Maybe-JS

A simple, useful, and slightly incorrect implementation of the Maybe monad in Javascript.

## Features

* Process data in chains without error handling.
* Access deep properties without checking for undefined each step of the way.
* Strongly and semantically represent a lack of a value in your code.
* Transform data contained inside with simple functions.
* Join two or more contained values together.
* Perform impure actions based on whether the item contains a value or not.

### Why incorrect?

For starters, some implementation is about what's useful in JS rather than following laws. For example, `id(Maybe.Just(1)) !== Maybe.Just(1).map(id)`. The value will remain the same, but the referential equality is lost.

Join isn't the typical join either, wherein a doubly wrapped Maybe would be unwrapped to a single layer. It is more the ability to combine two wrapped values together safely.

But hey, the usefulness is real.

## Usage

More detail to come.

```JS
import Maybe from 'jsmaybe';
const a = Maybe.of('test');

const b = a.map(test => `${test} post, please ignore`);
// => Just { 'test post, please ignore' }

const c = b.map(v => v.unsupportedOp());
// => Nothing

const d = Maybe.of('post');
const e = a.join(d, (test, post) => `${test} ${post}`);
// => Just { 'test post' }

e.value('default');
// => 'test post'

c.value('default');
// => 'default'
```