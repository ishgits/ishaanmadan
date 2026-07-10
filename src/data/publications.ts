export interface Publication {
  title: string;
  journal: string | null;
  year: string;
  month?: string | null;
  doi?: string | null;
  url: string;
  type: string;
}

/**
 * Hand-maintained fallback list, mirroring Ishaan's public ORCID record
 * (0000-0003-1813-8561). The site fetches ORCID at build time (see
 * getPublications) and only falls back to this list if the API is
 * unreachable, so a build never depends on a live third-party service.
 */
export const FALLBACK_PUBLICATIONS: Publication[] = [
  {
    title:
      'Prebiotic Chemistry Insights for Dragonfly. II. Thermodynamic Favorability of Nucleobases, Ribose, and Fatty Acids in Selk Crater on Titan',
    journal: 'The Planetary Science Journal',
    year: '2026',
    month: '05',
    doi: '10.3847/PSJ/ae5f91',
    url: 'https://doi.org/10.3847/PSJ/ae5f91',
    type: 'journal-article',
  },
  {
    title:
      'Prebiotic Chemistry Insights for Dragonfly: Thermodynamics of Amino Acid Synthesis in Selk Crater on Titan',
    journal: 'The Planetary Science Journal',
    year: '2025',
    month: '12',
    doi: '10.3847/PSJ/ae1c18',
    url: 'https://doi.org/10.3847/PSJ/ae1c18',
    type: 'journal-article',
  },
  {
    title:
      'On the possibility of carbon-free heteropolymers on Venus: a computational astrobiology study',
    journal: 'QRB Discovery',
    year: '2025',
    month: null,
    doi: '10.1017/qrd.2025.10012',
    url: 'https://doi.org/10.1017/qrd.2025.10012',
    type: 'journal-article',
  },
  {
    title:
      "Characterizing phase transitions for Titan's surface molecules: Implications for Dragonfly",
    journal: 'Planetary and Space Science',
    year: '2023',
    month: '12',
    doi: '10.1016/j.pss.2023.105804',
    url: 'https://doi.org/10.1016/j.pss.2023.105804',
    type: 'journal-article',
  },
  {
    title:
      "Long-term Stability of Glycine, Alanine, and Phenylalanine on Titan's Surface Subject to Cosmic Ray Flux",
    journal: 'ESS Open Archive (preprint)',
    year: '2021',
    month: '01',
    doi: '10.1002/essoar.10505963.2',
    url: 'https://doi.org/10.1002/essoar.10505963.2',
    type: 'preprint',
  },
];

const ORCID_ID = '0000-0003-1813-8561';

/**
 * Fetch works from the ORCID public API at build time. Returns the
 * hand-maintained fallback if the request fails so builds stay offline-safe.
 */
export async function getPublications(): Promise<Publication[]> {
  try {
    const res = await fetch(`https://pub.orcid.org/v3.0/${ORCID_ID}/works`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`ORCID responded ${res.status}`);
    const data: any = await res.json();

    const pubs: Publication[] = (data.group ?? []).map((group: any) => {
      const w = group['work-summary'][0];
      const ids = group['external-ids']?.['external-id'] ?? [];
      const doi = ids.find((e: any) => e['external-id-type'] === 'doi')?.['external-id-value'] ?? null;
      const pd = w['publication-date'] ?? {};
      return {
        title: w.title?.title?.value ?? 'Untitled',
        journal: w['journal-title']?.value ?? null,
        year: pd.year?.value ?? '',
        month: pd.month?.value ?? null,
        doi,
        url: w.url?.value ?? (doi ? `https://doi.org/${doi}` : '#'),
        type: w.type ?? 'work',
      };
    });

    if (pubs.length === 0) throw new Error('ORCID returned no works');
    return sortPublications(pubs);
  } catch (err) {
    console.warn(`[publications] ORCID fetch failed, using fallback list: ${(err as Error).message}`);
    return sortPublications(FALLBACK_PUBLICATIONS);
  }
}

function sortPublications(pubs: Publication[]): Publication[] {
  return [...pubs].sort((a, b) => {
    const ay = Number(a.year) || 0;
    const by = Number(b.year) || 0;
    if (by !== ay) return by - ay;
    return (Number(b.month) || 0) - (Number(a.month) || 0);
  });
}
