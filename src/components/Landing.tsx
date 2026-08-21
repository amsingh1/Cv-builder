import { sampleCV } from '../data/sample'
import { TEMPLATES } from '../templates/registry'
import { TemplateGallery } from './TemplateGallery'

const SHOWCASE_IDS = ['vibrant-blue', 'classic-navy', 'minimal']

export function Landing({
  onStart,
  onSelectTemplate,
}: {
  onStart: () => void
  onSelectTemplate: (templateId: string) => void
}) {
  const showcaseTemplates = TEMPLATES.filter((t) => SHOWCASE_IDS.includes(t.id))

  function scrollToTemplates() {
    document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-ink-50">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <span className="text-base font-bold tracking-tight text-ink-800">
          BuildFree<span className="text-cvblue-600">CV</span>
        </span>
        <button
          onClick={onStart}
          className="rounded-lg bg-ink-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-ink-700"
        >
          Create My CV
        </button>
      </header>

      <section className="mx-auto max-w-4xl px-4 pb-16 pt-10 text-center sm:px-6 sm:pt-16">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
          Build a Professional CV.
          <br />
          <span className="text-cvblue-600">Completely Free.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-500 sm:text-lg">
          No signup, no credit card, no hidden fees. Fill in your details, pick a template, and
          download a polished PDF — all done privately in your own browser.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={onStart}
            className="w-full rounded-lg bg-cvblue-600 px-7 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-cvblue-700 sm:w-auto"
          >
            Create My CV
          </button>
          <button
            onClick={scrollToTemplates}
            className="w-full rounded-lg border border-ink-200 bg-white px-7 py-3.5 text-base font-semibold text-ink-700 transition hover:border-ink-400 sm:w-auto"
          >
            View Templates
          </button>
        </div>

        <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-ink-400 sm:text-sm">
          <span className="flex items-center gap-1.5">
            <CheckIcon /> No signup
          </span>
          <span className="flex items-center gap-1.5">
            <CheckIcon /> No credit card
          </span>
          <span className="flex items-center gap-1.5">
            <CheckIcon /> Free PDF download
          </span>
          <span className="flex items-center gap-1.5">
            <CheckIcon /> Your data stays in your browser
          </span>
        </div>
      </section>

      <section id="templates" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="mx-auto mb-8 max-w-xl text-center">
          <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
            See what your CV could look like
          </h2>
          <p className="mt-2 text-sm text-ink-500 sm:text-base">
            Real templates, shown with sample content. Pick one to start — you can always change
            it later without losing your work.
          </p>
        </div>
        <TemplateGallery
          templates={showcaseTemplates}
          data={sampleCV}
          onSelect={onSelectTemplate}
          actionLabel="Use this template"
        />
      </section>

      <footer className="border-t border-ink-100 px-4 py-10 text-center sm:px-6">
        <p className="text-sm text-ink-500">
          Free forever. No accounts, no tracking, no PDF fees.
        </p>
        <button
          onClick={onStart}
          className="mt-4 rounded-lg bg-ink-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink-700"
        >
          Create My CV
        </button>
      </footer>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-cvblue-600" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  )
}
