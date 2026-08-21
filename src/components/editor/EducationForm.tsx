import { useState } from 'react'
import { EducationEntry } from '../../types'
import { makeId } from '../../utils/id'
import { AddButton, CompactEntryCard, Field, TextAreaField } from './FormControls'

export function EducationForm({
  data,
  onChange,
}: {
  data: EducationEntry[]
  onChange: (data: EducationEntry[]) => void
}) {
  const [expandedId, setExpandedId] = useState<string | null>(data[0]?.id ?? null)

  function update(id: string, patch: Partial<EducationEntry>) {
    onChange(data.map((e) => (e.id === id ? { ...e, ...patch } : e)))
  }

  function add() {
    const entry: EducationEntry = {
      id: makeId(),
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    }
    onChange([...data, entry])
    setExpandedId(entry.id)
  }

  function duplicate(id: string) {
    const source = data.find((e) => e.id === id)
    if (!source) return
    const index = data.findIndex((e) => e.id === id)
    const copy: EducationEntry = { ...source, id: makeId() }
    onChange([...data.slice(0, index + 1), copy, ...data.slice(index + 1)])
    setExpandedId(copy.id)
  }

  function remove(id: string) {
    onChange(data.filter((e) => e.id !== id))
  }

  function move(id: string, direction: -1 | 1) {
    const index = data.findIndex((e) => e.id === id)
    const target = index + direction
    if (target < 0 || target >= data.length) return
    const next = [...data]
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next)
  }

  return (
    <div className="space-y-3">
      {data.map((entry, i) => (
        <CompactEntryCard
          key={entry.id}
          title={entry.degree || 'New degree'}
          subtitle={entry.institution}
          meta={entry.startDate || entry.endDate ? `${entry.startDate}${entry.startDate ? ' – ' : ''}${entry.endDate}` : undefined}
          expanded={expandedId === entry.id}
          onToggle={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
          onDuplicate={() => duplicate(entry.id)}
          onRemove={() => remove(entry.id)}
          onMoveUp={i > 0 ? () => move(entry.id, -1) : undefined}
          onMoveDown={i < data.length - 1 ? () => move(entry.id, 1) : undefined}
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
        </CompactEntryCard>
      ))}
      <AddButton onClick={add} label="Add education" />
    </div>
  )
}
