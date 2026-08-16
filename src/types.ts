export interface PersonalInfo {
  fullName: string
  jobTitle: string
  photo: string // base64 data URL, empty string if none
  email: string
  phone: string
  location: string
  nationality: string
  dateOfBirth: string
  drivingLicence: string
  linkedin: string
  github: string
  website: string
  summary: string
}

export interface ExperienceEntry {
  id: string
  role: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface EducationEntry {
  id: string
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string
  description: string
}

export type SkillLevel = 'Basic' | 'Intermediate' | 'Advanced' | 'Expert'

export interface SkillEntry {
  id: string
  name: string
  level: SkillLevel
}

export type LanguageLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Native'

export interface LanguageEntry {
  id: string
  name: string
  level: LanguageLevel
}

export interface CertificationEntry {
  id: string
  name: string
  issuer: string
  date: string
}

export interface ProjectEntry {
  id: string
  name: string
  description: string
  link: string
}

export interface CVData {
  personal: PersonalInfo
  experience: ExperienceEntry[]
  education: EducationEntry[]
  skills: SkillEntry[]
  languages: LanguageEntry[]
  certifications: CertificationEntry[]
  projects: ProjectEntry[]
}

export const emptyPersonal: PersonalInfo = {
  fullName: '',
  jobTitle: '',
  photo: '',
  email: '',
  phone: '',
  location: '',
  nationality: '',
  dateOfBirth: '',
  drivingLicence: '',
  linkedin: '',
  github: '',
  website: '',
  summary: '',
}

export const emptyCV: CVData = {
  personal: emptyPersonal,
  experience: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  projects: [],
}
