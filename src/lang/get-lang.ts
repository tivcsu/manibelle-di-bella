import langIT from "./langIT.json"
import langEN from "./langEN.json"

export const getLang = (lang: string) => {
  if (lang === 'IT') {
    return langIT
  }
  if (lang === 'EN') {
    return langEN
  }
  return langIT
}

interface ISelectedLang {
  selectedLang: string
}
export type Lang = typeof langEN & ISelectedLang
