export const SITE = {
  name: 'Ishaan Madan',
  tagline: 'Computational astrobiology · workflows · science communication',
  email: 'madani@purdue.edu',
  calendar: 'https://calendar.app.google/HqtfQ4z6WszoSTnF6',
  academicCV:
    'https://docs.google.com/document/d/1CDoZUVaAGbocn8ZCk1GwOGBMQo-0mAdVQyNbImmL35E/edit?usp=sharing',
  industryCV:
    'https://docs.google.com/document/d/1biiPs5yVRxD9zL58fzFX22tkbIXaxZOQVaxmqTdPJo0/edit?usp=sharing',
  orcid: 'https://orcid.org/0000-0003-1813-8561',
  orcidId: '0000-0003-1813-8561',
  linkedin: 'https://www.linkedin.com/in/ishaanmadan18/',
  github: 'https://github.com/ishgits',
  youtube: {
    scientish: 'https://www.youtube.com/@scient_ish',
    spiritualish: 'https://www.youtube.com/@spiritual_ish',
    notesbyish: 'https://www.youtube.com/@notesbyish',
  },
} as const;

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'My Story' },
  { href: '/work-with-me/', label: 'Work With Me' },
  { href: '/resources/', label: 'Resources' },
] as const;
