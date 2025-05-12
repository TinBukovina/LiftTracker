export function uppercaseFirstLetter(string: string): string | undefined {
  return string.toUpperCase().at(0)?.concat(string.substring(1, string.length));
}

export function formatDate(
  dateString: string,
  shortenYear: boolean = false,
  shortFormat: boolean = false
): string | undefined {
  if (!dateString || dateString === "null") return;

  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  if (shortFormat)
    return `${String(Number(day))}/${String(Number(month))}/${shortenYear ? year % 100 : year}`;

  return `${day}-${month}-${shortenYear ? year % 100 : year}`;
}

export function convertNumberToWeekDay(
  num: number,
  shortName: boolean = true
): string | undefined {
  switch (num) {
    case 1:
      return shortName ? "Mon" : "Monday";
    case 2:
      return shortName ? "Tues" : "Tuesday";
    case 3:
      return shortName ? "Wed" : "Wednesday";
    case 4:
      return shortName ? "Thurs" : "Thursday";
    case 5:
      return shortName ? "Fri" : "Friday";
    case 6:
      return shortName ? "Sat" : "Saturday";
    case 7:
      return shortName ? "Sun" : "Sunday";
    default:
      return undefined;
  }
}

export function slugifyName(name: string): string {
  return name
    .replace("#", "__")
    .replace("/", "_")
    .split(" ")
    .map((el) => el.toLowerCase())
    .join("-");
}

export function unSlugifyName(slugifyName: string): string {
  return slugifyName.replace("__", "#").replace("_", "/").split("-").join(" ");
}

export function roundNumberToNDecimalPoints(
  number: number,
  numOfDecimalPoints: number
): number {
  return Number(number.toFixed(numOfDecimalPoints));
}

export function convertKgToLbs(weightInKg: number): number {
  return Number((weightInKg * 2.20462).toFixed(2));
}
export function ensureISOString(input: string | Date): string {
  if (input instanceof Date) {
    return input.toISOString();
  }

  try {
    const parsedDate = new Date(input);

    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date");
    }

    return parsedDate.toISOString();
  } catch (error) {
    console.error("Error converting date:", error);
    return new Date().toISOString();
  }
}
