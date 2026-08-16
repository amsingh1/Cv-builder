import { ExperienceEntry } from '../../types'
import { makeId } from '../../utils/id'
import { AddButton, EntryCard, Field, Section, TextAreaField } from './FormControls'

export function ExperienceForm({
  data,
  onChange,
}: {
  data: ExperienceEntry[]
  onChange: (data: ExperienceEntry[]) => void
}) {
  function update(id: string, patch: Partial<ExperienceEntry>) {
    onChange(data.map((e) => (e.id === id ? { ...e, ...patch } : e)))
  }

  function add() {
    onChange([
      ...data,
      {
        id: makeId(),
        role: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
      },
    ])
  }

  function remove(id: string) {
    onChange(data.filter((e) => e.id !== id))
  }

  return (
    <Section title="Work experience" subtitle="Most recent first.">
      {data.map((entry) => (
        <EntryCard key={entry.id} onRemove={() => remove(entry.id)}>
          <div className="grid grid-cols-2 gap-3 pr-6">
            <Field
              label="Role"
              value={entry.role}
              onChange={(e) => update(entry.id, { role: e.target.value })}
              placeholder="Technical Consultant"
            />
            <Field
              label="Company"
              value={entry.company}
              onChange={(e) => update(entry.id, { company: e.target.value })}
              placeholder="Acme GmbH"
            />
            <Field
              label="Location"
              value={entry.location}
              onChange={(e) => update(entry.id, { location: e.target.value })}
              placeholder="Berlin, Germany"
            />
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Start"
                value={entry.startDate}
                onChange={(e) => update(entry.id, { startDate: e.target.value })}
                placeholder="Jan 2022"
              />
              <Field
                label="End"
                value={entry.current ? 'Present' : entry.endDate}
                disabled={entry.current}
                onChange={(e) => update(entry.id, { endDate: e.target.value })}
                placeholder="Mar 2024"
              />
            </div>
          </div>
          <label className="flex items-center gap-2 text-xs font-medium text-ink-500">
            <input
              type="checkbox"
              checked={entry.current}
              onChange={(e) => update(entry.id, { current: e.target.checked })}
              className="h-3.5 w-3.5 rounded border-ink-300 text-ink-700 focus:ring-ink-500"
            />
            I currently work here
          </label>
          <TextAreaField
            label="Description"
            rows={3}
            value={entry.description}
            onChange={(e) => update(entry.id, { description: e.target.value })}
            placeholder="Key responsibilities and achievements, ideally as short bullet-style sentences."
          />
        </EntryCard>
      ))}
      <AddButton onClick={add} label="Add experience" />
    </Section>
  )
}
