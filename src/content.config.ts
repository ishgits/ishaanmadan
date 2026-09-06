import { defineCollection, reference } from 'astro:content';
import { z } from 'astro/zod';
import { file } from 'astro/loaders';

const projects = defineCollection({
  loader: file('src/content/projects.json'),
  schema: z.object({
    name: z.string(), question: z.string(), summary: z.string(), setting: z.string(),
    image: z.string(), imageAlt: z.string(), imageCredit: z.string(), imageWidth: z.number(), imageHeight: z.number(),
    imageMode: z.enum(['planet', 'molecule']), featuredOrder: z.number(),
    publications: z.array(reference('publications')), resources: z.array(reference('resources')),
    contribution: z.string(), approach: z.string(), finding: z.string(), limitations: z.string(),
    insideTitle: z.string(), inside: z.string(), connection: z.string(), storyAnchor: z.string(),
    dataUrl: z.url().optional(), dataLabel: z.string().optional(), nextQuestion: z.string(),
  }),
});
const publications = defineCollection({
  loader: file('src/content/publications.json'),
  schema: z.object({
    title: z.string(), authors: z.array(z.string()).min(1), year: z.number(), venue: z.string(),
    volume: z.string(), article: z.string(), doi: z.string().startsWith('10.'),
    project: reference('projects'), status: z.literal('Published'),
  }),
});
const resources = defineCollection({
  loader: file('src/content/resources.json'),
  schema: z.object({
    title: z.string(), summary: z.string(), context: z.string(), details: z.array(z.string()),
    url: z.url(), format: z.string(), audience: z.string(),
    group: z.enum(['science', 'fellowships']), projects: z.array(reference('projects')),
    action: z.string(),
  }),
});
const reflections = defineCollection({
  loader: file('src/content/reflections.json'),
  schema: z.object({
    title: z.string(), summary: z.string(), eventDate: z.string(), eventISO: z.string(),
    bodyFile: z.string(), related: z.array(z.string()), url: z.string(),
  }),
});
export const collections = { projects, publications, resources, reflections };
