const sanitiseFilename = (str: string): string =>
  str
    .replaceAll(/\s/g, "-")
    .replaceAll("#", "")
    .replaceAll("<", "")
    .replaceAll("$", "")
    .replaceAll("+", "")
    .replaceAll("%", "")
    .replaceAll(">", "")
    .replaceAll("!", "")
    .replaceAll("`", "")
    .replaceAll("&", "")
    .replaceAll("*", "")
    .replaceAll("'", "")
    .replaceAll("|", "")
    .replaceAll("{", "")
    .replaceAll("}", "")
    .replaceAll("/", "")
    .replaceAll(":", "")
    .replaceAll("\\", "")
    .replaceAll("@", "")
    .replaceAll("?", "")
    .replaceAll('"', "");

export default sanitiseFilename;
