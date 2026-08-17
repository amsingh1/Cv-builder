import { CVData } from '../types'
import { lines } from './shared'

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-2 border-b border-slate-300 pb-1 text-[13px] font-bold uppercase tracking-[0.15em] text-slate-900">
      {children}
    </h3>
  )
}

function BulletList({ text }: { text: string }) {
  const items = lines(text)
  if (items.length === 0) return null
  return (
    <ul className="mt-1 space-y-1">
      {items.map((line, i) => (
        <li key={i} className="flex gap-2 leading-relaxed text-slate-600">
          <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-slate-400" />
          <span>{line}</span>
        </li>
      ))}
    </ul>
  )
}

export function Minimal({ data }: { data: CVData }) {
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
      className="mx-auto overflow-hidden bg-white text-slate-800 shadow-xl"
      style={{ width: '210mm', minHeight: '297mm' }}
    >
      <div className="px-12 py-10" style={{ fontSize: '11px' }}>
        {/* Header */}
        <div className="flex items-center gap-5 border-b-2 border-slate-800 pb-5">
          {p.photo && (
            <img
              src={p.photo}
              alt={p.fullName || 'Profile'}
              className="h-20 w-20 shrink-0 rounded-full object-cover"
            />
          )}
          <div className="min-w-0">
            {p.fullName && (
              <h1 className="text-[25px] font-bold uppercase tracking-wide text-slate-900">
                {p.fullName}
              </h1>
            )}
            {p.jobTitle && (
              <p className="mt-0.5 text-[12.5px] font-medium uppercase tracking-[0.15em] text-slate-500">
                {p.jobTitle}
              </p>
            )}
            {(contactItems.length > 0 || detailItems.length > 0) && (
              <p className="mt-2 text-[10px] text-slate-500">
                {[...contactItems, ...detailItems].join('   ·   ')}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {p.summary && (
            <section>
              <SectionHeading>Profile</SectionHeading>
              <p className="leading-relaxed text-slate-600">{p.summary}</p>
            </section>
          )}

          {data.experience.length > 0 && (
            <section>
              <SectionHeading>Work Experience</SectionHeading>
              <div className="space-y-4">
                {data.experience.map((e) => (
                  <div key={e.id}>
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-semibold text-slate-900">
                        {e.role}
                        {e.role && e.company ? ', ' : ''}
                        <span className="font-normal italic text-slate-600">{e.company}</span>
                      </p>
                      {(e.startDate || e.endDate || e.current) && (
                        <p className="shrink-0 text-[10px] font-medium text-slate-400">
                          {e.startDate}
                          {e.startDate && (e.endDate || e.current) ? ' – ' : ''}
                          {e.current ? 'Present' : e.endDate}
                        </p>
                      )}
                    </div>
                    {e.location && <p className="text-[10px] text-slate-400">{e.location}</p>}
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
                      <p className="font-semibold text-slate-900">
                        {e.degree}
                        {e.degree && e.institution ? ', ' : ''}
                        <span className="font-normal italic text-slate-600">{e.institution}</span>
                      </p>
                      {(e.startDate || e.endDate) && (
                        <p className="shrink-0 text-[10px] font-medium text-slate-400">
                          {e.startDate}
                          {e.startDate && e.endDate ? ' – ' : ''}
                          {e.endDate}
                        </p>
                      )}
                    </div>
                    {e.location && <p className="text-[10px] text-slate-400">{e.location}</p>}
                    <BulletList text={e.description} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills.length > 0 && (
            <section>
              <SectionHeading>Skills</SectionHeading>
              <p className="leading-relaxed text-slate-600">
                {data.skills.map((s) => s.name).filter(Boolean).join('  ·  ')}
              </p>
            </section>
          )}

          {data.languages.length > 0 && (
            <section>
              <SectionHeading>Languages</SectionHeading>
              <p className="leading-relaxed text-slate-600">
                {data.languages.map((l) => `${l.name} (${l.level})`).join('  ·  ')}
              </p>
            </section>
          )}

          {data.certifications.length > 0 && (
            <section>
              <SectionHeading>Certifications</SectionHeading>
              <div className="space-y-1.5">
                {data.certifications.map((c) => (
                  <p key={c.id} className="text-slate-600">
                    <span className="font-semibold text-slate-900">{c.name}</span>
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
                    <p className="font-semibold text-slate-900">
                      {proj.name}
                      {proj.link && <span className="ml-2 font-normal text-slate-500">{proj.link}</span>}
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
              <div className="flex items-center justify-center py-24 text-center text-slate-300">
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
