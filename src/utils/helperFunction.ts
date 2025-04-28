export function uppercaseFirstLetter(string: string): string | undefined {
  return string.toUpperCase().at(0)?.concat(string.substring(1, string.length));
}

export function formatDate(dateString: string): string | undefined {
  if (!dateString || dateString === "null") return;

  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
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
    .split(" ")
    .map((el) => el.toLowerCase())
    .join("-");
}

export function unSlugifyName(slugifyName: string): string {
  return slugifyName.split("-").join(" ");
}
