import { CVData } from '../../types'

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')
}

function SidebarHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-sky-300">
      {children}
    </h3>
  )
}

function MainHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 border-b-2 border-sky-500 pb-1 text-[12px] font-bold uppercase tracking-[0.1em] text-navy-800">
      {children}
    </h3>
  )
}

function LevelBar({ value, max }: { value: number; max: number }) {
  return (
    <div className="mt-1 flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`h-1 flex-1 rounded-full ${i < value ? 'bg-sky-400' : 'bg-white/15'}`}
        />
      ))}
    </div>
  )
}

const SKILL_LEVEL_VALUE: Record<string, number> = {
  Basic: 1,
  Intermediate: 2,
  Advanced: 3,
  Expert: 4,
}

const LANG_LEVEL_VALUE: Record<string, number> = {
  A1: 1,
  A2: 2,
  B1: 3,
  B2: 4,
  C1: 5,
  C2: 6,
  Native: 6,
}

export function CVPreview({ data }: { data: CVData }) {
  const p = data.personal
  const hasContact = p.email || p.phone || p.location || p.linkedin || p.github || p.website
  const hasDetails = p.nationality || p.dateOfBirth || p.drivingLicence

  return (
    <div
      id="cv-preview"
      className="mx-auto flex flex-col overflow-hidden rounded-lg bg-cream-50 text-navy-800 shadow-xl"
      style={{ width: '210mm', minHeight: '297mm' }}
    >
      <div className="h-2 w-full shrink-0 bg-gradient-to-r from-navy-800 via-sky-500 to-sky-300" />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className="flex w-[72mm] shrink-0 flex-col gap-6 bg-navy-900 px-6 py-8 text-cream-100"
          style={{ fontSize: '9.5px' }}
        >
          <div className="flex flex-col items-center text-center">
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-sky-400/40 bg-navy-700">
              {p.photo ? (
                <img src={p.photo} alt={p.fullName || 'Profile'} className="h-full w-full object-cover" />
              ) : (
                <span className="text-3xl font-semibold text-sky-200">
                  {initials(p.fullName) || ''}
                </span>
              )}
            </div>
            {p.fullName && (
              <h1 className="mt-4 text-[15px] font-bold leading-tight text-cream-50">{p.fullName}</h1>
            )}
            {p.jobTitle && (
              <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-sky-300">
                {p.jobTitle}
              </p>
            )}
          </div>

          {hasContact && (
            <div>
              <SidebarHeading>Contact</SidebarHeading>
              <ul className="space-y-1.5 break-words text-cream-100">
                {p.email && <li>{p.email}</li>}
                {p.phone && <li>{p.phone}</li>}
                {p.location && <li>{p.location}</li>}
                {p.linkedin && <li>{p.linkedin}</li>}
                {p.github && <li>{p.github}</li>}
                {p.website && <li>{p.website}</li>}
              </ul>
            </div>
          )}

          {hasDetails && (
            <div>
              <SidebarHeading>Details</SidebarHeading>
              <ul className="space-y-1.5 text-cream-100">
                {p.dateOfBirth && (
                  <li>
                    <span className="text-sky-300/80">Born:</span> {p.dateOfBirth}
                  </li>
                )}
                {p.nationality && (
                  <li>
                    <span className="text-sky-300/80">Nationality:</span> {p.nationality}
                  </li>
                )}
                {p.drivingLicence && (
                  <li>
                    <span className="text-sky-300/80">Licence:</span> {p.drivingLicence}
                  </li>
                )}
              </ul>
            </div>
          )}

          {data.skills.length > 0 && (
            <div>
              <SidebarHeading>Skills</SidebarHeading>
              <ul className="space-y-2">
                {data.skills.map((s) => (
                  <li key={s.id}>
                    <span>{s.name}</span>
                    <LevelBar value={SKILL_LEVEL_VALUE[s.level] ?? 0} max={4} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.languages.length > 0 && (
            <div>
              <SidebarHeading>Languages</SidebarHeading>
              <ul className="space-y-2">
                {data.languages.map((l) => (
                  <li key={l.id}>
                    <div className="flex items-baseline justify-between">
                      <span>{l.name}</span>
                      <span className="text-sky-300/80">{l.level}</span>
                    </div>
                    <LevelBar value={LANG_LEVEL_VALUE[l.level] ?? 0} max={6} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.certifications.length > 0 && (
            <div>
              <SidebarHeading>Certifications</SidebarHeading>
              <ul className="space-y-2">
                {data.certifications.map((c) => (
                  <li key={c.id}>
                    <p className="font-semibold text-cream-50">{c.name}</p>
                    <p className="text-cream-100/70">
                      {[c.issuer, c.date].filter(Boolean).join(' · ')}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* Main column */}
        <main className="flex-1 bg-cream-50 px-8 py-8" style={{ fontSize: '10px' }}>
          {p.summary && (
            <section className="mb-6">
              <MainHeading>Profile</MainHeading>
              <p className="leading-relaxed text-navy-600">{p.summary}</p>
            </section>
          )}

          {data.experience.length > 0 && (
            <section className="mb-6">
              <MainHeading>Work Experience</MainHeading>
              <div className="space-y-4">
                {data.experience.map((e) => (
                  <div key={e.id}>
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-semibold text-navy-800">
                        {e.role}
                        {e.role && e.company ? ' · ' : ''}
                        <span className="font-medium text-sky-500">{e.company}</span>
                      </p>
                      {(e.startDate || e.endDate || e.current) && (
                        <p className="shrink-0 text-[9px] font-medium uppercase tracking-wide text-navy-400">
                          {e.startDate}
                          {e.startDate && (e.endDate || e.current) ? ' – ' : ''}
                          {e.current ? 'Present' : e.endDate}
                        </p>
                      )}
                    </div>
                    {e.location && <p className="text-[9px] text-navy-400">{e.location}</p>}
                    {e.description && (
                      <p className="mt-1 whitespace-pre-line leading-relaxed text-navy-600">
                        {e.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.education.length > 0 && (
            <section className="mb-6">
              <MainHeading>Education</MainHeading>
              <div className="space-y-4">
                {data.education.map((e) => (
                  <div key={e.id}>
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-semibold text-navy-800">
                        {e.degree}
                        {e.degree && e.institution ? ' · ' : ''}
                        <span className="font-medium text-sky-500">{e.institution}</span>
                      </p>
                      {(e.startDate || e.endDate) && (
                        <p className="shrink-0 text-[9px] font-medium uppercase tracking-wide text-navy-400">
                          {e.startDate}
                          {e.startDate && e.endDate ? ' – ' : ''}
                          {e.endDate}
                        </p>
                      )}
                    </div>
                    {e.location && <p className="text-[9px] text-navy-400">{e.location}</p>}
                    {e.description && (
                      <p className="mt-1 whitespace-pre-line leading-relaxed text-navy-600">
                        {e.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.projects.length > 0 && (
            <section className="mb-6">
              <MainHeading>Projects</MainHeading>
              <div className="space-y-4">
                {data.projects.map((proj) => (
                  <div key={proj.id}>
                    <p className="font-semibold text-navy-800">
                      {proj.name}
                      {proj.link && <span className="ml-2 font-normal text-sky-500">{proj.link}</span>}
                    </p>
                    {proj.description && (
                      <p className="mt-1 whitespace-pre-line leading-relaxed text-navy-600">
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {!p.summary &&
            data.experience.length === 0 &&
            data.education.length === 0 &&
            data.projects.length === 0 && (
              <div className="flex h-full items-center justify-center text-center text-navy-400/60">
                <p className="max-w-xs text-sm leading-relaxed">
                  Start filling in the form on the left — your CV will take shape here in real time.
                </p>
              </div>
            )}
        </main>
      </div>
    </div>
  )
}
