export function uppercaseFirstLetter(string: string): string | undefined {
  return string.toUpperCase().at(0)?.concat(string.substring(1, string.length));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
