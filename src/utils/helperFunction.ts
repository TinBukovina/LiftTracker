export function uppercaseFirstLetter(string: string): string | undefined {
  return string.toUpperCase().at(0)?.concat(string.substring(1, string.length));
}
