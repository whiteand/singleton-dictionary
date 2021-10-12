export class SingletonDictionary<K extends number | string, V> {
  private valueFactory: (value: K) => V;
  private refsNumberDict: Partial<Record<K, number>>;
  private instances: Partial<Record<K, V>>;
  constructor(valueFactory: (value: K) => V) {
    this.valueFactory = valueFactory;
    this.refsNumberDict = {};
    this.instances = {};
  }
  private getRefNumber(k: K): number {
    const refNumber = this.refsNumberDict[k];
    return refNumber || 0;
  }

  public acquire(k: K): V {
    const newRefNumber = this.getRefNumber(k) + 1;
    this.refsNumberDict[k] = newRefNumber;
    if (newRefNumber === 1) {
      this.instances[k] = this.valueFactory(k);
    }
    return this.instances[k] as V;
  }
  public release(k: K): boolean {
    const refNumber = this.getRefNumber(k);
    switch (refNumber) {
      case 0:
        return false;
      case 1: {
        delete this.refsNumberDict[k];
        delete this.instances[k];
        return true;
      }
      default:
        this.refsNumberDict[k] = refNumber - 1;
        return true;
    }
  }
}
