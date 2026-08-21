import { CVData } from '../types'

export interface CompletionSection {
  id: string
  done: boolean
}

const CHECKS: { id: string; done: (data: CVData) => boolean }[] = [
  {
    id: 'personal',
    done: (d) => Boolean(d.personal.fullName && d.personal.email),
  },
  { id: 'summary', done: (d) => d.personal.summary.trim().length > 20 },
  { id: 'experience', done: (d) => d.experience.some((e) => e.role && e.company) },
  { id: 'education', done: (d) => d.education.some((e) => e.degree && e.institution) },
  { id: 'skills', done: (d) => d.skills.some((s) => s.name) },
  { id: 'languages', done: (d) => d.languages.some((l) => l.name) },
  {
    id: 'additional',
    done: (d) => d.certifications.some((c) => c.name) || d.projects.some((p) => p.name),
  },
]

export function getCompletion(data: CVData) {
  const sections: CompletionSection[] = CHECKS.map((c) => ({ id: c.id, done: c.done(data) }))
  const doneCount = sections.filter((s) => s.done).length
  const percent = Math.round((doneCount / sections.length) * 100)
  return { sections, percent }
}
