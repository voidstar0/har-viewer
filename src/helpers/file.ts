/*
  Convert a file size given in bits to a human-readable
  string as bytes

  Taken from https://stackoverflow.com/a/18650828
  and modified to reflect answer as bytes
*/
function humanFileSize(size: number): string {
  const i = Math.floor(Math.log(size) / Math.log(1000));
  return `${(size / 1000 ** i).toFixed(2)} ${[`B`, `kB`, `MB`, `GB`, `TB`][i]}`;
}

export function cleanSize(size: number): string {
  if (size <= 0) {
    return `Cached`;
  }
  return humanFileSize(size);
}
