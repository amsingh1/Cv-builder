import { useRef, useState } from 'react'
import { CVData, emptyCV } from './types'
import { useLocalStorage } from './hooks/useLocalStorage'
import { sampleCV } from './data/sample'
import { AI_PROMPT_TEMPLATE, downloadCVData, parseCVData } from './utils/cvIO'
import { PersonalForm } from './components/editor/PersonalForm'
import { ExperienceForm } from './components/editor/ExperienceForm'
import { EducationForm } from './components/editor/EducationForm'
import { SkillsForm } from './components/editor/SkillsForm'
import { LanguagesForm } from './components/editor/LanguagesForm'
import { CertificationsForm } from './components/editor/CertificationsForm'
import { ProjectsForm } from './components/editor/ProjectsForm'
import { ScaledPreview } from './components/preview/ScaledPreview'
import { Dropdown, DropdownDivider, DropdownItem } from './components/Dropdown'
import { DEFAULT_TEMPLATE_ID, TEMPLATES, getTemplate } from './templates/registry'

type MobileTab = 'edit' | 'preview'

export default function App() {
  const [data, setData] = useLocalStorage<CVData>('cv-builder:data', emptyCV)
  const [confirmingClear, setConfirmingClear] = useState(false)
  const [promptCopied, setPromptCopied] = useState(false)
  const [mobileTab, setMobileTab] = useState<MobileTab>('edit')
  const [templateId, setTemplateId] = useLocalStorage<string>('cv-builder:template', DEFAULT_TEMPLATE_ID)
  const fileInput = useRef<HTMLInputElement>(null)
  const selectedTemplate = getTemplate(templateId)

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

  return (
    <div className="min-h-screen bg-ink-50">
      <header className="print-hidden sticky top-0 z-10 border-b border-ink-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <h1 className="text-base font-bold text-ink-800">CV Builder</h1>
            <p className="hidden truncate text-xs text-ink-400 sm:block">
              Everything stays in your browser — nothing is uploaded anywhere.
            </p>
          </div>
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
              className="flex items-center gap-1.5 rounded-lg bg-ink-800 px-3 py-2 text-xs font-semibold text-white hover:bg-ink-700 sm:px-4"
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
          <PersonalForm data={data.personal} onChange={(personal) => setData({ ...data, personal })} />
          <ExperienceForm
            data={data.experience}
            onChange={(experience) => setData({ ...data, experience })}
          />
          <EducationForm data={data.education} onChange={(education) => setData({ ...data, education })} />
          <SkillsForm data={data.skills} onChange={(skills) => setData({ ...data, skills })} />
          <LanguagesForm data={data.languages} onChange={(languages) => setData({ ...data, languages })} />
          <CertificationsForm
            data={data.certifications}
            onChange={(certifications) => setData({ ...data, certifications })}
          />
          <ProjectsForm data={data.projects} onChange={(projects) => setData({ ...data, projects })} />
        </div>

        <div
          className={`cv-preview-panel ${mobileTab === 'preview' ? 'block' : 'hidden'} min-w-0 pb-24 lg:block lg:flex-1`}
        >
          <div className="print-hidden mb-4 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            <span className="text-xs font-medium text-ink-500">Design:</span>
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
          </div>
          <ScaledPreview data={data} Template={selectedTemplate.component} />
        </div>
      </div>
    </div>
  )
}
