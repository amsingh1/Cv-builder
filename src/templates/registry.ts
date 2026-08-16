import { ComponentType } from 'react'
import { CVData } from '../types'
import { VibrantBlue } from './VibrantBlue'
import { ClassicNavy } from './ClassicNavy'
import { WarmIvory } from './WarmIvory'
import { Minimal } from './Minimal'
import { Editorial } from './Editorial'

export interface CVTemplate {
  id: string
  name: string
  description: string
  swatch: [string, string, string]
  component: ComponentType<{ data: CVData }>
}

export const TEMPLATES: CVTemplate[] = [
  {
    id: 'vibrant-blue',
    name: 'Vibrant Blue',
    description: 'Bright royal-blue sidebar, bold and modern.',
    swatch: ['#17337d', '#1d54d1', '#ffffff'],
    component: VibrantBlue,
  },
  {
    id: 'classic-navy',
    name: 'Classic Navy',
    description: 'Understated navy and cream — traditional and professional.',
    swatch: ['#132a42', '#2fa8d5', '#fdfaf5'],
    component: ClassicNavy,
  },
  {
    id: 'warm-ivory',
    name: 'Warm Ivory',
    description: 'Espresso and terracotta on cream — warm and elegant.',
    swatch: ['#2a2119', '#c1694f', '#fdfaf5'],
    component: WarmIvory,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Single column, near-monochrome — clean and ATS-friendly.',
    swatch: ['#0f172a', '#475569', '#ffffff'],
    component: Minimal,
  },
  {
    id: 'editorial',
    name: 'Editorial',
    description: 'Serif headings and a wine accent — refined and distinctive.',
    swatch: ['#7a2e38', '#78716c', '#fffdf9'],
    component: Editorial,
  },
]

export const DEFAULT_TEMPLATE_ID = TEMPLATES[0].id

export function getTemplate(id: string): CVTemplate {
  return TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0]
}
