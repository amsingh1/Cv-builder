import { CVData } from '../types'

export const sampleCV: CVData = {
  personal: {
    fullName: 'Alex Müller',
    jobTitle: 'Senior Technical Consultant',
    photo: '',
    email: 'alex.muller@example.com',
    phone: '+41 79 123 45 67',
    location: 'Zurich, Switzerland',
    nationality: 'German',
    dateOfBirth: '12 March 1990',
    drivingLicence: 'Category B',
    linkedin: 'linkedin.com/in/alexmuller',
    github: 'github.com/alexmuller',
    website: 'alexmuller.dev',
    summary:
      'Technical consultant with 8+ years advising enterprise clients on cloud architecture and DevOps transformation. Comfortable leading workshops, writing production code, and translating business needs into technical roadmaps.',
  },
  experience: [
    {
      id: 'e1',
      role: 'Senior Technical Consultant',
      company: 'Nordic Cloud Advisory',
      location: 'Zurich, Switzerland',
      startDate: 'Jan 2022',
      endDate: '',
      current: true,
      description:
        'Lead architecture reviews and cloud migrations for enterprise clients across finance and healthcare.\nMentor a team of 4 consultants and own the internal DevOps playbook.',
    },
    {
      id: 'e2',
      role: 'Cloud Engineer',
      company: 'Vantix Systems',
      location: 'Munich, Germany',
      startDate: 'Jul 2018',
      endDate: 'Dec 2021',
      current: false,
      description:
        'Built CI/CD pipelines and Kubernetes infrastructure for a 40-person engineering org.\nReduced deployment time from 45 minutes to under 5.',
    },
  ],
  education: [
    {
      id: 'ed1',
      degree: 'M.Sc. Computer Science',
      institution: 'ETH Zurich',
      location: 'Zurich, Switzerland',
      startDate: '2016',
      endDate: '2018',
      description: 'Thesis on distributed systems scheduling.',
    },
  ],
  skills: [
    { id: 's1', name: 'Kubernetes', level: 'Expert' },
    { id: 's2', name: 'AWS / Azure', level: 'Advanced' },
    { id: 's3', name: 'Terraform', level: 'Advanced' },
    { id: 's4', name: 'TypeScript', level: 'Advanced' },
    { id: 's5', name: 'Python', level: 'Intermediate' },
  ],
  languages: [
    { id: 'l1', name: 'German', level: 'Native' },
    { id: 'l2', name: 'English', level: 'C2' },
    { id: 'l3', name: 'French', level: 'B1' },
  ],
  certifications: [
    { id: 'c1', name: 'AWS Solutions Architect – Professional', issuer: 'Amazon Web Services', date: '2023' },
    { id: 'c2', name: 'Certified Kubernetes Administrator', issuer: 'CNCF', date: '2022' },
  ],
  projects: [
    {
      id: 'p1',
      name: 'Open-source Terraform module registry',
      description: 'Maintain a set of widely-used Terraform modules for multi-cloud networking.',
      link: 'github.com/alexmuller/tf-modules',
    },
  ],
}
