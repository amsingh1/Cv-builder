import { CVData } from '../types'
import { LANG_LEVEL_VALUE, SKILL_LEVEL_VALUE, initials, lines } from './shared'

function SidebarHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#e6cc9b]">
      {children}
    </h3>
  )
}

function MainHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 border-b-2 border-[#c1694f] pb-1 text-[12px] font-bold uppercase tracking-[0.1em] text-[#3a2f24]">
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
          className={`h-1 flex-1 rounded-full ${i < value ? 'bg-[#cf7d5f]' : 'bg-white/15'}`}
        />
      ))}
    </div>
  )
}

function BulletList({ text }: { text: string }) {
  const items = lines(text)
  if (items.length === 0) return null
  return (
    <ul className="mt-1.5 space-y-1">
      {items.map((line, i) => (
        <li key={i} className="flex gap-2 leading-relaxed text-stone-700">
          <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-[#c1694f]" />
          <span>{line}</span>
        </li>
      ))}
    </ul>
  )
}

export function WarmIvory({ data }: { data: CVData }) {
  const p = data.personal
  const hasContact = p.email || p.phone || p.location || p.linkedin || p.github || p.website
  const hasDetails = p.nationality || p.dateOfBirth || p.drivingLicence

  return (
    <div
      id="cv-preview"
      className="mx-auto flex flex-col overflow-hidden rounded-lg bg-[#fdfaf5] text-stone-800 shadow-xl"
      style={{ width: '210mm', minHeight: '297mm' }}
    >
      <div className="h-2 w-full shrink-0 bg-gradient-to-r from-[#b5602f] via-[#c1694f] to-[#d9b878]" />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className="flex w-[72mm] shrink-0 flex-col gap-6 bg-[#2a2119] px-6 py-8 text-[#f7efe1]"
          style={{ fontSize: '9.5px' }}
        >
          <div className="flex flex-col items-center text-center">
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-[#d9b878]/40 bg-[#4a3c2d]">
              {p.photo ? (
                <img src={p.photo} alt={p.fullName || 'Profile'} className="h-full w-full object-cover" />
              ) : (
                <span className="text-3xl font-semibold text-[#f0ddb8]">
                  {initials(p.fullName) || ''}
                </span>
              )}
            </div>
            {p.fullName && (
              <h1 className="mt-4 text-[15px] font-bold leading-tight text-[#fdfaf5]">{p.fullName}</h1>
            )}
            {p.jobTitle && (
              <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-[#e2a688]">
                {p.jobTitle}
              </p>
            )}
          </div>

          {hasContact && (
            <div>
              <SidebarHeading>Contact</SidebarHeading>
              <ul className="space-y-1.5 break-words">
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
              <ul className="space-y-1.5">
                {p.dateOfBirth && (
                  <li>
                    <span className="text-[#e6cc9b]/80">Born:</span> {p.dateOfBirth}
                  </li>
                )}
                {p.nationality && (
                  <li>
                    <span className="text-[#e6cc9b]/80">Nationality:</span> {p.nationality}
                  </li>
                )}
                {p.drivingLicence && (
                  <li>
                    <span className="text-[#e6cc9b]/80">Licence:</span> {p.drivingLicence}
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
                      <span className="text-[#e6cc9b]/80">{l.level}</span>
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
                    <p className="font-semibold text-[#fdfaf5]">{c.name}</p>
                    <p className="text-[#f7efe1]/70">{[c.issuer, c.date].filter(Boolean).join(' · ')}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* Main column */}
        <main className="flex-1 bg-[#fdfaf5] px-8 py-8" style={{ fontSize: '10px' }}>
          {p.summary && (
            <section className="mb-6">
              <MainHeading>Profile</MainHeading>
              <p className="leading-relaxed text-stone-700">{p.summary}</p>
            </section>
          )}

          {data.experience.length > 0 && (
            <section className="mb-6">
              <MainHeading>Work Experience</MainHeading>
              <div className="space-y-4">
                {data.experience.map((e) => (
                  <div key={e.id}>
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-semibold text-[#3a2f24]">
                        {e.role}
                        {e.role && e.company ? ' · ' : ''}
                        <span className="font-medium text-[#b5602f]">{e.company}</span>
                      </p>
                      {(e.startDate || e.endDate || e.current) && (
                        <p className="shrink-0 text-[9px] font-medium uppercase tracking-wide text-stone-400">
                          {e.startDate}
                          {e.startDate && (e.endDate || e.current) ? ' – ' : ''}
                          {e.current ? 'Present' : e.endDate}
                        </p>
                      )}
                    </div>
                    {e.location && <p className="text-[9px] text-stone-400">{e.location}</p>}
                    <BulletList text={e.description} />
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
                      <p className="font-semibold text-[#3a2f24]">
                        {e.degree}
                        {e.degree && e.institution ? ' · ' : ''}
                        <span className="font-medium text-[#b5602f]">{e.institution}</span>
                      </p>
                      {(e.startDate || e.endDate) && (
                        <p className="shrink-0 text-[9px] font-medium uppercase tracking-wide text-stone-400">
                          {e.startDate}
                          {e.startDate && e.endDate ? ' – ' : ''}
                          {e.endDate}
                        </p>
                      )}
                    </div>
                    {e.location && <p className="text-[9px] text-stone-400">{e.location}</p>}
                    <BulletList text={e.description} />
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
                    <p className="font-semibold text-[#3a2f24]">
                      {proj.name}
                      {proj.link && <span className="ml-2 font-normal text-[#b5602f]">{proj.link}</span>}
                    </p>
                    <BulletList text={proj.description} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {!p.summary &&
            data.experience.length === 0 &&
            data.education.length === 0 &&
            data.projects.length === 0 && (
              <div className="flex h-full items-center justify-center text-center text-stone-300">
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
