export function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')
}

export function lines(text: string) {
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
}

export const SKILL_LEVEL_VALUE: Record<string, number> = {
  Basic: 1,
  Intermediate: 2,
  Advanced: 3,
  Expert: 4,
}

export const LANG_LEVEL_VALUE: Record<string, number> = {
  A1: 1,
  A2: 2,
  B1: 3,
  B2: 4,
  C1: 5,
  C2: 6,
  Native: 6,
}
