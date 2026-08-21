import { TextAreaField } from './FormControls'

export function SummaryForm({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <TextAreaField
      label="Professional summary"
      rows={6}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="A short paragraph about your experience, focus areas and what you're looking for. 2-4 sentences is plenty."
    />
  )
}
