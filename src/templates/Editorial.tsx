import { CVData } from '../types'
import { lines } from './shared'

const WINE = '#7a2e38'

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="mb-3 text-center font-serif text-[13.5px] font-semibold uppercase tracking-[0.25em]"
      style={{ color: WINE }}
    >
      {children}
      <span className="mx-auto mt-1.5 block h-px w-10" style={{ backgroundColor: WINE }} />
    </h3>
  )
}

function BulletList({ text }: { text: string }) {
  const items = lines(text)
  if (items.length === 0) return null
  return (
    <ul className="mt-1.5 space-y-1">
      {items.map((line, i) => (
        <li key={i} className="flex gap-2 leading-relaxed text-stone-600">
          <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: WINE }} />
          <span>{line}</span>
        </li>
      ))}
    </ul>
  )
}

export function Editorial({ data }: { data: CVData }) {
  const p = data.personal
  const contactItems = [p.email, p.phone, p.location, p.linkedin, p.github, p.website].filter(Boolean)
  const detailItems = [
    p.dateOfBirth && `Born ${p.dateOfBirth}`,
    p.nationality,
    p.drivingLicence && `Licence ${p.drivingLicence}`,
  ].filter(Boolean)

  return (
    <div
      id="cv-preview"
      className="mx-auto overflow-hidden bg-[#fffdf9] text-stone-800 shadow-xl"
      style={{ width: '210mm', minHeight: '297mm' }}
    >
      <div className="px-14 py-12" style={{ fontSize: '11px' }}>
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          {p.photo && (
            <img
              src={p.photo}
              alt={p.fullName || 'Profile'}
              className="mb-4 h-24 w-24 rounded-full border object-cover"
              style={{ borderColor: WINE }}
            />
          )}
          {p.fullName && (
            <h1 className="font-serif text-[29px] font-semibold tracking-wide text-stone-900">
              {p.fullName}
            </h1>
          )}
          {p.jobTitle && (
            <p className="mt-1 font-serif text-[13px] italic text-stone-500">{p.jobTitle}</p>
          )}
          {(contactItems.length > 0 || detailItems.length > 0) && (
            <p className="mt-3 text-[10px] uppercase tracking-[0.1em] text-stone-500">
              {[...contactItems, ...detailItems].join('   ·   ')}
            </p>
          )}
          <span className="mt-5 h-px w-24" style={{ backgroundColor: WINE }} />
        </div>

        <div className="mt-8 space-y-7">
          {p.summary && (
            <section>
              <SectionHeading>Profile</SectionHeading>
              <p className="text-center leading-relaxed text-stone-600">{p.summary}</p>
            </section>
          )}

          {data.experience.length > 0 && (
            <section>
              <SectionHeading>Experience</SectionHeading>
              <div className="space-y-4">
                {data.experience.map((e) => (
                  <div key={e.id}>
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-serif font-semibold text-stone-900">
                        {e.role}
                        {e.role && e.company ? ', ' : ''}
                        <span className="font-normal text-stone-600">{e.company}</span>
                      </p>
                      {(e.startDate || e.endDate || e.current) && (
                        <p className="shrink-0 text-[10px] italic text-stone-400">
                          {e.startDate}
                          {e.startDate && (e.endDate || e.current) ? ' – ' : ''}
                          {e.current ? 'Present' : e.endDate}
                        </p>
                      )}
                    </div>
                    {e.location && <p className="text-[10px] text-stone-400">{e.location}</p>}
                    <BulletList text={e.description} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.education.length > 0 && (
            <section>
              <SectionHeading>Education</SectionHeading>
              <div className="space-y-4">
                {data.education.map((e) => (
                  <div key={e.id}>
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-serif font-semibold text-stone-900">
                        {e.degree}
                        {e.degree && e.institution ? ', ' : ''}
                        <span className="font-normal text-stone-600">{e.institution}</span>
                      </p>
                      {(e.startDate || e.endDate) && (
                        <p className="shrink-0 text-[10px] italic text-stone-400">
                          {e.startDate}
                          {e.startDate && e.endDate ? ' – ' : ''}
                          {e.endDate}
                        </p>
                      )}
                    </div>
                    {e.location && <p className="text-[10px] text-stone-400">{e.location}</p>}
                    <BulletList text={e.description} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {(data.skills.length > 0 || data.languages.length > 0) && (
            <section className="grid grid-cols-2 gap-8">
              {data.skills.length > 0 && (
                <div>
                  <SectionHeading>Skills</SectionHeading>
                  <p className="text-center leading-relaxed text-stone-600">
                    {data.skills.map((s) => s.name).filter(Boolean).join('  ·  ')}
                  </p>
                </div>
              )}
              {data.languages.length > 0 && (
                <div>
                  <SectionHeading>Languages</SectionHeading>
                  <p className="text-center leading-relaxed text-stone-600">
                    {data.languages.map((l) => `${l.name} (${l.level})`).join('  ·  ')}
                  </p>
                </div>
              )}
            </section>
          )}

          {data.certifications.length > 0 && (
            <section>
              <SectionHeading>Certifications</SectionHeading>
              <div className="space-y-1.5 text-center">
                {data.certifications.map((c) => (
                  <p key={c.id} className="text-stone-600">
                    <span className="font-semibold text-stone-900">{c.name}</span>
                    {[c.issuer, c.date].filter(Boolean).length > 0 &&
                      ` — ${[c.issuer, c.date].filter(Boolean).join(', ')}`}
                  </p>
                ))}
              </div>
            </section>
          )}

          {data.projects.length > 0 && (
            <section>
              <SectionHeading>Projects</SectionHeading>
              <div className="space-y-4">
                {data.projects.map((proj) => (
                  <div key={proj.id}>
                    <p className="font-serif font-semibold text-stone-900">
                      {proj.name}
                      {proj.link && <span className="ml-2 font-sans font-normal text-stone-500">{proj.link}</span>}
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
              <div className="flex items-center justify-center py-24 text-center text-stone-300">
                <p className="max-w-xs text-sm leading-relaxed">
                  Start filling in the form on the left — your CV will take shape here in real time.
                </p>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}
