import { useEffect, useRef, useState } from 'react'

const SCROLL_STEP = 130

export function SectionNav({
  sections,
  activeId,
  completionMap,
  onSelect,
}: {
  sections: { id: string; label: string }[]
  activeId: string
  completionMap: Record<string, boolean>
  onSelect: (id: string) => void
}) {
  const scrollRef = useRef<HTMLElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  function updateEdges() {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 2)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2)
  }

  useEffect(() => {
    updateEdges()
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', updateEdges)
    window.addEventListener('resize', updateEdges)
    return () => {
      el.removeEventListener('scroll', updateEdges)
      window.removeEventListener('resize', updateEdges)
    }
  }, [sections.length])

  useEffect(() => {
    const el = scrollRef.current?.querySelector<HTMLButtonElement>(`[data-section-id="${activeId}"]`)
    el?.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' })
  }, [activeId])

  function step(direction: 1 | -1) {
    scrollRef.current?.scrollBy({ left: direction * SCROLL_STEP, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <nav
        ref={scrollRef}
        className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {sections.map((s) => (
          <button
            key={s.id}
            type="button"
            data-section-id={s.id}
            onClick={() => onSelect(s.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeId === s.id ? 'bg-ink-800 text-white' : 'bg-ink-50 text-ink-600 hover:bg-ink-100'
            }`}
          >
            {completionMap[s.id] && (
              <svg
                className={`h-3 w-3 ${activeId === s.id ? 'text-emerald-400' : 'text-emerald-500'}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {s.label}
          </button>
        ))}
      </nav>

      <div
        className={`pointer-events-none absolute inset-y-0 left-0 w-7 transition-opacity ${
          canScrollLeft ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ boxShadow: 'inset 20px 0 14px -6px rgba(20, 27, 35, 0.55)' }}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 w-7 transition-opacity ${
          canScrollRight ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ boxShadow: 'inset -20px 0 14px -6px rgba(20, 27, 35, 0.55)' }}
      />

      {canScrollLeft && (
        <button
          type="button"
          aria-label="Previous sections"
          onClick={() => step(-1)}
          className="absolute left-0 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 shadow-sm active:scale-95"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 010 1.06L8.832 10l3.958 3.71a.75.75 0 11-1.02 1.1l-4.5-4.25a.75.75 0 010-1.1l4.5-4.25a.75.75 0 011.02.03z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
      {canScrollRight && (
        <button
          type="button"
          aria-label="More sections"
          onClick={() => step(1)}
          className="absolute right-0 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 shadow-sm active:scale-95"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 010-1.06L11.168 10 7.21 6.29a.75.75 0 111.02-1.1l4.5 4.25a.75.75 0 010 1.1l-4.5 4.25a.75.75 0 01-1.02-.03z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  )
}
