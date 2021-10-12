import { ISingletonDictionary } from './types';

export class SingletonDictionary<K extends number | string, V>
  implements ISingletonDictionary<K, V> {
  private create: (value: K) => V;
  private refs: Partial<Record<K, number>>;
  private insts: Partial<Record<K, V>>;
  constructor(singletonFactory: (value: K) => V) {
    this.create = singletonFactory;
    this.refs = {};
    this.insts = {};
  }
  private getRefNumber(k: K): number {
    const refNumber = this.refs[k] as number | undefined;
    return refNumber || 0;
  }

  public acquire(k: K): V {
    const newRefNumber = this.getRefNumber(k) + 1;
    this.refs[k] = newRefNumber;
    if (newRefNumber === 1) {
      this.insts[k] = this.create(k);
    }
    return this.insts[k] as V;
  }
  public release(k: K): number {
    const r = this.getRefNumber(k);
    if (r === 0) return 0;
    if (r === 1) {
      delete this.refs[k];
      delete this.insts[k];
      return 0;
    }
    const nr = r - 1;
    this.refs[k] = nr;
    return nr;
  }
}
