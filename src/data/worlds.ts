/**
 * Data backing the "Worlds" explorer island (brief §7a).
 *
 * IMPORTANT: the `accessibility` curves below are SCHEMATIC / ILLUSTRATIVE,
 * not published results. They convey the qualitative shape of the questions
 * Ishaan's work asks — "how does the thermodynamic accessibility of a
 * molecule class shift across an environment axis?" — without asserting
 * specific numbers. The UI labels them as schematic. Do not present them as
 * data. Real results live in the linked publications.
 */

export interface MoleculeCurve {
  label: string;
  /** 0–1 schematic accessibility across the environment axis (low → high) */
  points: number[];
  color: string;
}

export interface World {
  id: string;
  name: string;
  blurb: string;
  /** what the horizontal axis of the schematic represents for this world */
  axisLabel: string;
  axisLow: string;
  axisHigh: string;
  conditions: { label: string; value: string }[];
  curves: MoleculeCurve[];
  /** which of Ishaan's projects touch this world */
  projects: string[];
  mission?: string;
}

export const WORLDS: World[] = [
  {
    id: 'titan',
    name: 'Titan',
    blurb:
      "Saturn's largest moon: a thick nitrogen atmosphere, liquid-methane seas, and a surface where impact events can briefly melt water ice into transient warm pools — a setting for prebiotic chemistry.",
    axisLabel: 'Impact-melt pool temperature',
    axisLow: 'Cool (freezing back)',
    axisHigh: 'Warm (fresh melt)',
    conditions: [
      { label: 'Surface temp', value: '~94 K' },
      { label: 'Atmosphere', value: 'N₂ + CH₄' },
      { label: 'Key setting', value: 'Impact-melt pools' },
    ],
    curves: [
      { label: 'Amino acids', points: [0.12, 0.2, 0.38, 0.62, 0.82, 0.9], color: 'var(--c-accent)' },
      { label: 'Nucleobases', points: [0.08, 0.14, 0.26, 0.44, 0.6, 0.68], color: 'var(--c-glow)' },
      { label: 'Fatty acids', points: [0.05, 0.1, 0.22, 0.4, 0.66, 0.8], color: '#c58ff0' },
    ],
    projects: ['Prebiotic Chemistry on Titan', 'Research Automation Workflows'],
    mission: "NASA Dragonfly (Selk crater)",
  },
  {
    id: 'venus',
    name: 'Venus',
    blurb:
      'A scorching greenhouse world whose cloud decks are droplets of concentrated sulfuric acid — an environment where familiar carbon chemistry struggles and alternative, carbon-free polymers become worth asking about.',
    axisLabel: 'Cloud-deck altitude',
    axisLow: 'Lower (hotter)',
    axisHigh: 'Upper (cooler)',
    conditions: [
      { label: 'Cloud temp', value: '~330–370 K' },
      { label: 'Clouds', value: 'H₂SO₄ droplets' },
      { label: 'Question', value: 'Carbon-free polymers?' },
    ],
    curves: [
      { label: 'Heteropolymer stability', points: [0.2, 0.34, 0.5, 0.64, 0.74, 0.8], color: 'var(--c-accent)' },
      { label: 'Carbon-based analogues', points: [0.7, 0.55, 0.4, 0.28, 0.18, 0.12], color: 'var(--c-glow)' },
    ],
    projects: ['Alternative Chemistries Beyond Earth'],
  },
  {
    id: 'enceladus',
    name: 'Enceladus',
    blurb:
      "A small icy moon of Saturn venting plumes from a subsurface ocean through cracks at its south pole — where early mapping of geologic features first drew Ishaan toward planetary science.",
    axisLabel: 'Distance from vent source',
    axisLow: 'At the vent',
    axisHigh: 'Into the plume',
    conditions: [
      { label: 'Surface temp', value: '~75 K' },
      { label: 'Feature', value: 'Plume-venting ocean' },
      { label: 'Context', value: 'Geologic mapping' },
    ],
    curves: [
      { label: 'Organic delivery', points: [0.85, 0.72, 0.55, 0.4, 0.28, 0.2], color: 'var(--c-accent)' },
    ],
    projects: ['Early research (geologic mapping)'],
  },
];
