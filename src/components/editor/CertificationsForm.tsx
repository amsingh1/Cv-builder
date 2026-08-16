import { CertificationEntry } from '../../types'
import { makeId } from '../../utils/id'
import { AddButton, EntryCard, Field, Section } from './FormControls'

export function CertificationsForm({
  data,
  onChange,
}: {
  data: CertificationEntry[]
  onChange: (data: CertificationEntry[]) => void
}) {
  function update(id: string, patch: Partial<CertificationEntry>) {
    onChange(data.map((c) => (c.id === id ? { ...c, ...patch } : c)))
  }

  function add() {
    onChange([...data, { id: makeId(), name: '', issuer: '', date: '' }])
  }

  function remove(id: string) {
    onChange(data.filter((c) => c.id !== id))
  }

  return (
    <Section title="Certifications" subtitle="Optional.">
      {data.map((cert) => (
        <EntryCard key={cert.id} onRemove={() => remove(cert.id)}>
          <div className="grid grid-cols-2 gap-3 pr-6">
            <Field
              label="Certification"
              value={cert.name}
              onChange={(e) => update(cert.id, { name: e.target.value })}
              placeholder="AWS Solutions Architect"
            />
            <Field
              label="Issuer"
              value={cert.issuer}
              onChange={(e) => update(cert.id, { issuer: e.target.value })}
              placeholder="Amazon Web Services"
            />
            <Field
              label="Date"
              value={cert.date}
              onChange={(e) => update(cert.id, { date: e.target.value })}
              placeholder="2023"
            />
          </div>
        </EntryCard>
      ))}
      <AddButton onClick={add} label="Add certification" />
    </Section>
  )
}
