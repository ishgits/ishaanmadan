import { getCollection, getEntry } from 'astro:content';

export function readingTime(html: string) {
  const words = html.replace(/<[^>]*>/g, ' ').replace(/&[a-z0-9#]+;/gi, ' ').trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

export async function featuredProjects() {
  return (await getCollection('projects')).sort((a, b) => a.data.featuredOrder - b.data.featuredOrder);
}

/** Fail the build on missing cross-references instead of publishing broken paths. */
export async function validateContent() {
  const [projects, publications, resources] = await Promise.all([
    getCollection('projects'), getCollection('publications'), getCollection('resources'),
  ]);
  const refs = [
    ...projects.flatMap(p => [...p.data.publications, ...p.data.resources]),
    ...publications.map(p => p.data.project),
    ...resources.flatMap(r => r.data.projects),
  ];
  for (const ref of refs) {
    if (!await getEntry(ref)) throw new Error(`Missing ${ref.collection} reference: ${ref.id}`);
  }
}
