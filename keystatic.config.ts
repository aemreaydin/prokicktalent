import { config, fields, singleton, collection } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'ProKickTalent' },
  },

  singletons: {
    homepage: singleton({
      label: 'Home Page',
      path: 'src/content/homepage',
      format: { data: 'json' },
      schema: {
        heroTitle: fields.text({ label: 'Hero Title', multiline: true }),
        heroSubtitle: fields.text({ label: 'Hero Subtitle', multiline: true }),
        ctaText: fields.text({ label: 'CTA Button Text' }),
      },
    }),

    about: singleton({
      label: 'About Page',
      path: 'src/content/about',
      format: { data: 'json' },
      schema: {
        missionParagraph1: fields.text({ label: 'Mission — Paragraph 1', multiline: true }),
        missionParagraph2: fields.text({ label: 'Mission — Paragraph 2', multiline: true }),
        missionParagraph3: fields.text({ label: 'Mission — Paragraph 3', multiline: true }),
        founderParagraph1: fields.text({ label: 'Founder Bio — Paragraph 1', multiline: true }),
        founderParagraph2: fields.text({ label: 'Founder Bio — Paragraph 2', multiline: true }),
        founderParagraph3: fields.text({ label: 'Founder Bio — Paragraph 3', multiline: true }),
        founderQuote: fields.text({ label: 'Founder Quote (blockquote)', multiline: true }),
        founderParagraph4: fields.text({ label: 'Founder Bio — Paragraph 4', multiline: true }),
      },
    }),

    players: singleton({
      label: 'Players Page',
      path: 'src/content/players',
      format: { data: 'json' },
      schema: {
        heroHeading: fields.text({ label: 'Hero Heading' }),
        heroSubtext: fields.text({ label: 'Hero Subtext', multiline: true }),
        ctaText: fields.text({ label: 'CTA Button Text' }),
      },
    }),
  },

  collections: {
    services: collection({
      label: 'Services',
      path: 'src/content/services/*',
      slugField: 'slug',
      format: { data: 'json' },
      schema: {
        slug: fields.text({ label: 'Slug (do not change)', validation: { isRequired: true } }),
        order: fields.integer({ label: 'Display Order (1–4)' }),
        number: fields.text({ label: 'Display Number (e.g. 01)' }),
        title: fields.text({ label: 'Service Title' }),
        tagline: fields.text({ label: 'Tagline' }),
        highlight: fields.text({ label: 'Highlight Label' }),
        bodyParagraph1: fields.text({ label: 'Body — Paragraph 1', multiline: true }),
        bodyParagraph2: fields.text({ label: 'Body — Paragraph 2', multiline: true }),
      },
    }),

    gallery: collection({
      label: 'Gallery',
      path: 'src/content/gallery/*',
      slugField: 'caption',
      format: { data: 'json' },
      schema: {
        caption: fields.slug({ name: { label: 'Caption / Alt Text' } }),
        image: fields.image({
          label: 'Photo',
          directory: 'public/images/gallery',
          publicPath: '/images/gallery/',
        }),
      },
    }),
  },
});
