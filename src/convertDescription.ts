import TurndownService from "turndown";

const regexForHTML = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/;
const turndownService = new TurndownService();

const convertDescription = (text: string): string => {
  if (regexForHTML.test(text)) {
    return turndownService.turndown(text);
  }
  return text;
};
export default convertDescription;
