import { useRef } from 'react'
import { PersonalInfo } from '../../types'
import { Field } from './FormControls'

export function PersonalForm({
  data,
  onChange,
}: {
  data: PersonalInfo
  onChange: (data: PersonalInfo) => void
}) {
  const fileInput = useRef<HTMLInputElement>(null)

  function set<K extends keyof PersonalInfo>(key: K, value: PersonalInfo[K]) {
    onChange({ ...data, [key]: value })
  }

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 3 * 1024 * 1024) {
      alert('Please choose an image smaller than 3MB.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => set('photo', reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2 rounded-lg bg-ink-50 px-3 py-2 text-xs text-cvblue-700">
        <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cvblue-600" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
            clipRule="evenodd"
          />
        </svg>
        <span>Nothing you type here is uploaded anywhere — it's saved only in this browser's storage.</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-ink-200 bg-ink-50">
          {data.photo ? (
            <img src={data.photo} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <svg className="h-8 w-8 text-ink-300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.42 0-8 2.24-8 5v2h16v-2c0-2.76-3.58-5-8-5z" />
            </svg>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              className="rounded-lg border border-ink-200 px-3 py-1.5 text-xs font-medium text-ink-600 hover:bg-ink-50"
            >
              {data.photo ? 'Change photo' : 'Upload photo'}
            </button>
            {data.photo && (
              <button
                type="button"
                onClick={() => set('photo', '')}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50"
              >
                Remove
              </button>
            )}
          </div>
          <p className="text-xs text-ink-400">JPG or PNG, ideally square, under 3MB.</p>
        </div>
        <input
          ref={fileInput}
          type="file"
          accept="image/png,image/jpeg"
          onChange={handlePhoto}
          className="hidden"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field
          label="Full name"
          value={data.fullName}
          onChange={(e) => set('fullName', e.target.value)}
          placeholder="Alex Müller"
        />
        <Field
          label="Job title"
          value={data.jobTitle}
          onChange={(e) => set('jobTitle', e.target.value)}
          placeholder="Senior Technical Consultant"
        />
        <Field
          label="Email"
          type="email"
          value={data.email}
          onChange={(e) => set('email', e.target.value)}
          placeholder="alex@example.com"
        />
        <Field
          label="Phone"
          value={data.phone}
          onChange={(e) => set('phone', e.target.value)}
          placeholder="+41 79 123 45 67"
        />
        <Field
          label="Location"
          value={data.location}
          onChange={(e) => set('location', e.target.value)}
          placeholder="Zurich, Switzerland"
        />
        <Field
          label="Nationality"
          value={data.nationality}
          onChange={(e) => set('nationality', e.target.value)}
          placeholder="German"
        />
        <Field
          label="Date of birth"
          value={data.dateOfBirth}
          onChange={(e) => set('dateOfBirth', e.target.value)}
          placeholder="12 March 1990"
        />
        <Field
          label="Driving licence"
          value={data.drivingLicence}
          onChange={(e) => set('drivingLicence', e.target.value)}
          placeholder="Category B"
        />
        <Field
          label="LinkedIn"
          value={data.linkedin}
          onChange={(e) => set('linkedin', e.target.value)}
          placeholder="linkedin.com/in/alexmuller"
        />
        <Field
          label="GitHub"
          value={data.github}
          onChange={(e) => set('github', e.target.value)}
          placeholder="github.com/alexmuller"
        />
        <Field
          label="Website"
          value={data.website}
          onChange={(e) => set('website', e.target.value)}
          placeholder="alexmuller.dev"
          className="sm:col-span-2"
        />
      </div>
    </div>
  )
}
