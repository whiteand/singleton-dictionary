export interface ISingletonDictionary<K, V> {
  acquire(k: K): V;
  release(k: K): number;
}
