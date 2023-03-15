const STORAGE_PREFIX = '_';

export function storage(key: string, value?: any) {
  if (value !== undefined) {
    window.localStorage.setItem(STORAGE_PREFIX + key, value);
    return;
  }
  return window.localStorage.getItem(STORAGE_PREFIX + key);
}

export function formatAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
export function formatHash(hash: string) {
  if (hash.length <= 12) return hash;
  const pre = hash.slice(0, 8);
  const suf = hash.slice(-4);
  return `${pre}...${suf}`;
}
