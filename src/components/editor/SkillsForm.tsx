import { SkillEntry, SkillLevel } from '../../types'
import { makeId } from '../../utils/id'
import { AddButton, Field, SelectField, Section } from './FormControls'

const LEVELS: SkillLevel[] = ['Basic', 'Intermediate', 'Advanced', 'Expert']

export function SkillsForm({
  data,
  onChange,
}: {
  data: SkillEntry[]
  onChange: (data: SkillEntry[]) => void
}) {
  function update(id: string, patch: Partial<SkillEntry>) {
    onChange(data.map((s) => (s.id === id ? { ...s, ...patch } : s)))
  }

  function add() {
    onChange([...data, { id: makeId(), name: '', level: 'Advanced' }])
  }

  function remove(id: string) {
    onChange(data.filter((s) => s.id !== id))
  }

  return (
    <Section title="Skills" subtitle="Technologies, tools, methodologies.">
      {data.map((skill) => (
        <div key={skill.id} className="flex items-end gap-2">
          <div className="flex-1">
            <Field
              label="Skill"
              value={skill.name}
              onChange={(e) => update(skill.id, { name: e.target.value })}
              placeholder="Kubernetes"
            />
          </div>
          <div className="w-36">
            <SelectField
              label="Level"
              options={LEVELS}
              value={skill.level}
              onChange={(e) => update(skill.id, { level: e.target.value as SkillLevel })}
            />
          </div>
          <button
            type="button"
            onClick={() => remove(skill.id)}
            aria-label="Remove skill"
            className="mb-0.5 rounded-md p-2 text-ink-300 hover:bg-red-50 hover:text-red-500"
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      ))}
      <AddButton onClick={add} label="Add skill" />
    </Section>
  )
}
