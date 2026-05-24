import { config, fields, collection } from '@keystatic/core';

const AGE_GROUPS = ['U17', 'U18', 'U19', 'U20', 'U21', 'U22', 'U23'];
const POSITIONS = ['GK', 'RB', 'CB', 'LB', 'DM', 'CM', 'AM', 'RW', 'LW', 'ST'];
const BIRTH_YEARS = ['2003', '2004', '2005', '2006', '2007', '2008', '2009'];
const opt = (v: string) => ({ label: v, value: v });

export default config({
  // Local files in dev (dashboard edits src/content/* directly, no auth) —
  // Keystatic Cloud in the deployed build.
  storage: import.meta.env.DEV ? { kind: 'local' } : { kind: 'cloud' },
  cloud: {
    project: 'pro-kick-talent/prokicktalent',
  },
  ui: {
    brand: { name: 'ProKickTalent' },
  },

  collections: {
    // ───────────────────────── ROSTER ─────────────────────────
    roster: collection({
      label: 'Players — Roster',
      path: 'src/content/roster/*',
      slugField: 'reference',
      format: { data: 'json' },
      columns: ['reference', 'status'],
      schema: {
        reference: fields.text({
          label: 'Internal reference',
          description: 'Short unique nickname for this card (NOT shown on the site). e.g. "winger-2007-a".',
          validation: { isRequired: true },
        }),
        order: fields.integer({
          label: 'Display order',
          defaultValue: 1,
          description: 'Lower numbers appear first.',
        }),
        status: fields.select({
          label: 'Status',
          description: 'Where this player is in the pathway.',
          options: [
            { label: 'Watched', value: 'watched' },
            { label: 'Trialing', value: 'trial' },
            { label: 'Signed', value: 'signed' },
            { label: 'Placed', value: 'placed' },
          ],
          defaultValue: 'watched',
        }),
        ageGroup: fields.select({
          label: 'Age group',
          options: AGE_GROUPS.map(opt),
          defaultValue: 'U19',
        }),
        descriptor: fields.text({
          label: 'Descriptor',
          description: 'Anonymized label, e.g. "winger", "#8", "centre-back". Keep it short (max 24 characters).',
          validation: { length: { max: 24 } },
        }),
        position: fields.select({
          label: 'Position',
          options: POSITIONS.map(opt),
          defaultValue: 'CM',
        }),
        birthYear: fields.select({
          label: 'Birth year',
          options: BIRTH_YEARS.map(opt),
          defaultValue: '2007',
        }),
        region: fields.text({
          label: 'Region / context',
          description: 'e.g. "Ontario", "Toronto", "European trial". Max 32 characters.',
          validation: { length: { max: 32 } },
        }),
        // Consent gate: real name + photo are unreachable unless mode = Real
        // AND consent is confirmed.
        identity: fields.conditional(
          fields.select({
            label: 'Identity mode',
            description: 'Keep "Anonymized" unless written player AND family consent is on file.',
            options: [
              { label: 'Anonymized', value: 'anonymized' },
              { label: 'Real (consent required)', value: 'real' },
            ],
            defaultValue: 'anonymized',
          }),
          {
            anonymized: fields.empty(),
            real: fields.object(
              {
                realName: fields.text({ label: 'Real name' }),
                photo: fields.image({
                  label: 'Photo',
                  directory: 'public/images/roster',
                  publicPath: '/images/roster/',
                }),
                consentOnFile: fields.checkbox({
                  label: 'Consent on file',
                  description: 'I confirm written player and family consent is on file. The real name and photo will NOT show unless this is ticked.',
                  defaultValue: false,
                }),
              },
              { label: 'Real identity (consented)' }
            ),
          }
        ),
      },
    }),

    // ───────────────────────── GALLERY ─────────────────────────
    gallery: collection({
      label: 'Media — Gallery',
      path: 'src/content/gallery/*',
      slugField: 'caption',
      format: { data: 'json' },
      columns: ['caption', 'size'],
      schema: {
        caption: fields.slug({ name: { label: 'Caption / alt text', description: 'Shown on hover and used for the filename.' } }),
        image: fields.image({
          label: 'Photo',
          directory: 'public/images/gallery',
          publicPath: '/images/gallery/',
        }),
        date: fields.text({
          label: 'Date label',
          description: 'Free text, e.g. "2026 · March".',
        }),
        size: fields.select({
          label: 'Layout size',
          description: 'How big this photo is in the grid.',
          options: [
            { label: 'Regular', value: 'regular' },
            { label: 'Wide', value: 'wide' },
            { label: 'Tall', value: 'tall' },
            { label: 'Feature (large)', value: 'feature' },
          ],
          defaultValue: 'regular',
        }),
        order: fields.integer({ label: 'Display order', defaultValue: 1, description: 'Lower numbers appear first.' }),
      },
    }),

    // ───────────────────────── PRESS ─────────────────────────
    press: collection({
      label: 'Media — Press',
      path: 'src/content/press/*',
      slugField: 'headline',
      format: { data: 'json' },
      columns: ['headline', 'source'],
      schema: {
        headline: fields.slug({
          name: { label: 'Title', description: 'The press piece headline. Keep under ~70 characters so it fits on one line.' },
        }),
        source: fields.text({
          label: 'Source',
          description: 'Outlet / show name, e.g. "L1O Newsletter". Max 32 characters.',
          validation: { length: { max: 32 } },
        }),
        date: fields.text({ label: 'Date label', description: 'Free text, e.g. "Jun 2026".' }),
        subtitle: fields.text({
          label: 'Subtitle',
          description: 'One short line of detail. Max 60 characters.',
          validation: { length: { max: 60 } },
        }),
        url: fields.url({ label: 'Link (optional)' }),
        order: fields.integer({ label: 'Display order', defaultValue: 1, description: 'Lower numbers appear first.' }),
      },
    }),

    // ───────────────────────── SERVICES ─────────────────────────
    services: collection({
      label: 'Services',
      path: 'src/content/services/*',
      slugField: 'slug',
      format: { data: 'json' },
      columns: ['title', 'order'],
      schema: {
        slug: fields.text({
          label: 'Anchor ID (do not change)',
          description: 'Used for the on-page link, e.g. representation / gps / scouting / career. Changing it breaks links.',
          validation: { isRequired: true },
        }),
        order: fields.integer({ label: 'Display order (1–4)', defaultValue: 1 }),
        number: fields.text({ label: 'Display number', description: 'e.g. "01".' }),
        title: fields.text({ label: 'Service title', validation: { isRequired: true } }),
        phase: fields.text({
          label: 'Phase label',
          description: 'Small uppercase label, e.g. "Contract & club fit". Max 40 characters.',
          validation: { length: { max: 40 } },
        }),
        hubBlurb: fields.text({
          label: 'Hub blurb',
          description: 'One-line summary shown in the services list at the top. Max 110 characters.',
          multiline: true,
          validation: { length: { max: 110 } },
        }),
        body: fields.text({
          label: 'Body paragraph',
          description: 'The main description in the service section.',
          multiline: true,
        }),
        bullets: fields.array(fields.text({ label: 'Item', validation: { length: { max: 28 } } }), {
          label: 'What you get',
          description: 'Short list items (aim for ~6).',
          itemLabel: (props) => props.value || 'Item',
        }),
        vizType: fields.select({
          label: 'Sample visual',
          description: 'Which illustrative (EXAMPLE) visual shows beside this service. The visual\'s numbers are fixed in code.',
          options: [
            { label: 'Contract review', value: 'contract' },
            { label: 'GPS readout', value: 'gps' },
            { label: 'Tactic board', value: 'tactic' },
            { label: 'Pathway graph', value: 'pathway' },
          ],
          defaultValue: 'contract',
        }),
      },
    }),
  },
});
