import { EducationEntry } from '../../types'
import { makeId } from '../../utils/id'
import { AddButton, EntryCard, Field, Section, TextAreaField } from './FormControls'

export function EducationForm({
  data,
  onChange,
}: {
  data: EducationEntry[]
  onChange: (data: EducationEntry[]) => void
}) {
  function update(id: string, patch: Partial<EducationEntry>) {
    onChange(data.map((e) => (e.id === id ? { ...e, ...patch } : e)))
  }

  function add() {
    onChange([
      ...data,
      {
        id: makeId(),
        degree: '',
        institution: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ])
  }

  function remove(id: string) {
    onChange(data.filter((e) => e.id !== id))
  }

  return (
    <Section title="Education" subtitle="Most recent first.">
      {data.map((entry) => (
        <EntryCard key={entry.id} onRemove={() => remove(entry.id)}>
          <div className="grid grid-cols-2 gap-3 pr-6">
            <Field
              label="Degree"
              value={entry.degree}
              onChange={(e) => update(entry.id, { degree: e.target.value })}
              placeholder="M.Sc. Computer Science"
            />
            <Field
              label="Institution"
              value={entry.institution}
              onChange={(e) => update(entry.id, { institution: e.target.value })}
              placeholder="ETH Zurich"
            />
            <Field
              label="Location"
              value={entry.location}
              onChange={(e) => update(entry.id, { location: e.target.value })}
              placeholder="Zurich, Switzerland"
            />
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Start"
                value={entry.startDate}
                onChange={(e) => update(entry.id, { startDate: e.target.value })}
                placeholder="2016"
              />
              <Field
                label="End"
                value={entry.endDate}
                onChange={(e) => update(entry.id, { endDate: e.target.value })}
                placeholder="2020"
              />
            </div>
          </div>
          <TextAreaField
            label="Description"
            rows={2}
            value={entry.description}
            onChange={(e) => update(entry.id, { description: e.target.value })}
            placeholder="Thesis topic, honours, relevant coursework…"
          />
        </EntryCard>
      ))}
      <AddButton onClick={add} label="Add education" />
    </Section>
  )
}
