import { SingletonDictionary } from '../src';

describe('SingletonDictionary', () => {
  it('works', () => {
    const factory = jest.fn((value: number) => value * 2);
    const dict = new SingletonDictionary(factory);
    expect(factory).toBeCalledTimes(0);

    const result = dict.acquire(0);
    expect(factory).toBeCalledTimes(1);
    expect(result).toBe(0);
    const result2 = dict.acquire(0);
    expect(factory).toBeCalledTimes(1);
    expect(result2).toBe(0);
    const result3 = dict.acquire(1);
    expect(factory).toBeCalledTimes(2);
    expect(result3).toBe(2);
    const result4 = dict.release(1);
    expect(factory).toBeCalledTimes(2);
    expect(result4).toBe(true);
    const result5 = dict.release(1);
    expect(factory).toBeCalledTimes(2);
    expect(result5).toBe(false);
    const result6 = dict.release(0);
    expect(factory).toBeCalledTimes(2);
    expect(result6).toBe(true);
    const result7 = dict.acquire(0);
    expect(factory).toBeCalledTimes(2);
    expect(result7).toBe(0);
    const result8 = dict.release(0);
    expect(factory).toBeCalledTimes(2);
    expect(result8).toBe(true);
    const result9 = dict.release(0);
    expect(factory).toBeCalledTimes(2);
    expect(result9).toBe(true);
    const result10 = dict.release(0);
    expect(factory).toBeCalledTimes(2);
    expect(result10).toBe(false);
    expect((dict as any).refsNumberDict).toEqual({});
    expect((dict as any).instances).toEqual({});
  });
});
