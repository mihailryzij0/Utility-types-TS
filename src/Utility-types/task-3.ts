type FIXME<T, K> = { [P in Exclude<keyof T, K>]: T[P] };

export const omit = <T extends Record<any, any>, K extends keyof T>(
  obj: T,
  keyToOmit: K
): FIXME<T, K> => {
  const { [keyToOmit]: _, ...withoutKey } = obj;
  return withoutKey;
};