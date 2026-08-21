import { useEffect, useRef, useState } from 'react'
import { CVData, emptyCV } from './types'
import { useLocalStorage } from './hooks/useLocalStorage'
import { sampleCV } from './data/sample'
import { AI_PROMPT_TEMPLATE, downloadCVData, parseCVData } from './utils/cvIO'
import { getCompletion } from './utils/completion'
import { PersonalForm } from './components/editor/PersonalForm'
import { SummaryForm } from './components/editor/SummaryForm'
import { ExperienceForm } from './components/editor/ExperienceForm'
import { EducationForm } from './components/editor/EducationForm'
import { SkillsForm } from './components/editor/SkillsForm'
import { LanguagesForm } from './components/editor/LanguagesForm'
import { CertificationsForm } from './components/editor/CertificationsForm'
import { ProjectsForm } from './components/editor/ProjectsForm'
import { ScaledPreview } from './components/preview/ScaledPreview'
import { TemplateGallery } from './components/TemplateGallery'
import { Landing } from './components/Landing'
import { Dropdown, DropdownDivider, DropdownItem } from './components/Dropdown'
import { DEFAULT_TEMPLATE_ID, TEMPLATES, getTemplate } from './templates/registry'

type MobileTab = 'edit' | 'preview'

type SectionId =
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'languages'
  | 'additional'
  | 'design'

const BUILDER_PATH = '/builder'

const SECTIONS: { id: SectionId; label: string; subtitle: string }[] = [
  {
    id: 'personal',
    label: 'Personal Details',
    subtitle: 'Contact info and photo — everything here is optional.',
  },
  { id: 'summary', label: 'Summary', subtitle: 'A short paragraph about your experience and goals.' },
  { id: 'experience', label: 'Experience', subtitle: 'Most recent role first.' },
  { id: 'education', label: 'Education', subtitle: 'Most recent first.' },
  { id: 'skills', label: 'Skills', subtitle: 'Technologies, tools, methodologies.' },
  { id: 'languages', label: 'Languages', subtitle: 'CEFR scale (A1–C2) or Native.' },
  { id: 'additional', label: 'Additional Sections', subtitle: 'Certifications and projects — optional.' },
  { id: 'design', label: 'Design', subtitle: 'Choose a template — switching never deletes your data.' },
]

export default function App() {
  const [data, setData] = useLocalStorage<CVData>('cv-builder:data', emptyCV)
  // Which "page" is shown is driven by the URL, not persisted app state:
  // "/" is always the homepage, "/builder" is the builder. That way a
  // refresh stays on whichever page you're on (the browser reloads the
  // same URL), while opening the site fresh at "/" always lands on the
  // homepage.
  const [showLanding, setShowLanding] = useState(() => window.location.pathname !== BUILDER_PATH)
  const [confirmingClear, setConfirmingClear] = useState(false)
  const [promptCopied, setPromptCopied] = useState(false)
  const [mobileTab, setMobileTab] = useState<MobileTab>('edit')
  const [activeSection, setActiveSection] = useState<SectionId>('personal')
  const [templateId, setTemplateId] = useLocalStorage<string>('cv-builder:template', DEFAULT_TEMPLATE_ID)
  const fileInput = useRef<HTMLInputElement>(null)
  const selectedTemplate = getTemplate(templateId)
  const completion = getCompletion(data)
  const completionMap: Record<string, boolean> = Object.fromEntries(
    completion.sections.map((s) => [s.id, s.done]),
  )

  useEffect(() => {
    function onPopState() {
      setShowLanding(window.location.pathname !== BUILDER_PATH)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  function enterBuilder() {
    window.history.pushState(null, '', BUILDER_PATH)
    setShowLanding(false)
  }

  function goHome() {
    window.history.pushState(null, '', '/')
    setShowLanding(true)
  }

  if (showLanding) {
    return (
      <Landing
        onStart={enterBuilder}
        onSelectTemplate={(id) => {
          setTemplateId(id)
          enterBuilder()
        }}
      />
    )
  }

  function loadSample() {
    if (
      confirm(
        'Load example data? This will replace what you have in the form (your current data stays in this browser until you overwrite it).',
      )
    ) {
      setData(sampleCV)
    }
  }

  function clearAll() {
    setData(emptyCV)
    setConfirmingClear(false)
  }

  function handleUploadClick() {
    fileInput.current?.click()
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = parseCVData(reader.result as string)
        if (
          confirm(
            'Load this JSON into the builder? This will replace what you currently have in the form.',
          )
        ) {
          setData(parsed)
        }
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Could not read that file.')
      }
    }
    reader.readAsText(file)
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(AI_PROMPT_TEMPLATE)
      setPromptCopied(true)
      setTimeout(() => setPromptCopied(false), 2000)
    } catch {
      alert('Could not copy to clipboard. Your browser may be blocking clipboard access.')
    }
  }

  function handlePrint() {
    const previousTitle = document.title
    document.title = data.personal.fullName ? `${data.personal.fullName} - CV` : 'CV'
    window.print()
    setTimeout(() => {
      document.title = previousTitle
    }, 0)
  }

  const activeDef = SECTIONS.find((s) => s.id === activeSection)!

  return (
    <div className="min-h-screen bg-ink-50">
      <header className="print-hidden sticky top-0 z-10 border-b border-ink-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <button type="button" onClick={goHome} className="min-w-0 text-left">
            <h1 className="text-base font-bold text-ink-800">
              BuildFree<span className="text-cvblue-600">CV</span>
            </h1>
            <p className="hidden truncate text-xs text-ink-400 sm:block">
              Everything stays in your browser — nothing is uploaded anywhere.
            </p>
          </button>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Dropdown label="Data">
              <DropdownItem onClick={copyPrompt}>
                {promptCopied ? 'Copied!' : 'Copy prompt for Claude…'}
              </DropdownItem>
              <DropdownItem onClick={handleUploadClick}>Upload JSON</DropdownItem>
              <DropdownItem onClick={() => downloadCVData(data)}>Download JSON</DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={loadSample}>Load example</DropdownItem>
              <DropdownDivider />
              <DropdownItem danger onClick={() => setConfirmingClear(true)}>
                Clear all
              </DropdownItem>
            </Dropdown>
            <input
              ref={fileInput}
              type="file"
              accept="application/json,.json"
              onChange={handleFileChange}
              className="hidden"
            />
            {confirmingClear && (
              <div className="flex items-center gap-1.5 text-xs">
                <span className="hidden text-ink-500 sm:inline">Clear everything?</span>
                <button
                  onClick={clearAll}
                  className="rounded-lg bg-red-500 px-2.5 py-1.5 font-medium text-white hover:bg-red-600"
                >
                  Yes, clear
                </button>
                <button
                  onClick={() => setConfirmingClear(false)}
                  className="rounded-lg px-2.5 py-1.5 font-medium text-ink-500 hover:bg-ink-100"
                >
                  Cancel
                </button>
              </div>
            )}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 sm:px-4"
            >
              <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5 2.75C5 1.784 5.784 1 6.75 1h6.5c.966 0 1.75.784 1.75 1.75v3.552c.377.046.752.097 1.126.153A2.212 2.212 0 0118 8.653v4.097A2.25 2.25 0 0115.75 15h-.241l.305 2.443a.75.75 0 01-.744.807H4.93a.75.75 0 01-.744-.807L4.491 15H4.25A2.25 2.25 0 012 12.75V8.653c0-1.082.775-2.008 1.874-2.198.374-.056.75-.107 1.126-.153V2.75zm8.5 3.397a41.533 41.533 0 00-7 0V2.75a.25.25 0 01.25-.25h6.5a.25.25 0 01.25.25v3.397zM6.06 15l-.262 2.5h8.404L14 15H6.06z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>
          </div>
        </div>

        {/* Edit/Preview switcher — only needed once the two columns no longer fit side by side */}
        <div className="border-t border-ink-100 px-4 py-2 sm:px-6 lg:hidden">
          <div className="flex gap-1 rounded-lg bg-ink-50 p-1">
            <button
              onClick={() => setMobileTab('edit')}
              className={`flex-1 rounded-md py-1.5 text-xs font-semibold transition-colors ${
                mobileTab === 'edit' ? 'bg-white text-ink-800 shadow-sm' : 'text-ink-500'
              }`}
            >
              Edit
            </button>
            <button
              onClick={() => setMobileTab('preview')}
              className={`flex-1 rounded-md py-1.5 text-xs font-semibold transition-colors ${
                mobileTab === 'preview' ? 'bg-white text-ink-800 shadow-sm' : 'text-ink-500'
              }`}
            >
              Preview
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row">
        <div
          className={`${mobileTab === 'edit' ? 'block' : 'hidden'} print-hidden editor-scroll w-full space-y-4 pb-24 lg:block lg:sticky lg:top-[76px] lg:max-h-[calc(100vh-92px)] lg:w-[460px] lg:shrink-0 lg:overflow-y-auto`}
        >
          <div className="rounded-xl border border-ink-100 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold text-ink-500">CV completion</span>
              <span className="text-xs font-bold text-cvblue-700">{completion.percent}%</span>
            </div>
            <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
              <div
                className="h-full rounded-full bg-cvblue-600 transition-all"
                style={{ width: `${completion.percent}%` }}
              />
            </div>
            <nav className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveSection(s.id)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    activeSection === s.id
                      ? 'bg-ink-800 text-white'
                      : 'bg-ink-50 text-ink-600 hover:bg-ink-100'
                  }`}
                >
                  {completionMap[s.id] && (
                    <svg
                      className={`h-3 w-3 ${activeSection === s.id ? 'text-emerald-400' : 'text-emerald-500'}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {s.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="rounded-xl border border-ink-100 bg-white shadow-sm">
            <div className="border-b border-ink-100 px-5 py-4">
              <h2 className="text-sm font-semibold tracking-wide text-ink-800">{activeDef.label}</h2>
              <p className="mt-0.5 text-xs text-ink-400">{activeDef.subtitle}</p>
            </div>
            <div className="px-5 py-4">
              {activeSection === 'personal' && (
                <PersonalForm data={data.personal} onChange={(personal) => setData({ ...data, personal })} />
              )}
              {activeSection === 'summary' && (
                <SummaryForm
                  value={data.personal.summary}
                  onChange={(summary) => setData({ ...data, personal: { ...data.personal, summary } })}
                />
              )}
              {activeSection === 'experience' && (
                <ExperienceForm
                  data={data.experience}
                  onChange={(experience) => setData({ ...data, experience })}
                />
              )}
              {activeSection === 'education' && (
                <EducationForm data={data.education} onChange={(education) => setData({ ...data, education })} />
              )}
              {activeSection === 'skills' && (
                <SkillsForm data={data.skills} onChange={(skills) => setData({ ...data, skills })} />
              )}
              {activeSection === 'languages' && (
                <LanguagesForm data={data.languages} onChange={(languages) => setData({ ...data, languages })} />
              )}
              {activeSection === 'additional' && (
                <div className="space-y-6">
                  <CertificationsForm
                    data={data.certifications}
                    onChange={(certifications) => setData({ ...data, certifications })}
                  />
                  <div className="border-t border-ink-100 pt-6">
                    <ProjectsForm data={data.projects} onChange={(projects) => setData({ ...data, projects })} />
                  </div>
                </div>
              )}
              {activeSection === 'design' && (
                <TemplateGallery
                  templates={TEMPLATES}
                  data={data}
                  selectedId={templateId}
                  onSelect={setTemplateId}
                  actionLabel="Select"
                />
              )}
            </div>
          </div>
        </div>

        <div
          className={`cv-preview-panel ${mobileTab === 'preview' ? 'block' : 'hidden'} min-w-0 pb-24 lg:block lg:flex-1`}
        >
          <div className="print-hidden mb-4 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            <span className="text-xs font-medium text-ink-500">Template:</span>
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTemplateId(t.id)}
                title={t.name}
                aria-label={t.name}
                className={`h-8 w-8 shrink-0 overflow-hidden rounded-md border transition ${
                  templateId === t.id
                    ? 'border-ink-800 ring-2 ring-ink-800 ring-offset-1'
                    : 'border-ink-200 hover:border-ink-400'
                }`}
                style={{
                  background: `linear-gradient(135deg, ${t.swatch[0]} 0%, ${t.swatch[0]} 50%, ${t.swatch[1]} 50%, ${t.swatch[1]} 100%)`,
                }}
              />
            ))}
            <span className="text-xs text-ink-500">{selectedTemplate.name}</span>
            <button
              type="button"
              onClick={() => {
                setActiveSection('design')
                setMobileTab('edit')
              }}
              className="ml-1 text-xs font-semibold text-cvblue-700 hover:underline"
            >
              Browse all
            </button>
          </div>

          <ScaledPreview data={data} Template={selectedTemplate.component} />
          <p className="print-hidden mt-3 text-center text-xs text-ink-400">
            Generated directly in your browser — nothing is ever uploaded.
          </p>
        </div>
      </div>
    </div>
  )
}
