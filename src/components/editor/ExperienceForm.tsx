import { useState } from 'react'
import { ExperienceEntry } from '../../types'
import { makeId } from '../../utils/id'
import { AddButton, CompactEntryCard, Field, TextAreaField } from './FormControls'

export function ExperienceForm({
  data,
  onChange,
}: {
  data: ExperienceEntry[]
  onChange: (data: ExperienceEntry[]) => void
}) {
  const [expandedId, setExpandedId] = useState<string | null>(data[0]?.id ?? null)

  function update(id: string, patch: Partial<ExperienceEntry>) {
    onChange(data.map((e) => (e.id === id ? { ...e, ...patch } : e)))
  }

  function add() {
    const entry: ExperienceEntry = {
      id: makeId(),
      role: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    }
    onChange([...data, entry])
    setExpandedId(entry.id)
  }

  function duplicate(id: string) {
    const source = data.find((e) => e.id === id)
    if (!source) return
    const index = data.findIndex((e) => e.id === id)
    const copy: ExperienceEntry = { ...source, id: makeId() }
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
          title={entry.role || 'New role'}
          subtitle={entry.company}
          meta={
            entry.startDate || entry.endDate || entry.current
              ? `${entry.startDate}${entry.startDate ? ' – ' : ''}${entry.current ? 'Present' : entry.endDate}`
              : undefined
          }
          expanded={expandedId === entry.id}
          onToggle={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
          onDuplicate={() => duplicate(entry.id)}
          onRemove={() => remove(entry.id)}
          onMoveUp={i > 0 ? () => move(entry.id, -1) : undefined}
          onMoveDown={i < data.length - 1 ? () => move(entry.id, 1) : undefined}
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
        </CompactEntryCard>
      ))}
      <AddButton onClick={add} label="Add experience" />
    </div>
  )
}
