import { CVData } from '../types'
import { CVTemplate } from '../templates/registry'
import { ScaledPreview } from './preview/ScaledPreview'

export function TemplateGallery({
  templates,
  data,
  selectedId,
  onSelect,
  actionLabel = 'Use this template',
}: {
  templates: CVTemplate[]
  data: CVData
  selectedId?: string
  onSelect: (id: string) => void
  actionLabel?: string
}) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-5">
      {templates.map((t) => {
        const selected = t.id === selectedId
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onSelect(t.id)}
            className={`group text-left ${selected ? '' : ''}`}
          >
            <div
              className={`aspect-[210/297] w-full overflow-hidden rounded-lg border bg-white shadow-sm transition ${
                selected
                  ? 'border-cvblue-600 ring-2 ring-cvblue-600 ring-offset-2'
                  : 'border-ink-200 group-hover:border-ink-400 group-hover:shadow-md'
              }`}
            >
              <div className="pointer-events-none h-full w-full">
                <ScaledPreview data={data} Template={t.component} />
              </div>
            </div>
            <div className="mt-2 space-y-1">
              <p className="truncate text-sm font-semibold text-ink-800">{t.name}</p>
              <p className="truncate text-xs text-ink-400">{t.description}</p>
              {selected ? (
                <span className="inline-block rounded-full bg-cvblue-600 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                  Selected
                </span>
              ) : (
                <span className="inline-block text-xs font-semibold text-cvblue-700 group-hover:underline">
                  {actionLabel}
                </span>
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}
