import { ReactNode } from 'react'

export function Field({
  label,
  className,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${className ?? ''}`}>
      <span className="mb-1 block text-xs font-medium text-ink-500">{label}</span>
      <input
        {...props}
        className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm text-ink-800 placeholder:text-ink-300 focus:border-ink-500 focus:outline-none focus:ring-1 focus:ring-ink-500"
      />
    </label>
  )
}

export function TextAreaField({
  label,
  ...props
}: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-ink-500">{label}</span>
      <textarea
        {...props}
        className="w-full resize-y rounded-lg border border-ink-200 px-3 py-2 text-sm text-ink-800 placeholder:text-ink-300 focus:border-ink-500 focus:outline-none focus:ring-1 focus:ring-ink-500"
      />
    </label>
  )
}

export function SelectField({
  label,
  options,
  ...props
}: {
  label: string
  options: string[]
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-ink-500">{label}</span>
      <select
        {...props}
        className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm text-ink-800 focus:border-ink-500 focus:outline-none focus:ring-1 focus:ring-ink-500"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}

export function IconButton({
  onClick,
  label,
  variant = 'default',
}: {
  onClick: () => void
  label: string
  variant?: 'default' | 'danger'
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
        variant === 'danger'
          ? 'text-red-500 hover:bg-red-50'
          : 'text-ink-500 hover:bg-ink-50'
      }`}
    >
      {label}
    </button>
  )
}

export function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-ink-300 py-2 text-sm font-medium text-ink-500 transition-colors hover:border-ink-500 hover:bg-ink-50 hover:text-ink-700"
    >
      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 4a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 0110 4z" />
      </svg>
      {label}
    </button>
  )
}

export function CompactEntryCard({
  title,
  subtitle,
  meta,
  expanded,
  onToggle,
  onDuplicate,
  onRemove,
  onMoveUp,
  onMoveDown,
  children,
}: {
  title: string
  subtitle?: string
  meta?: string
  expanded: boolean
  onToggle: () => void
  onDuplicate: () => void
  onRemove: () => void
  onMoveUp?: () => void
  onMoveDown?: () => void
  children: ReactNode
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-ink-100 bg-ink-50/50">
      <div className="flex items-start gap-2 py-3 pl-4 pr-2">
        <button type="button" onClick={onToggle} className="min-w-0 flex-1 text-left">
          <p className="truncate text-sm font-semibold text-ink-800">{title || 'Untitled'}</p>
          {(subtitle || meta) && (
            <p className="mt-0.5 truncate text-xs text-ink-500">
              {subtitle}
              {subtitle && meta ? ' · ' : ''}
              {meta}
            </p>
          )}
        </button>
        <div className="flex shrink-0 items-center gap-0.5">
          {onMoveUp && (
            <button
              type="button"
              onClick={onMoveUp}
              aria-label="Move up"
              className="rounded-md p-1.5 text-ink-300 hover:bg-white hover:text-ink-600"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 4.75a.75.75 0 01.53.22l4 4a.75.75 0 01-1.06 1.06L10.75 7.31V15a.75.75 0 01-1.5 0V7.31L6.53 10.03a.75.75 0 01-1.06-1.06l4-4A.75.75 0 0110 4.75z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
          {onMoveDown && (
            <button
              type="button"
              onClick={onMoveDown}
              aria-label="Move down"
              className="rounded-md p-1.5 text-ink-300 hover:bg-white hover:text-ink-600"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 15.25a.75.75 0 01-.53-.22l-4-4a.75.75 0 111.06-1.06l2.72 2.72V5a.75.75 0 011.5 0v7.69l2.72-2.72a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-.53.22z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 border-t border-ink-100 px-4 py-2 text-xs font-semibold">
        <button type="button" onClick={onToggle} className="text-ink-600 hover:text-ink-900">
          {expanded ? 'Done' : 'Edit'}
        </button>
        <span className="text-ink-200">·</span>
        <button type="button" onClick={onDuplicate} className="text-ink-600 hover:text-ink-900">
          Duplicate
        </button>
        <span className="text-ink-200">·</span>
        <button type="button" onClick={onRemove} className="text-red-500 hover:text-red-600">
          Delete
        </button>
      </div>
      {expanded && <div className="space-y-3 border-t border-ink-100 bg-white p-4">{children}</div>}
    </div>
  )
}

export function EntryCard({ children, onRemove }: { children: ReactNode; onRemove: () => void }) {
  return (
    <div className="relative space-y-3 rounded-lg border border-ink-100 bg-ink-50/50 p-4">
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove entry"
        className="absolute right-3 top-3 rounded-md p-1 text-ink-300 transition-colors hover:bg-white hover:text-red-500"
      >
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {children}
    </div>
  )
}
