import {
  CVData,
  CertificationEntry,
  EducationEntry,
  ExperienceEntry,
  LanguageEntry,
  PersonalInfo,
  ProjectEntry,
  SkillEntry,
  emptyPersonal,
} from '../types'
import { makeId } from './id'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function cvFileName(data: CVData): string {
  const slug = slugify(data.personal.fullName)
  return `${slug || 'cv-data'}.json`
}

export function downloadCVData(data: CVData) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = cvFileName(data)
  link.click()
  URL.revokeObjectURL(url)
}

function withIds<T extends { id?: string }>(items: unknown, template: Omit<T, 'id'>): T[] {
  if (!Array.isArray(items)) return []
  return items.map((raw) => {
    const item = raw && typeof raw === 'object' ? (raw as Partial<T>) : ({} as Partial<T>)
    return { ...template, ...item, id: item.id || makeId() } as T
  })
}

/** Parses JSON text (optionally wrapped in a ```json fence) into a CVData object,
 * filling in any missing fields with defaults so partial/handwritten JSON still works. */
export function parseCVData(raw: string): CVData {
  const cleaned = raw
    .trim()
    .replace(/^```(?:json)?/i, '')
    .replace(/```$/, '')
    .trim()

  let parsed: unknown
  try {
    parsed = JSON.parse(cleaned)
  } catch {
    throw new Error('That file is not valid JSON.')
  }

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Expected a JSON object with CV fields.')
  }

  const obj = parsed as Record<string, unknown>

  const personal: PersonalInfo = {
    ...emptyPersonal,
    ...(obj.personal && typeof obj.personal === 'object' ? (obj.personal as Partial<PersonalInfo>) : {}),
  }

  return {
    personal,
    experience: withIds<ExperienceEntry>(obj.experience, {
      role: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    }),
    education: withIds<EducationEntry>(obj.education, {
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    }),
    skills: withIds<SkillEntry>(obj.skills, { name: '', level: 'Advanced' }),
    languages: withIds<LanguageEntry>(obj.languages, { name: '', level: 'B2' }),
    certifications: withIds<CertificationEntry>(obj.certifications, { name: '', issuer: '', date: '' }),
    projects: withIds<ProjectEntry>(obj.projects, { name: '', description: '', link: '' }),
  }
}

export const AI_PROMPT_TEMPLATE = `I'm filling in a CV/resume builder that accepts a specific JSON format. Please write strong, specific CV content for me (ask me for any details you need first — role, industry, experience, achievements), then output ONLY a JSON object in this exact shape (omit any field you have nothing for, leave it as an empty string "" or empty array []; do not invent fake employers, dates or credentials):

{
  "personal": {
    "fullName": "",
    "jobTitle": "",
    "email": "",
    "phone": "",
    "location": "",
    "nationality": "",
    "dateOfBirth": "",
    "drivingLicence": "",
    "linkedin": "",
    "github": "",
    "website": "",
    "summary": ""
  },
  "experience": [
    { "role": "", "company": "", "location": "", "startDate": "", "endDate": "", "current": false, "description": "" }
  ],
  "education": [
    { "degree": "", "institution": "", "location": "", "startDate": "", "endDate": "", "description": "" }
  ],
  "skills": [
    { "name": "", "level": "Basic | Intermediate | Advanced | Expert" }
  ],
  "languages": [
    { "name": "", "level": "A1 | A2 | B1 | B2 | C1 | C2 | Native" }
  ],
  "certifications": [
    { "name": "", "issuer": "", "date": "" }
  ],
  "projects": [
    { "name": "", "description": "", "link": "" }
  ]
}

Don't include a "photo" field — I'll add my photo directly in the app. Reply with the JSON only (a single \`\`\`json code block is fine), no extra commentary, so I can upload the file straight into the CV builder.`
