### virtual-locker [![build status](https://travis-ci.org/WebReflection/virtual-locker.svg)](https://travis-ci.org/WebReflection/virtual-locker)

A simple way to virtually block some path through a generic object.
This does not prevent object owner to change values, it's just an object to path/string relation with a simple conflict resolution.

```js
var vl = require('virtual-locker');

var generic = {};

// virtual lock for a specific path
vl.lock('some.path[0].value', generic);

// same as
vl.lock.call(generic, 'some.path[0].value');

// to release
vl.release('some.path[0].value', generic);

// same as
vl.release.call(generic, 'some.path[0].value');
```

Both `context.lock(path)` and `context.release(path)` returns `true` if the lock was created/released or `false` if already defined or in conflict with another lock.

```js
vl.lock('some.path[0].value');      // true
vl.lock('some.path[0].value');      // false
vl.lock('some.path[0].key');        // true
vl.lock('some.path[1].value');      // true
vl.lock('some.path');               // false
vl.lock('some.path[0].value.data'); // false
```