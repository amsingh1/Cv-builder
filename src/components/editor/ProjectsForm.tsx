import { ProjectEntry } from '../../types'
import { makeId } from '../../utils/id'
import { AddButton, EntryCard, Field, Section, TextAreaField } from './FormControls'

export function ProjectsForm({
  data,
  onChange,
}: {
  data: ProjectEntry[]
  onChange: (data: ProjectEntry[]) => void
}) {
  function update(id: string, patch: Partial<ProjectEntry>) {
    onChange(data.map((p) => (p.id === id ? { ...p, ...patch } : p)))
  }

  function add() {
    onChange([...data, { id: makeId(), name: '', description: '', link: '' }])
  }

  function remove(id: string) {
    onChange(data.filter((p) => p.id !== id))
  }

  return (
    <Section title="Projects" subtitle="Optional — good for portfolio pieces." defaultOpen={false}>
      {data.map((project) => (
        <EntryCard key={project.id} onRemove={() => remove(project.id)}>
          <div className="grid grid-cols-2 gap-3 pr-6">
            <Field
              label="Project name"
              value={project.name}
              onChange={(e) => update(project.id, { name: e.target.value })}
              placeholder="Internal DevOps platform"
            />
            <Field
              label="Link"
              value={project.link}
              onChange={(e) => update(project.id, { link: e.target.value })}
              placeholder="github.com/you/project"
            />
          </div>
          <TextAreaField
            label="Description"
            rows={2}
            value={project.description}
            onChange={(e) => update(project.id, { description: e.target.value })}
            placeholder="What it does and the impact it had."
          />
        </EntryCard>
      ))}
      <AddButton onClick={add} label="Add project" />
    </Section>
  )
}
