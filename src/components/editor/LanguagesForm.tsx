import { LanguageEntry, LanguageLevel } from '../../types'
import { makeId } from '../../utils/id'
import { AddButton, Field, SelectField, Section } from './FormControls'

const LEVELS: LanguageLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native']

export function LanguagesForm({
  data,
  onChange,
}: {
  data: LanguageEntry[]
  onChange: (data: LanguageEntry[]) => void
}) {
  function update(id: string, patch: Partial<LanguageEntry>) {
    onChange(data.map((l) => (l.id === id ? { ...l, ...patch } : l)))
  }

  function add() {
    onChange([...data, { id: makeId(), name: '', level: 'B2' }])
  }

  function remove(id: string) {
    onChange(data.filter((l) => l.id !== id))
  }

  return (
    <Section title="Languages" subtitle="CEFR scale (A1–C2) or Native.">
      {data.map((lang) => (
        <div key={lang.id} className="flex items-end gap-2">
          <div className="flex-1">
            <Field
              label="Language"
              value={lang.name}
              onChange={(e) => update(lang.id, { name: e.target.value })}
              placeholder="French"
            />
          </div>
          <div className="w-28">
            <SelectField
              label="Level"
              options={LEVELS}
              value={lang.level}
              onChange={(e) => update(lang.id, { level: e.target.value as LanguageLevel })}
            />
          </div>
          <button
            type="button"
            onClick={() => remove(lang.id)}
            aria-label="Remove language"
            className="mb-0.5 rounded-md p-2 text-ink-300 hover:bg-red-50 hover:text-red-500"
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      ))}
      <AddButton onClick={add} label="Add language" />
    </Section>
  )
}
