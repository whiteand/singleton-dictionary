# Singleton Dictionary

It's a data structure that allows you to store signletons. It has such interface:

```javascript
interface ISingletonDictionary<K extends string | number, V> {
  acquire(k: K): V;
  release(k: K): number;
}
```

Example of usage:

```javascript
import { SingletonDictionary } from 'singleton-dictionary';

function factory(id: number) {
  console.log('created');
  return {
    id,
  };
}

const dict = new SingletonDictionary(factory);

dict.acquire(10);
//> 'created'
//> { id: 10 }
dict.acquire(10);
//> { id: 10 }
// The same object
dict.release(10);
//> 1 - remaining amount of reference to the singleton with key 10
dict.release(10);
//> 0 - remaining amount of reference to the singleton with key 10

// At this point garbage collector can collect this singleton

dict.acquire(10)
//> 'created'
//> { id: 10 }
// This is a new object
```
