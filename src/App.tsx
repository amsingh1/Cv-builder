import { useState } from 'react'
import { CVData, emptyCV } from './types'
import { useLocalStorage } from './hooks/useLocalStorage'
import { sampleCV } from './data/sample'
import { PersonalForm } from './components/editor/PersonalForm'
import { ExperienceForm } from './components/editor/ExperienceForm'
import { EducationForm } from './components/editor/EducationForm'
import { SkillsForm } from './components/editor/SkillsForm'
import { LanguagesForm } from './components/editor/LanguagesForm'
import { CertificationsForm } from './components/editor/CertificationsForm'
import { ProjectsForm } from './components/editor/ProjectsForm'
import { CVPreview } from './components/preview/CVPreview'

export default function App() {
  const [data, setData] = useLocalStorage<CVData>('cv-builder:data', emptyCV)
  const [confirmingClear, setConfirmingClear] = useState(false)

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

  return (
    <div className="min-h-screen bg-ink-50">
      <header className="print-hidden sticky top-0 z-10 border-b border-ink-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-3">
          <div>
            <h1 className="text-base font-bold text-ink-800">CV Builder</h1>
            <p className="text-xs text-ink-400">
              Everything stays in your browser — nothing is uploaded anywhere.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadSample}
              className="rounded-lg px-3 py-2 text-xs font-medium text-ink-500 hover:bg-ink-50"
            >
              Load example
            </button>
            {confirmingClear ? (
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-ink-500">Clear everything?</span>
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
            ) : (
              <button
                onClick={() => setConfirmingClear(true)}
                className="rounded-lg px-3 py-2 text-xs font-medium text-ink-500 hover:bg-ink-50"
              >
                Clear all
              </button>
            )}
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 rounded-lg bg-ink-800 px-4 py-2 text-xs font-semibold text-white hover:bg-ink-700"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5 2.75C5 1.784 5.784 1 6.75 1h6.5c.966 0 1.75.784 1.75 1.75v3.552c.377.046.752.097 1.126.153A2.212 2.212 0 0118 8.653v4.097A2.25 2.25 0 0115.75 15h-.241l.305 2.443a.75.75 0 01-.744.807H4.93a.75.75 0 01-.744-.807L4.491 15H4.25A2.25 2.25 0 012 12.75V8.653c0-1.082.775-2.008 1.874-2.198.374-.056.75-.107 1.126-.153V2.75zm8.5 3.397a41.533 41.533 0 00-7 0V2.75a.25.25 0 01.25-.25h6.5a.25.25 0 01.25.25v3.397zM6.06 15l-.262 2.5h8.404L14 15H6.06z"
                  clipRule="evenodd"
                />
              </svg>
              Download PDF
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px] gap-6 px-6 py-6">
        <div className="print-hidden editor-scroll w-[460px] shrink-0 space-y-4 overflow-y-auto pb-24 lg:sticky lg:top-[76px] lg:max-h-[calc(100vh-92px)]">
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

        <div className="min-w-0 flex-1 overflow-x-auto pb-24">
          <CVPreview data={data} />
        </div>
      </div>
    </div>
  )
}
